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
      idUser: row[0],
      name: row[1],
      lastNames: row[2],
      controlNumber: row[3],
      mail: row[4],
      password: row[5],
      idRole: row[6],
      token: row[7],
      verifiedAccount: row[8],
      imageUrl: row[9],
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
export async function findByNoControl(controlNumber: number): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${USER_PROCEDURES.GETBYCONTROLNUMBER} '${controlNumber}'`;
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
    const { name, lastNames, controlNumber, mail, password, idRole, imageUrl } =
      user;
    await findByNoControl(parseInt(controlNumber));
    const plsqlBlock = `
      BEGIN
        ADDUSER(
          '${name}',
          '${lastNames}',
          '${controlNumber}',
          '${mail}',
          '${password}',
           ${idRole},
          '${generarToken()}',
          '${imageUrl}'
        );
      END;
    `;
    //console.log(plsqlBlock);
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
  idUser: number
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await findByNoControl(idUser))) {
      return new ResultVW("User not found", StatusCodes.NOT_FOUND, []);
    }
    const query = `${USER_PROCEDURES.GETBYCONTROLNUMBER}'${idUser}'`;
    const result: any = await db.execute(query);
    const user: UserModel = result.rows.map((row: any) => ({
      idUser: row[0],
      name: row[1],
      lastNames: row[2],
      controlNumber: row[3],
      mail: row[4],
      password: row[5],
      idRole: row[6],
      token: row[7],
      verifiedAccount: row[8],
      imageUrl: row[9],
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
    console.log(user.controlNumber);
    if (!(await findByNoControl(parseInt(user.controlNumber)))) {
      return new ResultVW("User not found", StatusCodes.NOT_FOUND, []);
    }
    const {
      idUser,
      name,
      lastNames,
      controlNumber,
      mail,
      password,
      idRole,
      token,
      imageUrl,
    } = user;
    const query = `
      BEGIN 
         ${USER_PROCEDURES.UPDATE_USER}(
          ${idUser},
          '${name}',
          '${lastNames}',
          '${controlNumber}',
          '${mail}',
          '${password}',
           ${idRole},
          '${token}',
          '${imageUrl}'
        );
      END;
    `;
    console.log(query);
    await db.execute(query);

    return new ResultVW("User updated", StatusCodes.OK, user);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Logig delete a user using Oracle procedure
export async function deleteUserOracle(idUser: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await findByNoControl(idUser))) {
      return new ResultVW("User not found", StatusCodes.BAD_REQUEST, []);
    }
    const query = `
      BEGIN 
         ${USER_PROCEDURES.DELETE_USER}(
          '${idUser}'
        );
      END;
    `;
    await db.execute(query);
    const user = await getUserByControlNumberOracle(idUser);
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
    const { controlNumber, password } = user;
    const query = `
      SELECT *
      FROM userVW
      WHERE controlNumber = '${controlNumber}' AND password_ = '${password}'
    `;
    console.log(query);
    const result: any = await db.execute(query);

    if (result.rows && result.rows.length > 0) {
      const userRow = result.rows[0];
      const user: UserModel = {
        idUser: userRow[0],
        name: userRow[1],
        lastNames: userRow[2],
        controlNumber: userRow[3],
        mail: userRow[4],
        password: userRow[5],
        idRole: userRow[6],
        token: userRow[7],
        verifiedAccount: userRow[8],
        imageUrl: userRow[9],
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
