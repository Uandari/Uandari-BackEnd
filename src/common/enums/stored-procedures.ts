export enum USER_PROCEDURES {
  GET_USERS = "SELECT * FROM USERVW",
  CREATE_USER = "ADDUSER",
  UPDATE_USER = "UPDATEUSER",
  DELETE_USER = "DELETEUSER",
  LOGIN_USER = "LOGINUSER",
  GETBYCONTROLNUMBER = "SELECT * FROM USERVW WHERE idUsuario = ",
}
export enum ROL_PROCEDURES {
  GET_ROLES = "SELECT * FROM  ROL",
  CREATE_ROL = "ADDROL",
  UPDATE_ROL = "UPDATEROL",
  DELETE_ROL = "DELETEROL",
  GETBYID = "SELECT * FROM ROL WHERE idRol = ",
}
