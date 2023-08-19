import express from "express";
import { insertIssue, getIssueById } from "../controllers/issueController";

const router = express.Router();

//Insert Issue
router.post("/insertIssue", insertIssue);
router.get("/getIssueById/:id", getIssueById);

export default router;
