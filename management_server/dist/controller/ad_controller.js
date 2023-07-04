"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestList = exports.uploadContents = exports.updateAd = exports.activeAd = exports.createAd = exports.readAd = exports.deleteAd = void 0;
const mysql_1 = __importDefault(require("mysql"));
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
function deleteAd(req, res) {
    console.log(req.body);
    connection.query(`delete from ads where id = "${req.body.adId}"`, function (err) {
        if (err) {
            //todo : id가 없을 경우 삭제를 안하는데 성공으로 메시지가 전달되긴 함.
            res.json({
                "status": "fail",
                "message": "삭제에 실패했습니다.",
            });
            console.log(err);
        }
        else {
            res.json({
                "status": "success",
                "message": "삭제에 성공했습니다.",
            });
        }
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
    console.log(req.body);
    connection.query(`Insert into ads (name,advertizer,create_at,country,gender,period_begin,period_end,max_view_count) 
    values ("${req.body.name}","${req.body.advertizer}","${req.body.createdAt}","${req.body.country}","${req.body.gender}","${req.body.periodBegin}",
    "${req.body.periodEnd}","${req.body.maxViewCount}")`, function (err) {
        if (err) {
            res.json({
                "status": "fail",
                "message": "등록에 실패했습니다.",
            });
        }
        res.json({
            "status": "success",
            "message": "등록에 성공했습니다.",
            "adId": "0000"
        });
    });
}
exports.createAd = createAd;
function activeAd(req, res) {
    res.json(JSON.stringify({
        "status": "success",
        "message": "active Success!"
    }));
}
exports.activeAd = activeAd;
function updateAd(req, res) {
    res.json({
        "status": "success",
        "message": "업데이트에 성공했습니다",
        "adId": "0000"
    });
}
exports.updateAd = updateAd;
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
