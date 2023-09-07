import express from 'express';
import {
    getAllTypeCategories,
    getTypeCategoryById
} from '../controllers/typeCategoryController';
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();

router.get('/', checkAuth, getAllTypeCategories);
router.get('/:id', checkAuth, getTypeCategoryById);

export default router;