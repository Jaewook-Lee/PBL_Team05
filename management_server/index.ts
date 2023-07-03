import express, {Express, Request, Response} from "express";
import bodyParser from 'body-parser';


const port = 8000;

const app: Express = express();
app.use(express.static('/'))


app.get('/',(req : Request, res : Response)=>{
    const photoPath = 'pic1.jpeg'
    res.sendFile(photoPath, {root : './'});
});

app.get('/AD/readAd',(req : Request, res : Response)=>{
    res.json({
        "adName": "대충 광고 이름",
        "period": "2017-01-01 ~ 2017-01-31",
        "unitPrice": "1000",
        "advertiser": "대충 광고주",
        "language": "ko",
        "adType": "banner"
    })
});

app.delete('/AD/deleteAd',(req : Request, res : Response)=>{
    res.json({
        "stauts": "success",
        "message" : ""}
    );
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
    res.json({
        "status": "success",
        "message": "등록에 성공했습니다",
        "adId": "0000"
    });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
});