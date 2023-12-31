import express from 'express';
import {
  createHour,
  updateHourxHour,
  getHourxHourById,
  getHourXHourComplete
} from '../controllers/hourxhourController';
const router = express.Router();
import checkAuth from '../middlewares/checkAuth';
//getHourXHourComplete --> this have the issues

//Create a new HourXHour only returns ID
router.post('/create', checkAuth, createHour);
router.get('/', checkAuth, getHourXHourComplete)
router.post('/update', checkAuth, updateHourxHour);
router.get('/:id', checkAuth, getHourxHourById);

export default router;
