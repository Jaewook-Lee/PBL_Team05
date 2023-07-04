"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ad_controller_1 = require("../controller/ad_controller");
const router = (0, express_1.Router)();
router.get('/requestList', ad_controller_1.requestList); // 이건 user가 list를 달라고 하는건데 더미코드가 필요해 여기 있는것
router.get('/readAd', ad_controller_1.readAd);
router.delete('/deleteAd', ad_controller_1.deleteAd);
router.put('/createAd', ad_controller_1.createAd);
router.post('/activeAd', ad_controller_1.activeAd);
router.post('/updateAd', ad_controller_1.updateAd);
router.post('/uploadContents', ad_controller_1.uploadContents); //광고의 contents를 upload
exports.default = router;
