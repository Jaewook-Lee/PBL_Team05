import { Request, Response } from 'express';
import mysql from 'mysql';
import iso from 'iso-3166-1';
import dotenv from 'dotenv';
import path from 'path';

// 환경 변수가 저장된 .env 파일 로딩
// 실패하면 에러 반환
const result = dotenv.config({path: path.join(__dirname, "../..", ".env")});
if (result.parsed === undefined) {
    throw new Error("Can't load env file!");
} else {
    console.log("Load env file complete");
}

//db connector
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

// ad 정렬해서 filtering하는 기능이 필요 할 듯.
//get
function requestList (req: Request, res: Response) {
    connection.query(`select * from ads where gender = '${req.query.gender}' and country  = "${req.body.country}";`,function(err : Error, result : any){
        if (err){
            console.log(err);
            res.json({
                status: "fail",
                message: "불러오기에 실패했습니다.."
            });
        }else{
            res.json(result);
        }
    });

}

// db및 api 수정필요.
//get
function readAd (req: Request, res: Response) {
    if (req.query.adId === undefined) {
        res.json({
            status : "fail",
            message : "조회에 실패했습니다."
        });
    } else {
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
}

//delete
function deleteAd (req: Request, res: Response) {
    console.log(req.body);
    console.log(req);
    if (req.body ={}){
        res.json({
            status: "fail",
            message: "body가 비었습니다."
        });
        return;
    };
    connection.query(`delete from ads where id = "${req.body.adId}"`,
        function(err : Error){
            if(err){
                //todo : id가 없을 경우 삭제를 안하는데 성공으로 메시지가 전달되긴 함.
                res.json({
                    status: "fail",
                    message: "삭제에 실패했습니다."
                });
                console.log(err)
            }else{
                res.json({
                    status: "success",
                    message: "삭제에 성공했습니다."
                });
            }
        }
    );

}

//post
function createAd(req: Request, res: Response){
    const params = req.body;
    // Validation
    if (params.name === undefined || params.advertizer === undefined || params.createdAt === undefined || params.country === undefined || params.gender === undefined || params.periodBegin === undefined || params.periodEnd === undefined || params.maxViewCount === undefined) {
        res.json({
            "status": "fail",
            "message": "잘못된 데이터가 입력되었습니다."
        })
    }
    else {
        // Parsing country name to numeric country code
        const countryName : string = params.country;
        const isoAllData = iso.all();
        let countryCode : Number = -1;
        for (let i : number = 0; i < isoAllData.length; i++) {
            if (countryName === isoAllData[i].country) {
                countryCode = Number(isoAllData[i].numeric);
                break;
            }
        }

        connection.query(`Insert into ads (name,advertizer,create_at,country,gender,period_begin,period_end,max_view_count) 
        values ("${req.body.name}","${req.body.advertizer}","${req.body.createdAt}","${countryCode}","${req.body.gender}","${req.body.periodBegin}",
        "${req.body.periodEnd}","${req.body.maxViewCount}")`, (err : Error) => {
            if(err) {
                console.log(err);
                res.json({
                    status: "fail",
                    message: "등록에 실패했습니다."
                });
            }
            else {
                connection.query(`select id as adId from ads where name = "${req.body.name}" order by create_at desc`,(err : Error, result : any)=>{
                    res.json({
                        status: "success",
                        message: "등록에 성공했습니다.",
                        adId: result[0].adId
                    });
                });
            }
        }
        );
    }
}

//todo deactivate도 필요할듯.
//post
function activeAd (req: Request, res: Response) {
    connection.query(`insert into active_ads (id) values (${req.body.adId});`,function (err){
        if(err){
            console.log(err);
            res.json({
                status: "fail",
                message: "active fail!"
            });
        }else{
            res.json({
                status: "success",
                message: "active Success!"
            });
        }
    })
}

//put
//todo
// api문서 및 구조 바꿔야 할 수도. 수정창에서 불러올때는 get 수정할때는 post,put 으로 동작하게 해야할 듯 함.
function updateAd (req: Request, res: Response) {
    connection.query(`update ads set name="${req.body.name}" ,advertizer="${req.body.advertizer}",create_at="${req.body.createdAt}",country="${req.body.country}",gender="${req.body.gender}",period_begin="${req.body.periodBegin}",period_end="${req.body.periodEnd}",max_view_count= "${req.body.maxViewCount}" where id = "${req.body.adId}"`,
    function(err : Error){
        if(err){
            console.log(err)
            res.json({
                status: "fail",
                message: "수정에 실패했습니다."
            });
        }else{res.json({
            status: "success",
            message: "수정에 성공했습니다.",
        });}
    }
    );
}

// file을 받는 tool 필요할듯.
//post
//todo
function uploadContents (req: Request, res: Response) {
    res.json({
        status: "success",
        message: "업로드에 성공했습니다."
    });
}

//todo Error control
async function requestAdminList(req:Request, res:Response){
    var offset : number = Number(req.query.offset);
    var length : number = Number(req.query.length);
    if(offset == undefined && length == undefined){
        res.json({status : "error", message : "필수 파라미터 (offset,length) Error"})
        return;
    }
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

export { deleteAd, readAd, createAd, activeAd, updateAd, uploadContents, requestList,requestAdminList}