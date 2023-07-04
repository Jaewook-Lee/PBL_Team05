import { Request, Response } from 'express';

function deleteAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": ""
    })
}

function readAd (req: Request, res: Response) {
    res.json({
        "stauts": "success",
        "data" : [{
            "content": "pic1.jpeg",
            "width" : "ssssss"
        }]
    })
}

function createAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "등록에 성공했습니다.",
        "adId": "0000"
    });
}

function activeAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "active Success!"
    });
}

function updateAd (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "업데이트에 성공했습니다",
        "adId": "0000"
    });
}

function uploadContents (req: Request, res: Response) {
    res.json({
        "status": "success",
        "message": "업로드에 성공했습니다."
    });
}

function requestList (req: Request, res: Response) {
    res.json({
        "stauts": "success",
        "data" : [{
            "content": "pic1.jpeg",
            "width" : "dddddd"
        }]
    });
}

export { deleteAd, readAd, createAd, activeAd, updateAd, uploadContents, requestList }