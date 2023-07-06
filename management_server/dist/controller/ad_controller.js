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
const iso_3166_1_1 = __importDefault(require("iso-3166-1"));
const ad_model_1 = require("../model/ad_model");
// ad 정렬해서 filtering하는 기능이 필요 할 듯.
//get
function requestList(req, res) {
    (0, ad_model_1.requestListModel)(req, res);
}
exports.requestList = requestList;
// db및 api 수정필요.
//get
function readAd(req, res) {
    if (req.query.adId === undefined) {
        res.json({
            status: "fail",
            message: "조회에 실패했습니다."
        });
        return;
    }
    (0, ad_model_1.readAdModel)(req, res);
}
exports.readAd = readAd;
//delete
function deleteAd(req, res) {
    console.log(req.body);
    console.log(req);
    (0, ad_model_1.deleteAdModel)(req, res);
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
        return;
    }
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
    (0, ad_model_1.createAdModel)(req, res, countryCode);
}
exports.createAd = createAd;
//todo deactivate도 필요할듯.
//post
function activeAd(req, res) {
    (0, ad_model_1.activeModel)(req, res);
}
exports.activeAd = activeAd;
//put
//todo
// api문서 및 구조 바꿔야 할 수도. 수정창에서 불러올때는 get 수정할때는 post,put 으로 동작하게 해야할 듯 함.
function updateAd(req, res) {
    updateAd(req, res);
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
    return;
}
exports.uploadContents = uploadContents;
//todo Error control
function requestAdminList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req);
        if (req.query.offset == undefined && req.query.length == undefined) {
            res.json({ status: "error", message: "필수 파라미터 (offset,length) Error" });
            return;
        }
        (0, ad_model_1.requestAdminListModel)(req, res);
    });
}
exports.requestAdminList = requestAdminList;
