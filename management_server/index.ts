import express, {Express} from "express";
import adRoutes from './routes/ad'
import picRouter from './routes/pic'
const port : Number = 8000;



const app: Express = express();
app.use(express.static('.')) //url로 직접 사진에 접속할때 필요한 코드 "localhost:8000/pic1.jpeg"
app.use(express.json());
app.use('/AD', adRoutes);
app.use('/', picRouter);



// 사진보내기 테스트 겸 기본화면
// app.get('/',(req : Request, res : Response)=>{
//     const photoPath : string = 'pic1.jpeg';
//     res.sendFile(photoPath, {root : './'}); // root 잘 확인해야될듯
// });


app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
});