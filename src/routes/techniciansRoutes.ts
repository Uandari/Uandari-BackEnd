import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import { getAllTechnicians } from '../controllers/techniciansController';

const router = express.Router();

router.get('/', checkAuth, getAllTechnicians);

export default router;
