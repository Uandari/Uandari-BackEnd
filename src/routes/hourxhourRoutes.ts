import express from "express";
import {
  insertMustAndGetID,
  updateHourxHour,
} from "../controllers/hourxhourController";
const router = express.Router();

//Insert Must and Get ID
router.post("/mustAndGetID", insertMustAndGetID);
//Update HourXHour
router.post("/updateHour", updateHourxHour);

export default router;
