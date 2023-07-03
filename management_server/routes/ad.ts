import { Router,Request,Response } from "express";


const router : Router = Router();

// 이건 user가 list를 달라고 하는건데 더미코드가 필요해 여기 있는것
router.get('/AD/requestList',(req : Request, res : Response)=>{
    res.json({"stauts": "success",
            "data" : [{"content": "pic1.jpeg","width" : "dddddd"}]
    });
});


router.get('/AD/readAd',(req : Request, res : Response)=>{
    res.send({"stauts": "success",
    "data" : [{"content": "pic1.jpeg","width" : "ssssss"}]
})
});

router.delete('/AD/deleteAd',(req : Request, res : Response)=>{
    res.json({"stauts": "success", "message" : ""});
});

router.put('/AD/createAd',(req : Request, res : Response)=>{
    res.json({
        "status": "success",
        "message": "등록에 성공했습니다.",
        "adId": "0000"
    });
});

router.post('/AD/activeAd',(req : Request, res : Response)=>{
    res.json({
        "status": "success",
        "message": "active Success!"
    });
});

router.post('/AD/updateAd',(req : Request, res : Response)=>{
    res.send({
        "status": "success",
        "message": "업데이트에 성공했습니다",
        "adId": "0000"
    });
});

//광고의 contents를 upload
router.post('/AD/uploadContens',(req : Request, res : Response)=>{
    res.send({
        "status": "success",
        "message": "업로드에 성공했습니다."
    });
});


export default router;