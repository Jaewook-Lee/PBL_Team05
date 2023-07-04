import { Router } from "express";
import { requestList, deleteAd, readAd, createAd, activeAd, updateAd, uploadContents } from "../controller/ad_controller";


const router : Router = Router();

router.get('/requestList', requestList);    // 이건 user가 list를 달라고 하는건데 더미코드가 필요해 여기 있는것

router.get('/readAd', readAd);

router.delete('/deleteAd', deleteAd);

router.put('/createAd', createAd);

router.post('/activeAd', activeAd);

router.post('/updateAd', updateAd);

router.post('/uploadContents', uploadContents);    //광고의 contents를 upload


export default router;