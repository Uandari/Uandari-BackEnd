import express from "express";
import {
  insertMustAndGetID,
  updateHourxHour,
  getHourxHourById,
} from "../controllers/hourxhourController";
const router = express.Router();

//Insert Must and Get ID
router.post("/mustAndGetID", insertMustAndGetID);
//Update Hour
router.post("/updateHour", updateHourxHour);
//Get Hour by ID
router.get("/getHour/:id", getHourxHourById);

export default router;
