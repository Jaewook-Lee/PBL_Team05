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
exports.requestAdminListModel = exports.updateAdModel = exports.activeModel = exports.createAdModel = exports.deleteAdModel = exports.readAdModel = exports.requestListModel = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
//db connector
const result = dotenv_1.default.config({ path: path_1.default.join(__dirname, "../..", ".env") });
if (result.parsed === undefined) {
    throw new Error("Can't load env file!");
}
else {
    console.log("Load env file complete");
}
const connection = mysql_1.default.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB_NAME
});
connection.connect((error) => {
    if (error) {
        console.error('fail to connect', error);
        return;
    }
    console.log('db connect success');
});
function requestListModel(req, res) {
    connection.query(`select * from ads where gender = '${req.query.gender}' and country  = "${req.body.country}";`, function (err, result) {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "불러오기에 실패했습니다.."
            });
            return;
        }
        res.json(result);
        return;
    });
}
exports.requestListModel = requestListModel;
function readAdModel(req, res) {
    connection.query(`select ads.name, ad_contents_data.contents, ads.period_begin, ads.period_end, ads.advertizer, ads.country, ad_contents_data.type, ad_statics.hit_count, ad_statics.hit_time_sum from ads inner join ad_contents_data on ads.id = ad_contents_data.id inner join ad_statics on ads.id = ad_statics.id where ads.id = ${req.query.adId}`, function (err, result) {
        // DB 조회 과정에서 에러가 나거나, row 수가 0일 경우(JOIN 결과 row가 0개일 수 있다.) 실패 메시지 전달
        if (err || result.length === 0) {
            console.log(err);
            console.log(`Result rows: ${result}`);
            res.json({
                status: "fail",
                message: "조회에 실패했습니다."
            });
        }
        else {
            const startDay = result[0].period_begin;
            const startYear = startDay.getFullYear();
            const startMonth = startDay.getMonth();
            const startDate = startDay.getDate();
            const endDay = result[0].period_end;
            const endYear = endDay.getFullYear();
            const endMonth = endDay.getMonth();
            const endDate = endDay.getDate();
            const period = `${startYear}-${startMonth}-${startDate} ~ ${endYear}-${endMonth}-${endDate}`;
            res.json({
                "adName": result[0].name,
                "contents": result[0].contents,
                "period": period,
                "advertiser": result[0].advertizer,
                "language": result[0].country,
                "adType": result[0].type,
                "hitCount": result[0].hit_count,
                "watchTimeSum": result[0].hit_count_sum
            });
        }
    });
}
exports.readAdModel = readAdModel;
function deleteAdModel(req, res) {
    connection.query(`delete from ads where id = "${req.body.adId}"`, function (err) {
        if (err) {
            //todo : id가 없을 경우 삭제를 안하는데 성공으로 메시지가 전달되긴 함.
            res.json({
                status: "fail",
                message: "삭제에 실패했습니다."
            });
            console.log(err);
            return;
        }
        res.json({
            status: "success",
            message: "삭제에 성공했습니다."
        });
        return;
    });
}
exports.deleteAdModel = deleteAdModel;
function createAdModel(req, res, countryCode) {
    connection.query(`Insert into ads (name,advertizer,create_at,country,gender,period_begin,period_end,max_view_count) 
    values ("${req.body.name}","${req.body.advertizer}","${req.body.createdAt}","${countryCode}","${req.body.gender}","${req.body.periodBegin}",
    "${req.body.periodEnd}","${req.body.maxViewCount}")`, (err) => {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "등록에 실패했습니다."
            });
            return;
        }
        connection.query(`select id as adId from ads where name = "${req.body.name}" order by create_at desc`, (err, result) => {
            res.json({
                status: "success",
                message: "등록에 성공했습니다.",
                adId: result[0].adId
            });
            return;
        });
    });
}
exports.createAdModel = createAdModel;
function activeModel(req, res) {
    connection.query(`insert into active_ads (id) values (${req.body.adId});`, function (err) {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "active fail!"
            });
            return;
        }
        res.json({
            status: "success",
            message: "active Success!"
        });
        return;
    });
}
exports.activeModel = activeModel;
function updateAdModel(req, res) {
    var parameterList = ["name", "advertizer", "createdAt", "country", "gender", "periodBegin", "periodEnd", "maxViewCount"];
    var sqlQuery = `update ads set `;
    var queryList = [`name = "${req.body.name}",`, `advertizer="${req.body.advertizer}",`, `create_at="${req.body.createdAt}",`,
        `country="${req.body.country}",`, `gender="${req.body.gender}",`, `period_begin="${req.body.periodBegin}",`, `period_end="${req.body.periodEnd}",`,
        `period_end="${req.body.periodEnd}",`, `max_view_count= "${req.body.maxViewCount}"`];
    console.log(req.body[parameterList[5]]);
    for (let i = 0; i < parameterList.length; i++) {
        if (req.body[parameterList[i]] != undefined) {
            sqlQuery += queryList[i];
        }
    }
    if (sqlQuery.charAt(sqlQuery.length - 1) == ",") {
        sqlQuery = sqlQuery.slice(0, -1);
    }
    sqlQuery += ` where id = "${req.body.adId}"`;
    console.log(sqlQuery);
    connection.query(sqlQuery, function (err) {
        if (err) {
            console.log(err);
            res.json({
                status: "fail",
                message: "수정에 실패했습니다."
            });
            return;
        }
        res.json({
            status: "success",
            message: "수정에 성공했습니다.",
        });
        return;
    });
}
exports.updateAdModel = updateAdModel;
function requestAdminListModel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var offset = Number(req.query.offset);
        var length = Number(req.query.length);
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
exports.requestAdminListModel = requestAdminListModel;
