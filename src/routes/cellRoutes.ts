import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import { getAllCells, createCell, updateCell, getCellById, deleteCell } from '../controllers/cellController';

const router = express.Router();

router.get('/', checkAuth, getAllCells);
router.post('/create', checkAuth, createCell);
router.post('/update', checkAuth, updateCell);
router.get('/:idCell', checkAuth, getCellById);
router.post('/delete', checkAuth, deleteCell);

export default router;