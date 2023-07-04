"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const ad_1 = __importDefault(require("./routes/ad"));
const port = 8000;
//db connector
const connection = mysql_1.default.createConnection({
    host: 'ls-9c7d7b612085a406360965e6158e47d7564a40d7.c8heglnxvydw.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'dbmasteruser',
    password: '00000000',
    database: 'dbmaster'
});
connection.connect((error) => {
    if (error) {
        console.error('fail to connect', error);
        return;
    }
    console.log('db connect success');
});
const app = (0, express_1.default)();
app.use(express_1.default.static('.')); //url로 직접 사진에 접속할때 필요한 코드 "localhost:8000/pic1.jpeg"
app.use(express_1.default.json());
app.use('/AD', ad_1.default);
app.use((0, cors_1.default)());
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
// 사진보내기 테스트 겸 기본화면
app.get('/', (req, res) => {
    const photoPath = 'pic1.jpeg';
    res.sendFile(photoPath, { root: '.' }); // root 잘 확인해야될듯
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
