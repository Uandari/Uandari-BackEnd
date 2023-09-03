import express from 'express';
import {
    getAllTypeCategories,
    getTypeCategoryById
} from '../controllers/typeCategoryController';

const router = express.Router();

router.get('/', getAllTypeCategories);
router.get('/:id', getTypeCategoryById);

export default router;