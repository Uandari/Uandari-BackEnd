import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import {
  insertMustAndGetIDOracle,
  updateHourXHourOracle,
  getHourXHourByIdOracle,
  getAllHourXHourOracle,
} from "../data/hourxhour-data";

const insertMustAndGetID = async (req: Request, res: Response) => {
  try {
    const hourXhour = {
      must: req.body.must,
    };
    const hourXhourCreated = await insertMustAndGetIDOracle(hourXhour);
    res.status(hourXhourCreated.statusCode).json({
      status: hourXhourCreated.statusCode,
      message: hourXhourCreated.message,
      payload: hourXhourCreated.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const updateHourxHour = async (req: Request, res: Response) => {
  try {
    const hourXhour = {
      idHourxHour: parseInt(req.body.idHourxHour),
      hour: req.body.hour,
      date: req.body.date,
      must: req.body.must,
      mustAcomulative: req.body.mustAcomulative,
      is: req.body.is,
      isAcomulative: req.body.isAcomulative,
      diference: req.body.diference,
      diferenceAcomulative: req.body.diferenceAcomulative,
      idCell: req.body.idCell,
      idUser: req.body.idUser,
    };
    console.log(hourXhour.idHourxHour);
    const hourXhourUpdated = await updateHourXHourOracle(hourXhour);
    res.status(hourXhourUpdated.statusCode).json({
      status: hourXhourUpdated.statusCode,
      message: hourXhourUpdated.message,
      payload: hourXhourUpdated.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const getHourxHourById = async (req: Request, res: Response) => {
  try {
    const idHourxHour = parseInt(req.params.id);
    console.log(idHourxHour);
    const hourXhour = await getHourXHourByIdOracle(idHourxHour);
    res.status(hourXhour.statusCode).json({
      status: hourXhour.statusCode,
      message: hourXhour.message,
      payload: hourXhour.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const getAllHourxHour = async (_req: Request, res: Response) => {
  try {
    const hourXhour = await getAllHourXHourOracle();
    res.status(hourXhour.statusCode).json({
      status: hourXhour.statusCode,
      message: hourXhour.message,
      payload: hourXhour.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

export {
  insertMustAndGetID,
  updateHourxHour,
  getHourxHourById,
  getAllHourxHour,
};
