export enum USER_PROCEDURES {
  GET_USERS = 'SELECT * FROM USERVW',
  CREATE_USER = 'ADDUSER',
  UPDATE_USER = 'UPDATEUSER',
  DELETE_USER = 'DELETEUSER',
  LOGIN_USER = 'LOGINUSER',
  GETBYCONTROLNUMBER = 'SELECT * FROM USERVW WHERE controlNumber = ',
}
export enum ROLE_PROCEDURES {
  GET_ROLES = 'SELECT * FROM  ROLE',
  CREATE_ROLE = 'ADDROLE',
  UPDATE_ROLE = 'UPDATEROLE',
  DELETE_ROLE = 'DELETEROLE',
  GETBYID = 'SELECT * FROM ROLE WHERE idRole = ',
}
export enum HOURXHOUR_PROCEDURES {
  GET_HOURXHOUR = 'SELECT * FROM HourxHourComplete',
  GET_HOURXHOUR_WITHOUT_ISSUES = 'SELECT * FROM HourxHour',
  INSERT_MUST_AND_GET_ID = 'BEGIN InsertMustAndGetID(:p_must, :p_id); END;',
  UPDATE_HOURXHOUR = 'UPDATEHOURXHOUR',
  GETBYID = 'SELECT * FROM HourxHour WHERE idHourXHour = ',
}
export enum ISSUE_PROCEDURES {
  GET_ISSUES = 'SELECT * FROM ISSUEVW',
  INSERT_ISSUE = 'ADDISSUE',
  UPDATE_ISSUE = 'UPDATEISSUE',
  DELETE_ISSUE = 'DELETEISSUE',
  GETBYID = 'SELECT * FROM ISSUE WHERE idIssue = ',
  LISTOFISSUES = 'SELECT * FROM LISTOFISSUES',
  GETISSUESBYHOURS = 'SELECT * FROM issueXHourxHour WHERE idHourXHour =',

}
export enum CATEGORY_PROCEDURES {
  GET_CATEGORIES = 'SELECT * FROM CATEGORY',
  GET_RECENTISSUES = 'SELECT * FROM RECENT_ISSUES',
  GET_ISSUESXAVAILABILITY = 'SELECT * FROM IssuesXAvailability',
  GET_ISSUESXQUALITY = 'SELECT * FROM IssuesXQuality',
  GET_ISSUESXPERFORMANCE = 'SELECT * FROM IssuesXPerformance',
  GET_STATUS_ISSUES = 'SELECT * FROM STATUS_ISSUES',
  GETBYID = 'SELECT * FROM CATEGORY WHERE idCategory = ',
}
export enum TYPECATEGORY_PROCEDURES {
  //Confirmar si la tabla se llama TYPECATEGORY
  GET_TYPECATEGORIES = 'SELECT * FROM TYPES_CATEGORY',
  GETBYID = 'SELECT * FROM TYPES_CATEGORY WHERE idTypesCategory = ',
}
export enum ESCALATEDISSUES_PROCEDURES {
  GET_ESCALATEDISSUES = 'SELECT * FROM ESCALATEDISSUES',
  INSERT_ESCALATEDISSUE = 'ADDESCALATEDISSUE',
  UPDATE_ESCALATEDISSUE = 'UPDATEESCALATEDISSUE',
  GETBYID = 'SELECT * FROM ESCALATEDISSUES WHERE idIssueScaled = ',
}
export enum CELL_PROCEDURES {
  GET_CELLS = 'SELECT * FROM CELL WHERE isDelete = 0 ',
  //1:CellName, 2: idUser, 3: idLine
  INSERT_CELL = 'BEGIN ADDCELL(:1,:2,:3); END;',
  //1: idCell, 2: cellName, 3: idUser, 4: idLine
  UPDATE_CELL = 'BEGIN UPDATECELL(:1,:2,:3,:4); END;',
  //1: idCell
  GETBYID = 'SELECT * FROM CELL WHERE idCell = :1 ',
  //1: idCell
  DELETE_CELL = 'BEGIN DELETECELL(:1);END;'
}