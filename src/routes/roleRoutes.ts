import express from "express";
import {
  getAllRoles,
  registerRole,
  getRoleById,
  deleteRole,
  updateRole,
} from "../controllers/roleController";

const router = express.Router();

//Get All Roles
router.get("/getAllRoles", getAllRoles);
router.post("/registerRole", registerRole);
router.get("/getRoleById/:id", getRoleById);
router.post("/deleteRole", deleteRole);
router.post("/updateRole", updateRole);

export default router;
