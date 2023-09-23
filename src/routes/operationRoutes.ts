import express from 'express';
import { getAllOperations } from '../controllers/operationController';
const router = express.Router();
import checkAuth from '../middlewares/checkAuth';

//Get All Operations from Oracle
router.get('/', checkAuth, getAllOperations);

export default router;