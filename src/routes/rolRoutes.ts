import express from "express";
import {
  getAllRoles,
  registerRol,
  getRolById,
  deleteRol,
  updateRol,
} from "../controllers/rolController";

const router = express.Router();

//Get All Roles
router.get("/getAllRoles", getAllRoles);
router.post("/registerRol", registerRol);
router.get("/getRolById/:id", getRolById);
router.post("/deleteRol", deleteRol);
router.post("/updateRol", updateRol);

export default router;
