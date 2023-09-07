import express from 'express';
import {
    createEscalatedIssue,
    getAllEscalatedIssues,
    updateEscalatedIssue,
    getEscalatedIssueById
} from '../controllers/escalatedIssueController';
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();

//Get All Escalated Issues
router.get('/', checkAuth, getAllEscalatedIssues);
router.post('/create', checkAuth, createEscalatedIssue);
router.post('/update', checkAuth, updateEscalatedIssue);
router.get('/:id', checkAuth, getEscalatedIssueById);


export default router;