import express from 'express';
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/userController';
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();


router.get('/', checkAuth, getAllUsers);
router.post('/create', checkAuth, createUser);
router.post('/update', checkAuth, updateUser);
router.post('/login', loginUser);
router.post('/delete', checkAuth, deleteUser);
router.get('/:id', checkAuth, getUserById);

export default router;
