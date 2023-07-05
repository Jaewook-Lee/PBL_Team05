"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    database: 'ad_management_platform_server'
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
        console.log(result);
        res.json(result);
    });
});
// 사진보내기 테스트 겸 기본화면
app.get('/', (req, res) => {
    const photoPath = 'pic1.jpeg';
    res.sendFile(photoPath, { root: '.' }); // root 잘 확인해야될듯
});
/* 이하 테스트를 위한 더미 코드 */
app.get('/test/requestList/', (req, res) => {
    res.json({ stauts: "success",
        data: [{ content: "pic1.jpeg", width: "100", height: "100", slotId: "1234", exposureTime: "2023-11-11 15:00:00" }]
    });
});
app.get('/test/readAd', (req, res) => {
    res.send({ stauts: "success",
        data: [{ content: "pic1.jpeg", width: "readAd" }]
    });
});
app.delete('/test/deleteAd', (req, res) => {
    res.json({ stauts: "success", message: "" });
});
app.put('/test/createAd', (req, res) => {
    res.json({
        status: "success",
        message: "등록에 성공했습니다.",
        adId: "0000"
    });
});
app.post('/test/activeAd', (req, res) => {
    res.json({
        status: "success",
        message: "active Success!"
    });
});
app.post('/test/createAd', (req, res) => {
    res.send({
        status: "success",
        message: "등록에 성공했습니다",
        adId: "0000"
    });
});
app.get('/test/requestAdminList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var data;
    var count = [];
    yield new Promise((resolve) => {
        connection.query(`select ads.id as adId, name, create_at as createAt, period_begin as periodBegin, period_end as periodEnd, max_view_count as maxViewCount,  (Case when active_ads.id Is null then False else True end ) as isActive from ads left join active_ads on ads.id = active_ads.id`, function (err, result) {
            if (err) {
                console.log(err);
                res.json({
                    status: "error"
                });
            }
            data = result;
            resolve();
        });
    });
    yield new Promise((resolve) => {
        connection.query(`select count(*) as adCount from ads`, function (err, result) {
            if (err) {
                console.log(err);
                res.json({
                    status: "error"
                });
            }
            count = result;
            resolve();
        });
    });
    console.log(data);
    console.log(count);
    res.json({ adCount: count[0].adCount, data: data });
}));
/* ********************** */
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
