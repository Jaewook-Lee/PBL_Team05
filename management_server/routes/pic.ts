import express,{ Router } from "express";
import { Request, Response } from 'express';
import cors from "cors"

const router : Router = Router();
router.use(cors());
router.use(express.static('../../'))
router.get('/',(req : Request, res : Response)=>{
    const photoPath : string = 'pic1.jpeg';
    res.sendFile(photoPath, {root : './'}); // root 잘 확인해야될듯
});


export default router;