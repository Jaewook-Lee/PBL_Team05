import mysql from 'mysql';


const connection : mysql.Connection = mysql.createConnection({
    host : 'ls-9c7d7b612085a406360965e6158e47d7564a40d7.c8heglnxvydw.ap-northeast-2.rds.amazonaws.com',
    port : 3306,
    user : 'dbmasteruser',
    password : '',
    database : 'dbmaster'
});

connection.connect ((error)=>{
    if (error){
        console.error('연결실패',error);
        return;
    }
    console.log('연결성공')
})

export default connection;