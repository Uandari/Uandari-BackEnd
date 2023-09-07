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
import checkAuth from 'src/middlewares/checkAuth';
const router = express.Router();

router.get('/issues', checkAuth, getStatusIssues);
router.get('/availability', checkAuth, getIssuesXAvailability);
router.get('/quality', checkAuth, getIssuesXQuality);
router.get('/performance', checkAuth, getIssuesXPerformance);
router.get('/recentIssues', checkAuth, getRecentIssues);
//Get all categories
router.get('/', checkAuth, getAllCategories);
router.get('/:id', checkAuth, getCategoryById);

export default router;
