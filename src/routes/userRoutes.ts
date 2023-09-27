import express from 'express';
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByControlNumber,
  getUsersSystem
} from '../controllers/userController';
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();


router.get('/', checkAuth, getAllUsers);
router.post('/create', checkAuth, createUser);
router.post('/update', checkAuth, updateUser);
router.post('/login', loginUser);
router.post('/delete', checkAuth, deleteUser);
router.get('/usersSystem', checkAuth, getUsersSystem);
router.get('/:controlNumber', checkAuth, getUserByControlNumber);

export default router;
