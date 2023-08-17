import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import {
  createUserOracle,
  updateUserOracle,
  getUsersOracle,
  loginUserOracle,
  findByNoControl,
  deleteUserOracle,
  getUserByControlNumberOracle,
} from "../data/user-data";
//Get all users
const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersOracle();
    res.status(users.statusCode).json({
      status: users.statusCode,
      message: users.message,
      payload: users.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
//Register a new user
const registerUser = async (req: Request, res: Response) => {
  try {
    const numeroControl = req.body.numeroControl;
    const isId = await findByNoControl(numeroControl);
    const user = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      numeroControl: req.body.numeroControl,
      correo: req.body.correo,
      contrasenia: req.body.contrasenia,
      idRol: req.body.idRol,
      urlImagen: req.body.urlImagen,
    };
    if (!isId) {
      console.log("User:", user);
      const usercreated = await createUserOracle(user);
      res.status(usercreated.statusCode).json({
        status: usercreated.statusCode,
        message: usercreated.message,
        payload: usercreated.vw,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: "El numero de control ya existe",
        payload: [],
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
//Update a user
const updateUser = async (req: Request, res: Response) => {
  try {
    const user = {
      idUsuario: req.body.idUsuario,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      numeroControl: req.body.numeroControl,
      correo: req.body.correo,
      contrasenia: req.body.contrasenia,
      idRol: req.body.idRol,
      token: req.body.token,
      urlImagen: req.body.urlImagen,
    };
    const resultUpdateUser = await updateUserOracle(user);
    res.status(resultUpdateUser.statusCode).json({
      status: resultUpdateUser.statusCode,
      message: resultUpdateUser.message,
      payload: resultUpdateUser.vw,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
//login user
const loginUser = async (req: any, res: any) => {
  try {
    const LoginUser = {
      numeroControl: req.body.numeroControl,
      contrasenia: req.body.contrasenia,
    };
    const result = await loginUserOracle(LoginUser);

    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      payload: result.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
//Delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.body.idUsuario);

    const userDeleted = await deleteUserOracle(idUsuario);
    console.log(userDeleted);
    res.status(userDeleted.statusCode).json({
      status: userDeleted.statusCode,
      message: userDeleted.message,
      payload: userDeleted.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const idUsuario = parseInt(id);
    const user = await getUserByControlNumberOracle(idUsuario);
    res.status(user.statusCode).json({
      status: user.statusCode,
      message: user.message,
      payload: user.vw,
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
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getUserById,
};
