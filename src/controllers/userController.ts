import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import {
  createUserOracle,
  updateUserOracle,
  getUsersOracle,
  loginUserOracle,
  findByNoControl,
  deleteUserOracle,
  getUserByControlNumberOracle,
} from '../data/user-data';
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
const createUser = async (req: Request, res: Response) => {
  try {
    const controlNumber = req.body.controlNumber;
    const isId = await findByNoControl(controlNumber);
    console.log(isId);
    const user = {
      name: req.body.name,
      lastNames: req.body.lastNames,
      controlNumber: req.body.controlNumber,
      mail: req.body.mail,
      password: req.body.password,
      idRole: req.body.idRole,
      imageUrl: req.body.imageUrl,
    };
    if (!isId) {
      console.log('User:', user);
      const usercreated = await createUserOracle(user);
      res.status(usercreated.statusCode).json({
        status: usercreated.statusCode,
        message: usercreated.message,
        payload: usercreated.vw,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: 'El numero de control ya existe',
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
      idUser: req.body.idUser,
      name: req.body.name,
      lastNames: req.body.lastNames,
      controlNumber: req.body.controlNumber,
      mail: req.body.mail,
      password: req.body.password,
      idRole: req.body.idRole,
      token: req.body.token,
      imageUrl: req.body.imageUrl,
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
const loginUser = async (req: Request, res: Response) => {
  try {
    const LoginUser = {
      controlNumber: req.body.controlNumber,
      password: req.body.password,
    };
    const result = await loginUserOracle(LoginUser);
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      payload: result.vw,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

//Delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const idUser = parseInt(req.body.idUser);

    const userDeleted = await deleteUserOracle(idUser);
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
    const idUser = parseInt(id);
    const user = await getUserByControlNumberOracle(idUser);
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
  createUser,
  loginUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getUserById,
};
