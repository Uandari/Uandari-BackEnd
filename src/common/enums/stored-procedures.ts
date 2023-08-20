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
export enum HOURXHOUR_PROCEDURES {
  GET_HOURXHOUR = "SELECT * FROM HourxHourComplete",
  INSERT_MUST_AND_GET_ID = "BEGIN InsertMustAndGetID(:p_must, :p_id); END;",
  UPDATE_HOURXHOUR = "UPDATEHOURXHOUR",
  GETBYID = "SELECT * FROM HourxHour WHERE idHourXHour = ",
}

export enum ISSUE_PROCEDURES {
  GET_ISSUES = "SELECT * FROM ISSUEVW",
  INSERT_ISSUE = "ADDISSUE",
  UPDATE_ISSUE = "UPDATEISSUE",
  DELETE_ISSUE = "DELETEISSUE",
  GETBYID = "SELECT * FROM ISSUE WHERE idIssue = ",
}
