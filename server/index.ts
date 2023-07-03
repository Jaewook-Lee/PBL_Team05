import express, {Express, Request, Response} from "express";
import bodyParser from 'body-parser';


const port = 8000;

const app: Express = express();
app.use(express.static('/'))


app.get('/',(req : Request, res : Response)=>{
    const photoPath = 'pic1.jpeg'
    res.sendFile(photoPath, {root : './'});
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

app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
});