import { LoginUser } from "../common/api-interfaces/loginUser";
import { ResultVW } from "../common/api-interfaces/result";
import { UserModel } from "../common/entities/UserModel";
import { USER_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";
import { OracleHelper } from "../handlers/OracleHelper";
import { generarToken } from "../helpers/TokenHelpers";

//Get all users using Oracle procedure
export async function getUsersOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${USER_PROCEDURES.GET_USERS}`;
    const result = await db.execute(query);

    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const users: UserModel[] = result.rows.map((row: any) => ({
      idUsuario: row[0],
      nombre: row[1],
      apellidos: row[2],
      numeroControl: row[3],
      correo: row[4],
      contrasenia: row[5],
      idRol: row[6],
      token: row[7],
      cuentaVerificada: row[8],
      urlImagen: row[9],
      isDelete: row[10],
    }));

    if (users.length === 0) {
      return new ResultVW(
        "There are no users to show",
        StatusCodes.NO_CONTENT,
        users
      );
    }
    return new ResultVW("successfully extracted users", StatusCodes.OK, users);
  } catch (error) {
    throw error;
  } finally {
    db.release();
  }
}
//Get a user by Numero Control
export async function findByNoControl(numeroControl: number): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${USER_PROCEDURES.GETBYCONTROLNUMBER} '${numeroControl}'`;
    const resultNoControl: any = await db.execute(query);
    return resultNoControl.rows.length > 0; //true or false
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Create a new user using Oracle procedure
export async function createUserOracle(user: UserModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const {
      nombre,
      apellidos,
      numeroControl,
      correo,
      contrasenia,
      idRol,
      urlImagen,
    } = user;

    const plsqlBlock = `
      BEGIN
        ADDUSER(
          '${nombre}',
          '${apellidos}',
          '${numeroControl}',
          '${correo}',
          '${contrasenia}',
           ${idRol},
          '${generarToken()}',
          '${urlImagen}'
        );
      END;
    `;

    const result = await db.execute(plsqlBlock);
    const userResult: ResultVW = new ResultVW(
      "User created",
      StatusCodes.OK,
      user
    );

    if (result.rows && result.rows.length === 0) {
      return new ResultVW("User Problem", StatusCodes.BAD_REQUEST, user);
    }
    return userResult;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Get a user by id using Oracle sentence
export async function getUserByControlNumberOracle(
  idUsuario: number
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await findByNoControl(idUsuario))) {
      return new ResultVW("User not found", StatusCodes.NOT_FOUND, []);
    }
    const query = `${USER_PROCEDURES.GETBYCONTROLNUMBER}'${idUsuario}'`;
    const result: any = await db.execute(query);
    const user: UserModel = result.rows.map((row: any) => ({
      idUsuario: row[0],
      nombre: row[1],
      apellidos: row[2],
      numeroControl: row[3],
      correo: row[4],
      contrasenia: row[5],
      idRol: row[6],
      token: row[7],
      cuentaVerificada: row[8],
      urlImagen: row[9],
      isDelete: row[10],
    }));

    const userResult: ResultVW = new ResultVW(
      "User found",
      StatusCodes.OK,
      user
    );
    if (result.rows && result.rows.length === 0) {
      return new ResultVW("User not found", StatusCodes.NOT_FOUND, user);
    }
    return userResult;
  } catch (error) {
    throw error;
  } finally {
    // Close the database connection in the finally block
    if (db) {
      await db.close();
    }
  }
}
//Update a user using Oracle procedure
export async function updateUserOracle(user: UserModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await findByNoControl(parseInt(user.numeroControl)))) {
      return new ResultVW("User not found", StatusCodes.NOT_FOUND, []);
    }
    const {
      idUsuario,
      nombre,
      apellidos,
      numeroControl,
      correo,
      contrasenia,
      idRol,
      token,
      urlImagen,
    } = user;
    const query = `
      BEGIN 
         ${USER_PROCEDURES.UPDATE_USER}(
          '${idUsuario}',
          '${nombre}',
          '${apellidos}',
          '${numeroControl}',
          '${correo}',
          '${contrasenia}',
           ${idRol},
          '${token}',
          '${urlImagen}'
        );
      END;
    `;
    await db.execute(query);

    return new ResultVW("User updated", StatusCodes.OK, user);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Logig delete a user using Oracle procedure
export async function deleteUserOracle(idUsuario: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await findByNoControl(idUsuario))) {
      return new ResultVW("User not found", StatusCodes.BAD_REQUEST, []);
    }
    const query = `
      BEGIN 
         ${USER_PROCEDURES.DELETE_USER}(
          '${idUsuario}'
        );
      END;
    `;
    await db.execute(query);
    const user = await getUserByControlNumberOracle(idUsuario);
    console.log(user);
    return new ResultVW("User deleted", StatusCodes.OK, user.vw);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Working there
export async function loginUserOracle(user: LoginUser): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();

  try {
    const { numeroControl, contrasenia } = user;
    const query = `
      SELECT *
      FROM userVW
      WHERE numeroControl = '${numeroControl}' AND contrasenia = '${contrasenia}'
    `;
    console.log(query);
    const result: any = await db.execute(query);

    if (result.rows && result.rows.length > 0) {
      const userRow = result.rows[0];
      const user: UserModel = {
        idUsuario: userRow[0],
        nombre: userRow[1],
        apellidos: userRow[2],
        numeroControl: userRow[3],
        correo: userRow[4],
        contrasenia: userRow[5],
        idRol: userRow[6],
        token: userRow[7],
        cuentaVerificada: userRow[8],
        urlImagen: userRow[9],
        isDeleted: userRow[10],
      };
      console.log(user);
      return new ResultVW("User found", StatusCodes.OK, user);
    } else {
      console.log("User not found");
      return new ResultVW("User not found", StatusCodes.BAD_REQUEST, user);
    }
  } catch (error) {
    throw error;
  } finally {
    db.release();
  }
}
