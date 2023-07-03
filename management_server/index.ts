import express, {Express, Request, Response} from "express";
import bodyParser from 'body-parser';
import mysql from 'mysql';
import  connection  from "./dbConnector";

const port = 8000;

const app: Express = express();
app.use(express.static('.')) //????어따쓰는거지


//db 연결 잘되나 확인하는 url
app.get('/dbTest',(req : Request, res : Response)=>{
    connection.query('SELECT * From Test', (error, result)=>{
        if (error){
            console.error('쿼리 실행 실패:', error);
            return
        }
        res.json(result);
    });
});


//사진보내기 테스트 겸 기본화면
app.get('/',(req : Request, res : Response)=>{
    const photoPath = 'pic1.jpeg'
    res.sendFile(photoPath, {root : '.'}); // root 잘 확인해야될듯
});


app.get('/AD/requestList',(req : Request, res : Response)=>{
    res.json({"stauts": "success",
            "data" : [{"content": "pic1.jpeg","width" : "dddddd"}]
    });
});


app.get('/AD/readAd',(req : Request, res : Response)=>{
    res.send({"stauts": "success",
    "data" : [{"content": "pic1.jpeg","width" : "ssssss"}]
})
});

app.delete('/AD/deleteAd',(req : Request, res : Response)=>{
    res.json({"stauts": "success", "message" : ""});
});

app.put('/AD/createAd',(req : Request, res : Response)=>{
    res.json({
        "status": "success",
        "message": "등록에 성공했습니다.",
        "adId": "0000"
    });
});

app.post('/AD/activeAd',(req : Request, res : Response)=>{
    res.json({
        "status": "success",
        "message": "active Success!"
    });
});

app.post('/AD/createAd',(req : Request, res : Response)=>{
    res.send({
        "status": "success",
        "message": "등록에 성공했습니다",
        "adId": "0000"
    });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
});