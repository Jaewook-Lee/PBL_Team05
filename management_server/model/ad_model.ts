import { Request, Response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import path from 'path';

//db connector
const result = dotenv.config({path: path.join(__dirname, "../..", ".env")});
if (result.parsed === undefined) {
    throw new Error("Can't load env file!");
} else {
    console.log("Load env file complete");
}

const connection : mysql.Connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    port : Number(process.env.MYSQL_PORT),
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PW,
    database : process.env.MYSQL_DB_NAME
});


connection.connect ((error)=>{
    if (error){
        console.error('fail to connect',error);
        return;
    }
    console.log('db connect success')
});

function requestListModel(req: Request, res: Response){   
    connection.query(`select * from ads where gender = '${req.query.gender}' and country  = "${req.body.country}";`,function(err : Error, result : any){
        if (err){
            console.log(err);
            res.json({
                status: "fail",
                message: "불러오기에 실패했습니다.."
            });
            return;
        }

        res.json(result);
    });
}

function readAdModel(req: Request, res: Response){
    connection.query(`select ads.name, ad_contents_data.contents, ads.period_begin, ads.period_end, ads.advertizer, ads.country, ad_contents_data.type, ad_statics.hit_count, ad_statics.hit_time_sum from ads inner join ad_contents_data on ads.id = ad_contents_data.id inner join ad_statics on ads.id = ad_statics.id where ads.id = ${req.query.adId}`, 
    function(err : Error, result : any) {
        // DB 조회 과정에서 에러가 나거나, row 수가 0일 경우(JOIN 결과 row가 0개일 수 있다.) 실패 메시지 전달
        if (err || result.length === 0) {
            console.log(err);
            console.log(`Result rows: ${result}`);
            res.json({
                status : "fail",
                message : "조회에 실패했습니다."
            });
        } else {
            const startDay : Date = result[0].period_begin;
            const startYear : number = startDay.getFullYear(); const startMonth : number = startDay.getMonth(); const startDate : number = startDay.getDate();

            const endDay : Date = result[0].period_end;
            const endYear : number = endDay.getFullYear(); const endMonth : number = endDay.getMonth(); const endDate : number = endDay.getDate();

            const period : string = `${startYear}-${startMonth}-${startDate} ~ ${endYear}-${endMonth}-${endDate}`;
            
            res.json({
                "adName": result[0].name,
                "contents": result[0].contents,
                "period": period,
                "advertiser": result[0].advertizer,
                "language": result[0].country,
                "adType": result[0].type,
                "hitCount": result[0].hit_count,
                "watchTimeSum": result[0].hit_count_sum
            });
        }
    });
}

function deleteAdModel(req: Request, res: Response){
    connection.query(`delete from ads where id = "${req.body.adId}"`,
        function(err : Error){
            if(err){
                //todo : id가 없을 경우 삭제를 안하는데 성공으로 메시지가 전달되긴 함.
                res.json({
                    status: "fail",
                    message: "삭제에 실패했습니다."
                });
                console.log(err)
                return;
            }
            res.json({
                status: "success",
                message: "삭제에 성공했습니다."
            });
            return;
        }
    );
}

function createAdModel(req: Request, res: Response, countryCode :Number){
    connection.query(`Insert into ads (name,advertizer,create_at,country,gender,period_begin,period_end,max_view_count) 
    values ("${req.body.name}","${req.body.advertizer}","${req.body.createdAt}","${countryCode}","${req.body.gender}","${req.body.periodBegin}",
    "${req.body.periodEnd}","${req.body.maxViewCount}")`, (err : Error) => {
        if(err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "등록에 실패했습니다."
            });
            return
        }
        
        connection.query(`select id as adId from ads where name = "${req.body.name}" order by create_at desc`,(err : Error, result : any)=>{
            res.json({
                status: "success",
                message: "등록에 성공했습니다.",
                adId: result[0].adId
            });
            return;
        });
    });
}

function activeModel(req: Request, res: Response){
    connection.query(`insert into active_ads (id) values (${req.body.adId});`,function (err){
        if(err){
            console.log(err);
            res.json({
                status: "fail",
                message: "active fail!"
            });
            return;
        }
        res.json({
            status: "success",
            message: "active Success!"
        });
        return;
    
    })
}

function updateAdModel(req: Request, res: Response){
    var parameterList = ["name","advertizer","createdAt","country","gender","periodBegin","periodEnd","maxViewCount"]
    var sqlQuery : string = `update ads set `
    var queryList = [`name = "${req.body.name}",`,`advertizer="${req.body.advertizer}",`,`create_at="${req.body.createdAt}",`,
    `country="${req.body.country}",`,`gender="${req.body.gender}",`,`period_begin="${req.body.periodBegin}",`,`period_end="${req.body.periodEnd}",`,
    `period_end="${req.body.periodEnd}",`,`max_view_count= "${req.body.maxViewCount}"`]
    console.log(req.body[parameterList[5]]);
    for (let i = 0 ; i< parameterList.length;i++){
        if(req.body[parameterList[i]] != undefined){
            sqlQuery += queryList[i];
        }
    }
    if (sqlQuery.charAt(sqlQuery.length - 1)==","){
        sqlQuery = sqlQuery.slice(0,-1);
    }

    sqlQuery +=` where id = "${req.body.adId}"`;
    console.log(sqlQuery);

    connection.query(sqlQuery,
        function(err : Error){
            if(err){
                console.log(err)
                res.json({
                    status: "fail",
                    message: "수정에 실패했습니다."
                });
                return;
            }
            res.json({
                status: "success",
                message: "수정에 성공했습니다.",
            });
            return;
        }
    );
}

async function requestAdminListModel(req: Request, res: Response){
    var offset : number = Number(req.query.offset);
    var length : number = Number(req.query.length);

    var type = req.query.type;
    var search = req.query.search;

    var sqlQuery : string = `select ads.id as adId, name, create_at as createAt, period_begin as periodBegin, period_end as periodEnd, max_view_count as maxViewCount,  (Case when active_ads.id Is null then False else True end ) as isActive from ads left join active_ads on ads.id = active_ads.id `;
    var whereQuery : string = `where ${type} like "%${search}%"`

    if (type != undefined){
        sqlQuery+= whereQuery; 
    }
    sqlQuery+= ` limit ${offset},${length};`

    var data :Object;
    var count : any = [];
    await new Promise<void>((resolve) => {
        connection.query(sqlQuery,
        function(err : Error, result : any){
            if(err){
                console.log(err);
                res.json({
                    status : "error"
                })  
            }
            data= result;
            resolve();
        })
    });
    var sqlQuery2 : string = `select count(*) as adCount from ads `;
    if (type != undefined){
        sqlQuery2+= whereQuery; 
    }
    await new Promise<void>((resolve) => {
        connection.query(sqlQuery2,
        function(err : Error, result : any){
            if(err){
                console.log(err);
                res.json({
                    status : "error"
                })  
            }
            count= result;
            resolve();
        })
    });
    
    res.json({adCount : count[0].adCount ,data : data!});
}

export {requestListModel,readAdModel,deleteAdModel,createAdModel,activeModel,updateAdModel,requestAdminListModel};