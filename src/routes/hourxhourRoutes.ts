import express from 'express';
import {
  registerHour,
  updateHourxHour,
  getHourxHourById,
  getHourXHourComplete
} from '../controllers/hourxhourController';
const router = express.Router();

//getHourXHourComplete --> this have the issues

//Create a new HourXHour only returns ID
router.post('/register', registerHour);
router.get('/', getHourXHourComplete)
router.post('/update', updateHourxHour);
router.get('/:id', getHourxHourById);
//Get All Hours with issues
//router.get('/getAllHours', getAllHourxHour);
//Get all hours without issues

export default router;
