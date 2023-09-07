import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import { getAllCells, createCell } from '../controllers/cellController';

const router = express.Router();

//Get all cells
router.get('/', checkAuth, getAllCells);
//Insert cell
router.post('/create', checkAuth, createCell);

export default router;