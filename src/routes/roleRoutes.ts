import express from 'express';
import {
  getAllRoles,
  registerRole,
  getRoleById,
  deleteRole,
  updateRole,
} from '../controllers/roleController';

const router = express.Router();

//Get All Roles
router.get('/', getAllRoles);
router.post('/register',registerRole);
router.post('/update', updateRole);
router.post('/delete', deleteRole);
router.get('/:id', getRoleById);

export default router;
