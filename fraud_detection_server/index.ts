import express, {Express, Request, Response} from "express";
import bodyParser from 'body-parser';


const port = 5000;

const app: Express = express();
app.use(express.static('/'))

app.get('/',(req : Request, res : Response)=>{
    const photoPath = 'pic1.jpeg'
    res.sendFile(photoPath, {root : './'});
});

app.put('/AD/collectHit',(req : Request, res : Response)=>{});

app.put('/AD/collectWatchTime',(req : Request, res : Response)=>{});

app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
});