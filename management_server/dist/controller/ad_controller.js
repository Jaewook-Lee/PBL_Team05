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
exports.requestAdminList = exports.requestList = exports.uploadContents = exports.updateAd = exports.activeAd = exports.createAd = exports.readAd = exports.deleteAd = void 0;
const mysql_1 = __importDefault(require("mysql"));
const iso_3166_1_1 = __importDefault(require("iso-3166-1"));
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
// ad 정렬해서 filtering하는 기능이 필요 할 듯.
//get
function requestList(req, res) {
    connection.query(`select * from ads where gender = '${req.query.gender}' and country  = "${req.body.country}";`, function (err, result) {
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
// db및 api 수정필요.
//get
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
//delete
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
//post
function createAd(req, res) {
    const params = req.body;
    // Validation
    if (params.name === undefined || params.advertizer === undefined || params.createdAt === undefined || params.country === undefined || params.gender === undefined || params.periodBegin === undefined || params.periodEnd === undefined || params.maxViewCount === undefined) {
        res.json({
            "status": "fail",
            "message": "잘못된 데이터가 입력되었습니다."
        });
    }
    else {
        // Parsing country name to numeric country code
        const countryName = params.country;
        const isoAllData = iso_3166_1_1.default.all();
        let countryCode = -1;
        for (let i = 0; i < isoAllData.length; i++) {
            if (countryName === isoAllData[i].country) {
                countryCode = Number(isoAllData[i].numeric);
                break;
            }
        }
        connection.query(`Insert into ads (name,advertizer,create_at,country,gender,period_begin,period_end,max_view_count) 
        values ("${req.body.name}","${req.body.advertizer}","${req.body.createdAt}","${countryCode}","${req.body.gender}","${req.body.periodBegin}",
        "${req.body.periodEnd}","${req.body.maxViewCount}")`, (err) => {
            if (err) {
                console.log(err);
                res.json({
                    status: "fail",
                    message: "등록에 실패했습니다."
                });
            }
            else {
                connection.query(`select id as adId from ads where name = "${req.body.name}" order by create_at desc`, (err, result) => {
                    res.json({
                        status: "success",
                        message: "등록에 성공했습니다.",
                        adId: result[0].adId
                    });
                });
            }
        });
    }
}
exports.createAd = createAd;
//deactivate도 필요할듯.
//post
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
//put
//todo
// api문서 및 구조 바꿔야 할 수도. 수정창에서 불러올때는 get 수정할때는 post,put 으로 동작하게 해야할 듯 함.
function updateAd(req, res) {
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
//post
//todo
function uploadContents(req, res) {
    res.json({
        status: "success",
        message: "업로드에 성공했습니다."
    });
}
exports.uploadContents = uploadContents;
//todo Error control
function requestAdminList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var offset = Number(req.query.offset);
        var length = Number(req.query.length);
        if (offset == undefined && length == undefined) {
            res.json({ status: "error", message: "필수 파라미터 (offset,length) Error" });
            return;
        }
        var type = req.query.type;
        var search = req.query.search;
        var sqlQuery = `select ads.id as adId, name, create_at as createAt, period_begin as periodBegin, period_end as periodEnd, max_view_count as maxViewCount,  (Case when active_ads.id Is null then False else True end ) as isActive from ads left join active_ads on ads.id = active_ads.id `;
        var whereQuery = `where ${type} like "%${search}%"`;
        if (type != undefined) {
            sqlQuery += whereQuery;
        }
        sqlQuery += ` limit ${offset},${length};`;
        var data;
        var count = [];
        yield new Promise((resolve) => {
            connection.query(sqlQuery, function (err, result) {
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
        var sqlQuery2 = `select count(*) as adCount from ads `;
        if (type != undefined) {
            sqlQuery2 += whereQuery;
        }
        yield new Promise((resolve) => {
            connection.query(sqlQuery2, function (err, result) {
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
        res.json({ adCount: count[0].adCount, data: data });
    });
}
exports.requestAdminList = requestAdminList;
