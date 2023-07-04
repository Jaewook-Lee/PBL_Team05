"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("../controller/test_controller");
const router = (0, express_1.Router)();
router.get('/requestList', test_controller_1.requestList);
exports.default = router;
