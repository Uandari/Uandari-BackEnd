import { OracleHelper } from "../handlers/OracleHelper";
import { RolModel } from "../common/entities/RolModel";
import { ResultVW } from "../common/api-interfaces/result";
import { ROL_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Get all roles using Oracle procedure
export async function getRolesOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${ROL_PROCEDURES.GET_ROLES}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const roles: RolModel[] = result.rows.map((rol: any) => ({
      id: rol[0],
      nombre: rol[1],
    }));
    if (roles.length === 0) {
      return new ResultVW(
        "There are no toles to show",
        StatusCodes.NO_CONTENT,
        roles
      );
    }
    return new ResultVW("Roles found", StatusCodes.OK, roles);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Create a new rol using Oracle procedure
export async function createRolOracle(rol: RolModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();

  try {
    const { nombre } = rol;
    const query = `
      BEGIN 
          ${ROL_PROCEDURES.CREATE_ROL}(
          '${nombre}'
        );
      END;
    `;
    const result = await db.execute(query);
    const rolResult: ResultVW = new ResultVW(
      "Rol created",
      StatusCodes.OK,
      rol
    );
    if (result.rows && result.rows.length === 0) {
      return new ResultVW("Rol Problem", StatusCodes.BAD_REQUEST, rol);
    }
    return rolResult;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Get user by id using Oracle
export async function getRolByIdOracle(idRol: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await verifyRolExistsOracle(idRol))) {
      //console.log(await verifyRolExistsOracle(idRol));
      return new ResultVW("Rol not found", StatusCodes.NOT_FOUND, []);
    }
    const query = `${ROL_PROCEDURES.GETBYID} ${idRol}`;
    const result: any = await db.execute(query);
    const rol: RolModel = result.rows.map((row: any) => ({
      id: row[0],
      nombre: row[1],
      isDeleted: row[2],
    }));
    return new ResultVW("Rol found", StatusCodes.OK, rol);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//verify if a rol exists using Oracle
export async function verifyRolExistsOracle(id: number): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${ROL_PROCEDURES.GETBYID} ${id}`;
    const result: any = await db.execute(query);
    return result.rows && result.rows.length > 0;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Logic delete a rol by id using Oracle
export async function deleteRolByIdOracle(idRol: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();

  try {
    if (!(await verifyRolExistsOracle(idRol))) {
      console.log(await verifyRolExistsOracle(idRol));
      return new ResultVW("Rol not found", StatusCodes.NOT_FOUND, []);
    }
    const query = `
      BEGIN 
          ${ROL_PROCEDURES.DELETE_ROL}(
          ${idRol}
        );
      END;
    `;
    await db.execute(query);
    const rol = await getRolByIdOracle(idRol);
    const rolResult: ResultVW = new ResultVW(
      "Rol deleted",
      StatusCodes.OK,
      rol.vw
    );
    return rolResult;
  } catch (error) {
    throw error;
  }
}
//Update a rol using Oracle
export async function updateRolOracle(rol: RolModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const { idRol, nombre } = rol;

    const query = `
      BEGIN 
          ${ROL_PROCEDURES.UPDATE_ROL}(
          ${idRol},
          '${nombre}'
        );
      END;
    `;
    console.log(query);
    await db.execute(query);
    let rolResult: ResultVW;
    if (typeof idRol === "number") {
      rolResult = await getRolByIdOracle(idRol);
      if (rolResult.vw.length === 0) {
        return new ResultVW("Rol not found", StatusCodes.NOT_FOUND, []);
      }
      return new ResultVW("User updated", StatusCodes.OK, rolResult.vw);
    }

    return new ResultVW("Something went wrong ", StatusCodes.NOT_FOUND, []);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
