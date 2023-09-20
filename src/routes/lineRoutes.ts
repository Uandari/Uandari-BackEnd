import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import { getAllLines, createLine, updateLine, getLineById, deleteLine } from '../controllers/lineController';

const router = express.Router();

router.get('/', checkAuth, getAllLines);
router.post('/create', checkAuth, createLine);
router.post('/update', checkAuth, updateLine);
router.get('/:idLine', checkAuth, getLineById);
router.post('/delete', checkAuth, deleteLine);

export default router;