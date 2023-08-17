import oracledb from "oracledb";
import { OracleDatabaseConnectionError } from "../helpers/ExceptionHelpers";
//import { query } from "express";
export class OracleHelper {
  private handleOracleError(error: Error) {
    throw new OracleDatabaseConnectionError("Database connection error", error);
  }

  async createConnection() {
    let db: oracledb.Connection;
    try {
      db = await oracledb.getConnection({
        user:process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNECTION_STRING,
      });
      //CONNECTION SUCCESSFUL
      console.log("Connection successful");
      return db;
    } catch (error) {
      //CONNECTION ERROR
      throw this.handleOracleError(error as Error);
    }
  }
}
