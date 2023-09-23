import express from 'express';
import { getAllAreas } from '../controllers/areasController';
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();

router.get('/', checkAuth, getAllAreas);
export default router;