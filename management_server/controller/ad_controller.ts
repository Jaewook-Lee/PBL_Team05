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




function deleteAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": ""
    })
}

function readAd (req: Request, res: Response) {
    res.json({
        "stauts": "success",
        "data" : [{
            "content": "pic1.jpeg",
            "width" : "ssssss"
        }]
    })
}


function createAd(req: Request, res: Response){
    console.log(req.body);
    
    connection.query(`Insert into ads (name,advertizer,create_at,country,gender,period_begin,period_end,max_view_count) 
    values ("${req.body.name}","${req.body.advertizer}","${req.body.createdAt}","${req.body.country}","${req.body.gender}","${req.body.periodBegin}",
    "${req.body.periodEnd}","${req.body.maxViewCount}")`,
    function(err : Error){
        if(err){
            res.json({
                "status": "fail",
                "message": "등록에 실패했습니다.",
            });
        }
        res.json({
            "status": "success",
            "message": "등록에 성공했습니다.",
            "adId": "0000"
        });
    }
    );
}



function activeAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "active Success!"
    });
}

function updateAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "업데이트에 성공했습니다",
        "adId": "0000"
    });
}

function uploadContents (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "업로드에 성공했습니다."
    });
}

function requestList (req: Request, res: Response) {
    res.json({
        "stauts": "success",
        "data" : [{
            "content": "pic1.jpeg",
            "width" : "dddddd"
        }]
    });
}

export { deleteAd, readAd, createAd, activeAd, updateAd, uploadContents, requestList }