import express, {Express, Request, Response} from "express";
import bodyParser from 'body-parser';


const port = 3000;

const app: Express = express();
app.use(express.static('/'))

app.get('/',(req : Request, res : Response)=>{
    const photoPath = 'pic1.jpeg'
    res.sendFile(photoPath, {root : './'});
});

app.get('/AD/requestList',(req : Request, res : Response)=>{
    res.json({
        "stauts": "success",
        "data": [{
            "content": "http://localhost:8000/ad_server/pic1.jpeg",
            "width": 0,
            "height": 0,
            "slotId": "1a2b3c4d",
            "exposureTime": "Fri/Jun/30/2023/00:00:00/GMT+0900"
        }]
    });
});

app.post('/AD/uploadContents',(req : Request, res : Response)=>{
    res.json({
        "status": "success",
        "message": "업로드에 성공했습니다."
    });
});

app.get('/AD/syncList',(req : Request, res : Response)=>{
    res.json({
        "status": "success",
        "message": "등록에 성공했습니다",
        "version": "20230331"
    });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
});