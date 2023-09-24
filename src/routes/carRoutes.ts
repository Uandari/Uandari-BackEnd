import express from 'express';
import { getAllCars } from '../controllers/carController';
import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

//Get All Cars
router.get('/', checkAuth, getAllCars);

export default router;