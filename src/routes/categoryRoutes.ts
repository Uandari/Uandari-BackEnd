import express from "express";
import {
  getAllCategories,
  getCategoryById,
  getStatusIssues,
  getIssuesXAvailability,
  getIssuesXQuality,
  getIssuesXPerformance,
  getRecentIssues,
} from "../controllers/categoryController";

const router = express.Router();

//Get all categories
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryById/:id", getCategoryById);
//Tablero hrxhr lado derecho
router.get("/getStatusIssues", getStatusIssues);
router.get("/getIssuesXAvailability", getIssuesXAvailability);
router.get("/getIssuesXQuality", getIssuesXQuality);
router.get("/getIssuesXPerformance", getIssuesXPerformance);
router.get("/getRecentIssues", getRecentIssues);

export default router;
