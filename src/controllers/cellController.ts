import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import {
  getCellsOracle,
  insertCellOracle,
  updateCellOracle,
  getCellByIdOracle,
  deleteCellByIdOracle
} from '../data/cell-data';

//Get All Cells 
const getAllCells = async (_req: Request, res: Response) => {
  try {
    const cells = await getCellsOracle();
    res.status(cells.statusCode).json({
      status: cells.statusCode,
      message: cells.message,
      payload: cells.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
//Register Cell
const createCell = async (req: Request, res: Response) => {
  try {
    const cell = {
      cellName: req.body.cellName,
      idUser: req.body.idUser,
      idLine: req.body.idLine,
    };
    const cells = await insertCellOracle(cell);

    res.status(cells.statusCode).json({
      status: cells.statusCode,
      message: cells.message,
      payload: cells.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
// Update Cell
const updateCell = async (req: Request, res: Response) => {
  try {
    console.log("entre aqui")
    const cell = {
      idCell: req.body.idCell,
      cellName: req.body.cellName,
      idUser: req.body.idUser,
      idLine: req.body.idLine,
    };
    console.log(cell)
    const cells = await updateCellOracle(cell);

    res.status(cells.statusCode).json({
      status: cells.statusCode,
      message: cells.message,
      payload: cells.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
}
// get Cell by Id
const getCellById = async (req: Request, res: Response) => {
  try {
    const idCell = parseInt(req.params.idCell);
    const cell = await getCellByIdOracle(idCell);
    res.status(cell.statusCode).json({
      status: cell.statusCode,
      message: cell.message,
      payload: cell.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
}
const deleteCell = async (req: Request, res: Response) => {
  try {
    const idCell = parseInt(req.body.idCell);
    const cellDeleted = await deleteCellByIdOracle(idCell);
    res.status(cellDeleted.statusCode).json({
      status: cellDeleted.statusCode,
      message: cellDeleted.message,
      payload: cellDeleted.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
}

export { getAllCells, createCell, updateCell,getCellById,deleteCell };