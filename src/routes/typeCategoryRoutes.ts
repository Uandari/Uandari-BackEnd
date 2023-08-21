import express from "express";
import {
    getAllTypeCategories,
    getTypeCategoryById
} from "../controllers/typeCategoryController";

const router = express.Router();

router.get("/getAllTypeCategories", getAllTypeCategories);
router.get("/getTypeCategoryById/:id", getTypeCategoryById);

export default router;