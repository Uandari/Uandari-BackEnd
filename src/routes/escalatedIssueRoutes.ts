import express from 'express';
import {
    insertEscalatedIssue,
    getAllEscalatedIssues,
    updateEscalatedIssue,
    getEscalatedIssueById
} from '../controllers/escalatedIssueController';

const router = express.Router();

//Get All Escalated Issues
router.get('/', getAllEscalatedIssues);
router.post('/insert', insertEscalatedIssue);
router.post('/update', updateEscalatedIssue);
router.get('/:id', getEscalatedIssueById);
//Insert Escalated Issue


export default router;