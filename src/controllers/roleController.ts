import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import {
  getRolesOracle,
  createRoleOracle,
  getRoleByIdOracle,
  deleteRoleByIdOracle,
  updateRoleOracle,
} from "../data/role-data";

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
const registerRole = async (req: Request, res: Response) => {
  try {
    const role = {
      name: req.body.name,
    };
    const roles = await createRoleOracle(role);

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

const getRoleById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const rol = await getRoleByIdOracle(id);
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

const deleteRole = async (req: Request, res: Response) => {
  try {
    const idRole = parseInt(req.body.idRole);

    const roleDeleted = await deleteRoleByIdOracle(idRole);

    res.status(roleDeleted.statusCode).json({
      status: roleDeleted.statusCode,
      message: roleDeleted.message,
      payload: roleDeleted.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
const updateRole = async (req: Request, res: Response) => {
  try {
    const role = {
      idRole: parseInt(req.body.idRole),
      name: req.body.name,
    };
    const roleUpdated = await updateRoleOracle(role);
    res.status(roleUpdated.statusCode).json({
      status: roleUpdated.statusCode,
      message: roleUpdated.message,
      payload: roleUpdated.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
export { getAllRoles, registerRole, getRoleById, deleteRole,updateRole };
