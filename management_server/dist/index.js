"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const port = 8000;
//db connectior
const connection = mysql_1.default.createConnection({
    host: 'ls-9c7d7b612085a406360965e6158e47d7564a40d7.c8heglnxvydw.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'dbmasteruser',
    password: '',
    database: 'dbmaster'
});
connection.connect((error) => {
    if (error) {
        console.error('연결실패', error);
        return;
    }
    console.log('연결성공');
});
const app = (0, express_1.default)();
app.use(express_1.default.static('.')); //????어따쓰는거지
//db 연결 잘되나 확인하는 url
app.get('/dbTest', (req, res) => {
    connection.query('SELECT * From Test', (error, result) => {
        if (error) {
            console.error('쿼리 실행 실패:', error);
            return;
        }
        res.json(result);
    });
});
//사진보내기 테스트 겸 기본화면
app.get('/', (req, res) => {
    const photoPath = 'pic1.jpeg';
    res.sendFile(photoPath, { root: '.' }); // root 잘 확인해야될듯
});
app.get('/AD/requestList', (req, res) => {
    res.json({ "stauts": "success",
        "data": [{ "content": "pic1.jpeg", "width": "dddddd" }]
    });
});
app.get('/AD/readAd', (req, res) => {
    res.send({ "stauts": "success",
        "data": [{ "content": "pic1.jpeg", "width": "ssssss" }]
    });
});
app.delete('/AD/deleteAd', (req, res) => {
    res.json({ "stauts": "success", "message": "" });
});
app.put('/AD/createAd', (req, res) => {
    res.json({
        "status": "success",
        "message": "등록에 성공했습니다.",
        "adId": "0000"
    });
});
app.post('/AD/activeAd', (req, res) => {
    res.json({
        "status": "success",
        "message": "active Success!"
    });
});
app.post('/AD/createAd', (req, res) => {
    res.send({
        "status": "success",
        "message": "등록에 성공했습니다",
        "adId": "0000"
    });
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
