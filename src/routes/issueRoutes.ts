import express from 'express';
import {
  createIssue,
  getIssueById,
  updateIssue,
  deleteIssue,
  listOfIssues,
  issuesXHour
} from '../controllers/issueController';
import checkAuth from 'src/middlewares/checkAuth';
const router = express.Router();

//Insert Issue
router.post('/create', checkAuth, createIssue);
router.get('/:id', checkAuth, getIssueById);
router.post('/update', checkAuth, updateIssue);
router.post('/delete', checkAuth, deleteIssue);
//TABLERO
router.get('/', checkAuth, listOfIssues);
router.post('/issuexhour', checkAuth, issuesXHour)

export default router;
