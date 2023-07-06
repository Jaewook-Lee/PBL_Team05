import { Request, Response } from 'express';
import mysql from 'mysql';

const connection : mysql.Connection = mysql.createConnection({
    host : 'ls-9c7d7b612085a406360965e6158e47d7564a40d7.c8heglnxvydw.ap-northeast-2.rds.amazonaws.com',
    port : 3306,
    user : 'dbmasteruser',
    password : '00000000',
    database : 'ad_management_platform_server'
});

connection.connect ((error)=>{
    if (error){
        console.error('fail to connect',error);
        return;
    }
    console.log('db connect success')
});


function requestList (req: Request, res: Response) {
    res.json({stauts: "success",
            data : [{content: "pic1.jpeg",width : "100",height :"100",slotId : "1234", exposureTime :"2023-11-11 15:00:00"}]
    });
}

function readAd(req : Request, res : Response){
    res.send({stauts: "success",
    data : [{content: "pic1.jpeg",width : "readAd"}]
})
}



function deleteAd(req : Request, res : Response){
    res.json({stauts: "success", message : ""});
}

function createAd(req : Request, res : Response){
    res.json({
        status: "success",
        message: "등록에 성공했습니다.",
        adId: "0000"
    });
}

function activeAd(req : Request, res : Response){
    res.json({
        status: "success",
        message: "active Success!"
    });
}

async function requestAdminList(req : Request, res : Response){
    var data :Object;
    var count : any = [];
    await new Promise<void>((resolve) => {
        connection.query(`select ads.id as adId, name, create_at as createAt, period_begin as periodBegin, period_end as periodEnd, max_view_count as maxViewCount,  (Case when active_ads.id Is null then False else True end ) as isActive from ads left join active_ads on ads.id = active_ads.id`,
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

    await new Promise<void>((resolve) => {
        connection.query(`select count(*) as adCount from ads`,
        function(err : Error, result : any){
            if(err){
                console.log(err);
                res.json({
                    status : "error"
                })  
                return
            }
            count= result;
            resolve();
        })
    });
    res.json({adCount : count[0].adCount ,data : data!});
    
}


export {requestList,readAd,deleteAd,createAd,activeAd,requestAdminList} ;