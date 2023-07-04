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
                status: "fail",
                message: "삭제에 실패했습니다."
            });
            console.log(err);
        }
        else {
            res.json({
                status: "success",
                message: "삭제에 성공했습니다."
            });
        }
    });

}
exports.deleteAd = deleteAd;
// db및 api 수정필요.
function readAd(req, res) {
    console.log(req.body);
    connection.query(`select name as adName, period_begin, period_end, advertizer, country from ads where id = '${req.body.adId}' `, function (err, result) {
        if (err) {
            console.log(err);
            // Todo : 빈 객체일 경우 실패 메시지 전달하도록 코드 작성해야될듯
            res.json({
                status: "fail",
                message: "조회에 실패했습니다."
            });
        }
        else {
            console.log(result);
            res.json(result);
        }
    });
}
exports.readAd = readAd;
function createAd(req, res) {
    console.log(req.body);
    connection.query(`Insert into ads (name,advertizer,create_at,country,gender,period_begin,period_end,max_view_count) 
    values ("${req.body.name}","${req.body.advertizer}","${req.body.createdAt}","${req.body.country}","${req.body.gender}","${req.body.periodBegin}",
    "${req.body.periodEnd}","${req.body.maxViewCount}")`, function (err) {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "등록에 실패했습니다."
            });
        }
        else {
            res.json({
                status: "success",
                message: "등록에 성공했습니다.",
                adId: "0000"
            });
        }
    });
}
exports.createAd = createAd;
//deactivate도 필요할듯.
function activeAd(req, res) {
    connection.query(`insert into active_ads (id) values (${req.body.adId});`, function (err) {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "active fail!"
            });
        }
        else {
            res.json({
                status: "success",
                message: "active Success!"
            });
        }
    });
}
exports.activeAd = activeAd;
// api문서 및 구조 바꿔야 할 수도. 수정창에서 불러올때는 get 수정할때는 post,put 으로 동작하게 해야할 듯 함.
function updateAd(req, res) {
    console.log(req.body);
    connection.query(`update ads set name="${req.body.name}" ,advertizer="${req.body.advertizer}",create_at="${req.body.createdAt}",country="${req.body.country}",gender="${req.body.gender}",period_begin="${req.body.periodBegin}",period_end="${req.body.periodEnd}",max_view_count= "${req.body.maxViewCount}" where id = "${req.body.adId}"`, function (err) {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "수정에 실패했습니다."
            });
        }
        else {
            res.json({
                status: "success",
                message: "수정에 성공했습니다.",
            });
        }
    });
}
exports.updateAd = updateAd;
// file을 받는 tool 필요할듯.
function uploadContents(req, res) {
    res.json({
        status: "success",
        message: "업로드에 성공했습니다."
    });
}
exports.uploadContents = uploadContents;
// ad 정렬해서 filtering하는 기능이 필요 할 듯.
function requestList(req, res) {
    connection.query(`select * from ads where gender = '${req.body.gender}' and country  = "${req.body.country}";`, function (err, result) {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "불러오기에 실패했습니다.."
            });
        }
        else {
            res.json(result);
        }
    });

}
exports.requestList = requestList;
