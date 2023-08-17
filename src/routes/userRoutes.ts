import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController";

const router = express.Router();

//Get All Users 
router.get("/getAllUsers", getAllUsers);
//Register a new user
router.post("/registerUser", registerUser);
//Update a user
router.post("/updateUser", updateUser);
//Login a user
router.post("/loginUser", loginUser);
//Logig delete a user
router.post("/deleteUser", deleteUser);
//Get user by id
router.get("/getUserById/:id", getUserById);

export default router;
