"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestList = exports.uploadContents = exports.updateAd = exports.activeAd = exports.createAd = exports.readAd = exports.deleteAd = void 0;
function deleteAd(req, res) {
    res.json(JSON.stringify({
        "status": "success",
        "message": ""
    }));
}
exports.deleteAd = deleteAd;
function readAd(req, res) {
    res.json(JSON.stringify({
        "stauts": "success",
        "data": [{
                "content": "pic1.jpeg",
                "width": "ssssss"
            }]
    }));
}
exports.readAd = readAd;
function createAd(req, res) {
    res.json(JSON.stringify({
        "status": "success",
        "message": "등록에 성공했습니다.",
        "adId": "0000"
    }));
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
    res.json(JSON.stringify({
        "status": "success",
        "message": "업데이트에 성공했습니다",
        "adId": "0000"
    }));
}
exports.updateAd = updateAd;
function uploadContents(req, res) {
    res.json(JSON.stringify({
        "status": "success",
        "message": "업로드에 성공했습니다."
    }));
}
exports.uploadContents = uploadContents;
function requestList(req, res) {
    res.json(JSON.stringify({
        "stauts": "success",
        "data": [{
                "content": "pic1.jpeg",
                "width": "dddddd"
            }]
    }));
}
exports.requestList = requestList;
