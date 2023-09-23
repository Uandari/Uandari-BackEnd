import { loginUserRequest } from '../common/api-interfaces/user/loginUserRequest';
import { userResponse } from 'src/common/api-interfaces/user/userResponse';
import { ResultVW } from '../common/api-interfaces/result';
import { UserModel } from '../common/entities/UserModel';
import { USER_PROCEDURES } from '../common/enums/stored-procedures';
import { StatusCodes } from '../common/enums/enums';
import { OracleHelper } from '../handlers/OracleHelper';
import { generarToken } from '../helpers/TokenHelpers';
import generarJWT from '../helpers/generarJWT';

export async function getUsersOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = USER_PROCEDURES.GET_USERS;
    const result = await db.execute(query);

    if (!result.rows) {
      throw new Error('Query result rows are undefined');
    }
    const users: userResponse[] = result.rows.map((row: any) => ({
      idUser: row[0],
      name: row[1],
      lastNames: row[2],
      imageUrl: row[4],
      controlNumber: row[3],
      role: row[7],
      idDelete: row[6]
    }));

    if (users.length === 0) {
      return new ResultVW(
        'There are no users to show',
        StatusCodes.NOT_FOUND,
        users
      );
    }
    return new ResultVW('successfully extracted users', StatusCodes.OK, users);
  } catch (error) {
    throw error;
  } finally {
    db.release();
  }
}

export async function findByNoControl(controlNumber: string): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = {
      text: USER_PROCEDURES.GETBYCONTROLNUMBER,
      values: [controlNumber]
    }
    const resultNoControl: any = await db.execute(query.text, query.values);
    return resultNoControl.rows.length > 0; //true or false
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}

export async function createUserOracle(user: UserModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const {
      name,
      lastNames,
      controlNumber,
      mail,
      password,
      idRole,
      imageUrl,
    } = user;

    const query = {
      text: USER_PROCEDURES.CREATE_USER,
      values: [
        name,
        lastNames,
        controlNumber,
        mail,
        password,
        idRole,
        generarToken(),
        imageUrl,
      ]
    }
    const result = await db.execute(query.text, query.values);
    const userResult: ResultVW = new ResultVW(
      'User created',
      StatusCodes.OK,
      user
    );

    if (result.rows && result.rows.length === 0) {
      return new ResultVW('User Problem', StatusCodes.BAD_REQUEST, user);
    }
    return userResult;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}

export async function getUserByControlNumberOracle(
  idUser: string
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await findByNoControl(idUser))) {
      return new ResultVW('User not found', StatusCodes.NOT_FOUND, []);
    }
    const query = {
      text: USER_PROCEDURES.GETBYCONTROLNUMBER,
      values: [idUser]
    }
    const result: any = await db.execute(query.text, query.values);
    const user: userResponse = result.rows.map((row: any) => ({
      idUser: row[0],
      name: row[1],
      lastNames: row[2],
      controlNumber: row[3],
      imageUrl: row[4],
      role: row[7],
      idDelete: row[6],
    }));

    const userResult: ResultVW = new ResultVW(
      'User found',
      StatusCodes.OK,
      user
    );
    if (result.rows && result.rows.length === 0) {
      return new ResultVW('User not found', StatusCodes.NOT_FOUND, user);
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

export async function updateUserOracle(user: UserModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    console.log(user.controlNumber);
    if (!(await findByNoControl(user.controlNumber))) {
      return new ResultVW('User not found', StatusCodes.NOT_FOUND, []);
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
    const query = {
      text: USER_PROCEDURES.UPDATE_USER,
      values: [
        idUser,
        name,
        lastNames,
        controlNumber,
        mail,
        password,
        idRole,
        token,
        imageUrl,
      ]
    }
    await db.execute(query.text, query.values);

    return new ResultVW('User updated', StatusCodes.OK, user);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}

export async function deleteUserOracle(controlNumber: string): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await findByNoControl(controlNumber))) {
      return new ResultVW('User not found', StatusCodes.BAD_REQUEST, []);
    }
    const query = {
      text: USER_PROCEDURES.DELETE_USER,
      values: [controlNumber]
    }
    await db.execute(query.text, query.values);
    const user = await getUserByControlNumberOracle(controlNumber);
    console.log(user);
    return new ResultVW('User deleted', StatusCodes.OK, user.vw);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}

export async function loginUserOracle(user: loginUserRequest): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const { controlNumber, password } = user;
    const query = USER_PROCEDURES.LOGIN_USER;
    const result: any = await db.execute(query, [controlNumber, password]);
    if (result.rows && result.rows.length > 0) {
      const userRow = result.rows[0];
      const user: userResponse = {
        idUser: userRow[0],
        name: userRow[1],
        lastNames: userRow[2],
        controlNumber: userRow[3],
        imageUrl: userRow[4],
        role: userRow[7],
        accessToken: generarJWT(userRow[3]),
      };
      return new ResultVW('User found', StatusCodes.OK, user);
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  } finally {
    db.release();
  }
}



