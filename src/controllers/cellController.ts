import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import {
  getCellsOracle,
  insertCellOracle,
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

export { getAllCells, createCell };