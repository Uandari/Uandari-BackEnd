import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import { insertMustAndGetIDOracle } from "../data/hourxhour-data";

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
export { insertMustAndGetID };
