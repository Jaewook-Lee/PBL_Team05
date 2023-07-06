"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("../controller/test_controller");
const router = (0, express_1.Router)();
router.get('/requestList', test_controller_1.requestList);
router.get('/readAd', test_controller_1.readAd);
router.delete('/deleteAd', test_controller_1.deleteAd);
router.post('/createAd', test_controller_1.createAd);
router.post('/activeAd', test_controller_1.activeAd);
// router.put('/updateAd', updateAd);
// router.post('/uploadContents', uploadContents);    //광고의 contents를 upload
router.get("/requestAdminList", test_controller_1.requestAdminList);
exports.default = router;
