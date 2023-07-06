import { Request, Response } from 'express';
import iso from 'iso-3166-1';
import { activeModel, createAdModel, deleteAdModel, readAdModel, requestAdminListModel, requestListModel } from '../model/ad_model';


// ad 정렬해서 filtering하는 기능이 필요 할 듯.
//get
function requestList (req: Request, res: Response) {
    requestListModel(req,res);
}

// db및 api 수정필요.
//get
function readAd (req: Request, res: Response) {
    if (req.query.adId === undefined) {
        res.json({
            status : "fail",
            message : "조회에 실패했습니다."
        });
        return;
    }
    readAdModel(req, res);
}

//delete
function deleteAd (req: Request, res: Response) {
    console.log(req.body);
    console.log(req);
    deleteAdModel(req,res);
}

//post
function createAd(req: Request, res: Response){
    const params = req.body;
    // Validation
    if (params.name === undefined || params.advertizer === undefined || params.createdAt === undefined || params.country === undefined || params.gender === undefined || params.periodBegin === undefined || params.periodEnd === undefined || params.maxViewCount === undefined) {
        res.json({
            "status": "fail",
            "message": "잘못된 데이터가 입력되었습니다."
        })
        return;
    }
    
    // Parsing country name to numeric country code
    const countryName : string = params.country;
    const isoAllData = iso.all();
    let countryCode : Number = -1;
    for (let i : number = 0; i < isoAllData.length; i++) {
        if (countryName === isoAllData[i].country) {
            countryCode = Number(isoAllData[i].numeric);
            break;
        }
    }
    createAdModel(req,res,countryCode);
}

//todo deactivate도 필요할듯.
//post
function activeAd (req: Request, res: Response) {
    activeModel(req,res);
}

//put
//todo
// api문서 및 구조 바꿔야 할 수도. 수정창에서 불러올때는 get 수정할때는 post,put 으로 동작하게 해야할 듯 함.
function updateAd (req: Request, res: Response) {
    updateAd(req,res);
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
    if(req.query.offset == undefined && req.query.length == undefined){
        res.json({status : "error", message : "필수 파라미터 (offset,length) Error"})
        return;
    }
    requestAdminListModel(req,res);
}

export { deleteAd, readAd, createAd, activeAd, updateAd, uploadContents, requestList,requestAdminList}