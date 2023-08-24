import express from "express";
import { 
    insertEscalatedIssue,
    getAllEscalatedIssues
} from "../controllers/escalatedIssueController";

const router = express.Router();

//Insert Escalated Issue
router.post("/insertEscalatedIssue", insertEscalatedIssue);
router.get("/getAllEscalatedIssues", getAllEscalatedIssues);

export default router;