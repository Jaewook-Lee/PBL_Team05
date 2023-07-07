import { Request, Response } from 'express';
import { country2Num } from '../utility/countryToNum';
import { checkUndefined } from '../utility/chkParams';
import { activeModel, createAdModel, deleteAdModel, readAdModel, requestAdminListModel, requestListModel, updateAdModel } from '../model/ad_model';


// ad 정렬해서 filtering하는 기능이 필요 할 듯.
//get
function requestList (req: Request, res: Response) {
    const paramNames = ["gender", "country"];
    if (!checkUndefined(req.query, paramNames)) {
        res.json({
            status : "error",
            message : `필수 파라미터(${paramNames}) 없음`
        });
        return;
    }
    requestListModel(req,res);
}

// db및 api 수정필요.
//get
function readAd (req: Request, res: Response) {
    const paramNames = ["adId"];
    if (!checkUndefined(req.query, paramNames)) {
        res.json({
            status : "error",
            message : `필수 파라미터(${paramNames}) 없음`
        });
        return;
    }
    readAdModel(req, res);
}

//delete
function deleteAd (req: Request, res: Response) {
    const paramNames = ["adId"];
    if (!checkUndefined(req.body, paramNames)) {
        res.json({
            status : "error",
            message : `필수 파라미터(${paramNames}) 없음`
        });
        return;
    }
    deleteAdModel(req,res);
}

//post
function createAd(req: Request, res: Response){
    const paramNames: string[] = ["name", "advertizer", "createdAt", "country", "gender", "periodBegin", "periodEnd", "maxViewCount"];
    if (!checkUndefined(req.body, paramNames)) {
        res.json({
            status : "error",
            message : `필수 파라미터(${paramNames}) 없음`
        });
        return;
    }
    
    // Parsing country name to numeric country code
    const countryCode: number = country2Num(req.body.country);
    if (countryCode === -1) {
        res.json({
            "status": "fail",
            "message": "존재하지 않는 국가"
        });
        return;
    }
    createAdModel(req,res,countryCode);
}

//todo deactivate도 필요할듯.
//post
function activeAd (req: Request, res: Response) {
    const paramNames: string[] = ["adId"];
    if (!checkUndefined(req.body, paramNames)) {
        res.json({
            status : "error",
            message : `필수 파라미터(${paramNames}) 없음`
        });
        return;
    }
    activeModel(req,res);
}

//put
//todo
// api문서 및 구조 바꿔야 할 수도. 수정창에서 불러올때는 get 수정할때는 post,put 으로 동작하게 해야할 듯 함.
function updateAd (req: Request, res: Response) {
    // console.log(req.body);
    updateAdModel(req,res);
}

// file을 받는 tool 필요할듯.
//post
//todo
function uploadContents (req: Request, res: Response) {
    res.json({
        status: "success",
        message: "업로드에 성공했습니다."
    });
    return;
}

//todo Error control
async function requestAdminList(req:Request, res:Response){
    const paramNames: string[] = ["offset", "length"];
    if (!checkUndefined(req.body, paramNames)) {
        res.json({
            status : "error",
            message : `필수 파라미터(${paramNames}) 없음`
        });
        return;
    }
    requestAdminListModel(req,res);
}

export { deleteAd, readAd, createAd, activeAd, updateAd, uploadContents, requestList,requestAdminList}