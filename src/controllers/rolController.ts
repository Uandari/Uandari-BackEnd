import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import {
  getRolesOracle,
  createRolOracle,
  getRolByIdOracle,
  deleteRolByIdOracle,
  updateRolOracle,
} from "../data/rol-data";

//Get All Roles from Oracle
const getAllRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await getRolesOracle();
    res.status(roles.statusCode).json({
      status: roles.statusCode,
      message: roles.message,
      payload: roles.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
const registerRol = async (req: Request, res: Response) => {
  try {
    const rol = {
      nombre: req.body.nombre,
    };
    const roles = await createRolOracle(rol);

    res.status(roles.statusCode).json({
      status: roles.statusCode,
      message: roles.message,
      payload: roles.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const getRolById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const rol = await getRolByIdOracle(id);
    res.status(rol.statusCode).json({
      status: rol.statusCode,
      message: rol.message,
      payload: rol.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const deleteRol = async (req: Request, res: Response) => {
  try {
    const idRol = parseInt(req.body.idRol);

    const rolDeleted = await deleteRolByIdOracle(idRol);

    res.status(rolDeleted.statusCode).json({
      status: rolDeleted.statusCode,
      message: rolDeleted.message,
      payload: rolDeleted.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
const updateRol = async (req: Request, res: Response) => {
  try {
    const rol = {
      idRol: parseInt(req.body.idRol),
      nombre: req.body.nombre,
    };
    const rolUpdated = await updateRolOracle(rol);
    res.status(rolUpdated.statusCode).json({
      status: rolUpdated.statusCode,
      message: rolUpdated.message,
      payload: rolUpdated.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
export { getAllRoles, registerRol, getRolById, deleteRol,updateRol };
