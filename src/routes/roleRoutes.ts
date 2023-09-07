import express from 'express';
import {
  getAllRoles,
  createRole,
  getRoleById,
  deleteRole,
  updateRole,
} from '../controllers/roleController';
import checkAuth from 'src/middlewares/checkAuth';

const router = express.Router();

//Get All Roles
router.get('/', checkAuth, getAllRoles);
router.post('/create', checkAuth, createRole);
router.post('/update', checkAuth, updateRole);
router.post('/delete', checkAuth, deleteRole);
router.get('/:id', checkAuth, getRoleById);

export default router;
