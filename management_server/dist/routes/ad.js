"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ad_controller_1 = require("../controller/ad_controller");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
// router.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
//   });
router.get('/requestList', ad_controller_1.requestList); // 이건 user가 list를 달라고 하는건데 더미코드가 필요해 여기 있는것
router.get('/readAd', ad_controller_1.readAd);
router.delete('/deleteAd', ad_controller_1.deleteAd);
router.post('/createAd', ad_controller_1.createAd);
router.post('/activeAd', ad_controller_1.activeAd);
router.put('/updateAd', ad_controller_1.updateAd);
router.post('/uploadContents', ad_controller_1.uploadContents); //광고의 contents를 upload
router.get("/requestAdminList", ad_controller_1.requestAdminList);
exports.default = router;
