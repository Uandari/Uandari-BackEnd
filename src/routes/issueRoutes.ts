import express from 'express';
import {
  insertIssue,
  getIssueById,
  updateIssue,
  deleteIssue,
  listOfIssues,
  issuesXHour
} from '../controllers/issueController';

const router = express.Router();

//Insert Issue
router.post('/insert', insertIssue);
router.get('/:id', getIssueById);
router.post('/update', updateIssue);
router.post('/delete', deleteIssue);
//TABLERO
router.get('/', listOfIssues);
router.post('/issuexhour', issuesXHour)

export default router;
