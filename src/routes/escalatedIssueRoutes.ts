import express from "express";
import { 
    insertEscalatedIssue,
    getAllEscalatedIssues,
    updateEscalatedIssue,
    getEscalatedIssueById
} from "../controllers/escalatedIssueController";

const router = express.Router();

//Get All Escalated Issues
router.get("/getAllEscalatedIssues", getAllEscalatedIssues);
//Get Escalated Issue by ID
router.get("/getEscalatedIssue/:id", getEscalatedIssueById);
//Insert Escalated Issue
router.post("/insertEscalatedIssue", insertEscalatedIssue);
//Update Escalated Issue
router.post("/updateEscalatedIssue", updateEscalatedIssue);

export default router;