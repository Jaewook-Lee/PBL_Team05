"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestList = exports.uploadContents = exports.activeAd = exports.createAd = exports.readAd = exports.deleteAd = void 0;
const mysql_1 = __importDefault(require("mysql"));
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
function deleteAd(req, res) {
    res.json({
        "status": "success",
        "message": ""
    });
}
exports.deleteAd = deleteAd;
function readAd(req, res) {
    res.json({
        "stauts": "success",
        "data": [{
                "content": "pic1.jpeg",
                "width": "ssssss"
            }]
    });
}
exports.readAd = readAd;
function createAd(req, res) {
    const httpMethod = req.method;
    const params = req.body;
    if (httpMethod === "POST") {
        if (params.name === undefined || params.advertizer === undefined || params.createdAt === undefined || params.country === undefined || params.gender === undefined || params.periodBegin === undefined || params.periodEnd === undefined || params.maxViewCount === undefined) {
            res.json({
                "status": "fail",
                "message": "잘못된 데이터가 입력되었습니다."
            });
        }
        else {
        }
    }
    else { // httpMethod === "PUT"
    }
    res.json({
        "status": "success",
        "message": "등록에 성공했습니다.",
        "adId": "0000"
    });
}
exports.createAd = createAd;
function activeAd(req, res) {
    res.json({
        "status": "success",
        "message": "active Success!"
    });
}
exports.activeAd = activeAd;
function uploadContents(req, res) {
    res.json({
        "status": "success",
        "message": "업로드에 성공했습니다."
    });
}
exports.uploadContents = uploadContents;
function requestList(req, res) {
    res.json({
        "stauts": "success",
        "data": [{
                "content": "pic1.jpeg",
                "width": "dddddd"
            }]
    });
}
exports.requestList = requestList;
