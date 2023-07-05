import express, {Express, Request, Response} from "express";
import mysql from 'mysql';
import cors from 'cors';
import adRoutes from './routes/ad'
const port : Number = 8000;

//db connector
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


const app: Express = express();

app.use(express.static('.')) //url로 직접 사진에 접속할때 필요한 코드 "localhost:8000/pic1.jpeg"
app.use(express.json());
app.use('/AD', adRoutes);
app.use(cors());

//db 연결 잘되나 확인하는 url
app.get('/dbTest',(req : Request, res : Response)=>{
    connection.query('SELECT * From Test', (error, result)=>{
        if (error){
            console.error('쿼리 실행 실패:', error);
        
            return
            
        }
        console.log(result);
        res.json(result);
    });
});


// 사진보내기 테스트 겸 기본화면
app.get('/',(req : Request, res : Response)=>{
    const photoPath : string = 'pic1.jpeg';
    res.sendFile(photoPath, {root : '.'}); // root 잘 확인해야될듯
});



/* 이하 테스트를 위한 더미 코드 */

app.get('/test/readAd',(req : Request, res : Response)=>{
    res.send({stauts: "success",
    data : [{content: "pic1.jpeg",width : "readAd"}]
})
});



app.delete('/test/deleteAd',(req : Request, res : Response)=>{
    res.json({stauts: "success", message : ""});
});

app.put('/test/createAd',(req : Request, res : Response)=>{
    res.json({
        status: "success",
        message: "등록에 성공했습니다.",
        adId: "0000"
    });
});

app.post('/test/activeAd',(req : Request, res : Response)=>{
    res.json({
        status: "success",
        message: "active Success!"
    });
});

app.post('/test/createAd',(req : Request, res : Response)=>{
    res.send({
        status : "success",
        message: "등록에 성공했습니다",
        adId: "0000"
    });
});

app.get('/test/requestAdminList', async (req : Request, res : Response)=>{
    var data :Object;
    var count : any = [];
    await new Promise<void>((resolve) => {
        connection.query(`select id as adId, name, create_at as createAt, period_begin as periodBegin, period_end as periodEnd, max_view_count as maxViewCount from ads`,
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
            }
            count= result;
            resolve();
        })
    });

    console.log(data!);
    console.log(count!);
    res.json({adCount : count[0].adCount ,data : data!});
    
});



/* ********************** */



app.listen(port, ()=>{
    console.log(`listening on port ${port}` )
});