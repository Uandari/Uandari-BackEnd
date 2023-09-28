import express from 'express';
import { 
    getAllObjectivesIndicators,
    getObjectivesIndicatorsById 
} from '../controllers/objectivesIndicatorsController';

import checkAuth from '../middlewares/checkAuth';
const router = express.Router();

router.get('/', checkAuth, getAllObjectivesIndicators);
router.get('/:id', checkAuth, getObjectivesIndicatorsById);

export default router;