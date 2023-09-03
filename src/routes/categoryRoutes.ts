import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  getStatusIssues,
  getIssuesXAvailability,
  getIssuesXQuality,
  getIssuesXPerformance,
  getRecentIssues,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/issues', getStatusIssues);
router.get('/availability', getIssuesXAvailability);
router.get('/quality', getIssuesXQuality);
router.get('/performance', getIssuesXPerformance);
router.get('/recentIssues', getRecentIssues);
//Get all categories
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);



export default router;
