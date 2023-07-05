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

export {requestList} ;