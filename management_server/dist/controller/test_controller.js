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
exports.requestAdminList = exports.activeAd = exports.createAd = exports.deleteAd = exports.readAd = exports.requestList = void 0;
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
function requestList(req, res) {
    res.json({ stauts: "success",
        data: [{ content: "pic1.jpeg", width: "100", height: "100", slotId: "1234", exposureTime: "2023-11-11 15:00:00" }]
    });
}
exports.requestList = requestList;
function readAd(req, res) {
    res.send({ stauts: "success",
        data: [{ content: "pic1.jpeg", width: "readAd" }]
    });
}
exports.readAd = readAd;
function deleteAd(req, res) {
    res.json({ stauts: "success", message: "" });
}
exports.deleteAd = deleteAd;
function createAd(req, res) {
    res.json({
        status: "success",
        message: "등록에 성공했습니다.",
        adId: "0000"
    });
}
exports.createAd = createAd;
function activeAd(req, res) {
    res.json({
        status: "success",
        message: "active Success!"
    });
}
exports.activeAd = activeAd;
function requestAdminList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
                    return;
                }
                count = result;
                resolve();
            });
        });
        res.json({ adCount: count[0].adCount, data: data });
    });
}
exports.requestAdminList = requestAdminList;
