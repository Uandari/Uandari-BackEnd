import express from "express";
import {
  insertIssue,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController";

const router = express.Router();

//Insert Issue
router.post("/insertIssue", insertIssue);
router.get("/getIssueById/:id", getIssueById);
router.post("/updateIssue", updateIssue);
router.post("/deleteIssue", deleteIssue);

export default router;
