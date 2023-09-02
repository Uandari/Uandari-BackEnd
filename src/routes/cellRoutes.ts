import express  from "express";
import { getAllCells, registerCell } from "../controllers/cellController";

const router = express.Router();

//Get all cells
router.get("/getAllCells", getAllCells);
//Insert cell
router.post("/registerCell", registerCell);

export default router;