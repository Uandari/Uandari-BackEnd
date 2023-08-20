import { OracleHelper } from "../handlers/OracleHelper";
import { RoleModel } from "../common/entities/RoleModel";
import { ResultVW } from "../common/api-interfaces/result";
import { ROLE_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Get all roles using Oracle procedure
export async function getRolesOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${ROLE_PROCEDURES.GET_ROLES}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const roles: RoleModel[] = result.rows.map((role: any) => ({
      idRole: role[0],
      name: role[1],
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
export async function createRoleOracle(role: RoleModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();

  try {
    const { name } = role;
    const query = `
      BEGIN 
          ${ROLE_PROCEDURES.CREATE_ROL}(
          '${name}'
        );
      END;
    `;
    const result = await db.execute(query);
    const roleResult: ResultVW = new ResultVW(
      "Rol created",
      StatusCodes.OK,
      role
    );
    if (result.rows && result.rows.length === 0) {
      return new ResultVW("Role Problem", StatusCodes.BAD_REQUEST, role);
    }
    return roleResult;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Get user by id using Oracle
export async function getRoleByIdOracle(idRole: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await verifyRoleExistsOracle(idRole))) {
      //console.log(await verifyRolExistsOracle(idRole));
      return new ResultVW("Role not found", StatusCodes.NOT_FOUND, []);
    }
    const query = `${ROLE_PROCEDURES.GETBYID} ${idRole}`;
    const result: any = await db.execute(query);
    const role: RoleModel = result.rows.map((row: any) => ({
      idRole: row[0],
      name: row[1],
      isDeleted: row[2],
    }));
    return new ResultVW("Rol found", StatusCodes.OK, role);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//verify if a rol exists using Oracle
export async function verifyRoleExistsOracle(idRole: number): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${ROLE_PROCEDURES.GETBYID} ${idRole}`;
    const result: any = await db.execute(query);
    return result.rows && result.rows.length > 0;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
//Logic delete a rol by id using Oracle
export async function deleteRoleByIdOracle(idRole: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();

  try {
    if (!(await verifyRoleExistsOracle(idRole))) {
      console.log(await verifyRoleExistsOracle(idRole));
      return new ResultVW("Role not found", StatusCodes.NOT_FOUND, []);
    }
    const query = `
      BEGIN 
          ${ROLE_PROCEDURES.DELETE_ROL}(
          ${idRole}
        );
      END;
    `;
    await db.execute(query);
    const role = await getRoleByIdOracle(idRole);
    const roleResult: ResultVW = new ResultVW(
      "Role deleted",
      StatusCodes.OK,
      role.vw
    );
    return roleResult;
  } catch (error) {
    throw error;
  }
}
//Update a rol using Oracle
export async function updateRoleOracle(role: RoleModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const { idRole, name } = role;

    const query = `
      BEGIN 
          ${ROLE_PROCEDURES.UPDATE_ROL}(
          ${idRole},
          '${name}'
        );
      END;
    `;
    console.log(query);
    await db.execute(query);
    let roleResult: ResultVW;
    if (typeof idRole === "number") {
      roleResult = await getRoleByIdOracle(idRole);
      if (roleResult.vw.length === 0) {
        return new ResultVW("Rol not found", StatusCodes.NOT_FOUND, []);
      }
      return new ResultVW("User updated", StatusCodes.OK, roleResult.vw);
    }

    return new ResultVW("Something went wrong ", StatusCodes.NOT_FOUND, []);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}
