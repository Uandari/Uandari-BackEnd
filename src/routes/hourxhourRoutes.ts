import express from "express";
import { insertMustAndGetID } from "../controllers/hourxhourController";
const router = express.Router();

//Insert Must and Get ID
router.post("/mustAndGetID", insertMustAndGetID);

export default router;
