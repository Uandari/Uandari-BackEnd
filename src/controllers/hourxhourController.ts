import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import {
  insertMustAndGetIDOracle,
  updateHourXHourOracle,
  getHourXHourByIdOracle,
  getHourXHour
} from '../data/hourxhour-data';
import { HourXHourModel } from '../common/entities/HourxHourModel';

//getAllHourXHourOracle

const createHour = async (req: Request, res: Response) => {
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
    const hourXhour: HourXHourModel = {
      idHourxHour: parseInt(req.body.idHourxHour),
      hour: req.body.hour,
      date: req.body.date,
      must: req.body.must,
      mustAccumulative: req.body.mustAccumulative, // Corrected property name
      is: req.body.is,
      isAccumulative: req.body.isAccumulative, // Corrected property name
      difference: req.body.difference,
      accumulativeDifference: req.body.accumulativeDifference, // Corrected property name
      idCell: req.body.idCell,
      idUser: req.body.idUser,
      idAreas: req.body.idAreas,
      idOperation: req.body.idOperation,
      downtime: req.body.downtime,
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
/*
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
*/
const getHourXHourComplete = async (_req: Request, res: Response) => {
  try {
    const hourXhour = await getHourXHour();
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

}

export {
  createHour,
  updateHourxHour,
  getHourxHourById,
  getHourXHourComplete
};
