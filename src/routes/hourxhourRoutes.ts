import express from "express";
import {
  insertMustAndGetID,
  updateHourxHour,
  getHourxHourById,
  getHourXHourComplete
} from "../controllers/hourxhourController";
const router = express.Router();

//getHourXHourComplete --> this have the issues

//Insert Must and Get ID
router.post("/mustAndGetID", insertMustAndGetID);
//Update Hour
router.post("/updateHour", updateHourxHour);
//Get Hour by ID
router.get("/getHour/:id", getHourxHourById);
//Get All Hours
//router.get("/getAllHours", getAllHourxHour);
//Get all hours without issues
router.get("/getAllHours",getHourXHourComplete)

export default router;
