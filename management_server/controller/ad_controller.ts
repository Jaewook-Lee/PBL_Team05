import { Request, Response } from 'express';
import mysql from 'mysql';

//db connector
const connection : mysql.Connection = mysql.createConnection({
    host : 'ls-9c7d7b612085a406360965e6158e47d7564a40d7.c8heglnxvydw.ap-northeast-2.rds.amazonaws.com',
    port : 3306,
    user : 'dbmasteruser',
    password : '00000000',
    database : 'dbmaster'
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

function createAd (req: Request, res: Response) {
    const httpMethod : string = req.method;
    const params = req.body;
    if (httpMethod === "POST") {
        if (params.name === undefined || params.advertizer === undefined || params.createdAt === undefined || params.country === undefined || params.gender === undefined || params.periodBegin === undefined || params.periodEnd === undefined || params.maxViewCount === undefined) {
            res.json({
                "status": "fail",
                "message": "잘못된 데이터가 입력되었습니다."
            })
        }
        else {

        }
    }
    else {    // httpMethod === "PUT"

    }

    res.json({
        "status": "success",
        "message": "등록에 성공했습니다.",
        "adId": "0000"
    });
}

function activeAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "active Success!"
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

export { deleteAd, readAd, createAd, activeAd, uploadContents, requestList }