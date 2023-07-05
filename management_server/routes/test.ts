import { Router } from "express";
import {requestList} from "../controller/test_controller";
const router : Router = Router();

router.get('/requestList', requestList);  

export default router;