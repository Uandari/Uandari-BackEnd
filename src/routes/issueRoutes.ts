import express from "express";
import {
  insertIssue,
  getIssueById,
  updateIssue,
  deleteIssue,
  listOfIssues
} from "../controllers/issueController";

const router = express.Router();

//Insert Issue
router.post("/insertIssue", insertIssue);
router.get("/getIssueById/:id", getIssueById);
router.post("/updateIssue", updateIssue);
router.post("/deleteIssue", deleteIssue);
router.get("/listIssues", listOfIssues);

export default router;
