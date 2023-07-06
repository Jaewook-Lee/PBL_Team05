import { Router } from "express";
import { requestList, deleteAd, readAd, createAd, activeAd, updateAd, uploadContents, requestAdminList } from "../controller/ad_controller";
import cors from "cors"

const router : Router = Router();
router.use(cors());
// router.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
//   });


router.get('/requestList', requestList);    // 이건 user가 list를 달라고 하는건데 더미코드가 필요해 여기 있는것

router.get('/readAd', readAd);

router.delete('/deleteAd', deleteAd);

router.post('/createAd', createAd);

router.post('/activeAd', activeAd);

router.put('/updateAd', updateAd);

router.post('/uploadContents', uploadContents);    //광고의 contents를 upload

router.get("/requestAdminList", requestAdminList);

export default router;