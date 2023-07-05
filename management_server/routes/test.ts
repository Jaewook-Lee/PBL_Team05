import { Router } from "express";
import {requestList,readAd,deleteAd,createAd,activeAd,requestAdminList} from "../controller/test_controller";
const router : Router = Router();

router.get('/requestList', requestList);  

router.get('/readAd', readAd);

router.delete('/deleteAd', deleteAd);

router.post('/createAd', createAd);

router.post('/activeAd', activeAd);

// router.put('/updateAd', updateAd);

// router.post('/uploadContents', uploadContents);    //광고의 contents를 upload

router.get("/requestAdminList", requestAdminList);


export default router;