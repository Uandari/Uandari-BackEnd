import express from "express";
import {
  getAllCategories,
  getCategoryById,
} from "../controllers/categoryController";

const router = express.Router();

//Get all categories
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryById/:id", getCategoryById);

export default router;
