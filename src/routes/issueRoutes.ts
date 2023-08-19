import express from "express";
import { insertIssue } from "../controllers/issueController";

const router = express.Router();

//Insert Issue
router.post("/insertIssue", insertIssue);

export default router;
