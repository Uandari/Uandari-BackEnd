import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/userController';

const router = express.Router();


router.get('/', getAllUsers);
router.post('/register', registerUser);
router.post('/update', updateUser);
router.post('/login', loginUser);
router.post('/delete', deleteUser);
router.get('/:id', getUserById);

export default router;
