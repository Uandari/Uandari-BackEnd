export enum USER_PROCEDURES {
  GET_USERS = 'SELECT * FROM USERSFM',
  //1: name, 2: lastNames, 3: controlNumber, 4: mail, 5: password, 6: idRole, 7: token, 8: imageUrl
  CREATE_USER = 'BEGIN ADDUSER(:1,:2,:3,:4,:5,:6,:7,:8); END;',
  //1: idUser, 2: name, 3: lastNames, 4: controlNumber, 5: mail, 6: password, 7: idRole, 8: token, 9: imageUrl
  UPDATE_USER = 'BEGIN UPDATEUSER(:1,:2,:3,:4,:5,:6,:7,:8,:9); END;',
  //1: controlNumber
  DELETE_USER = 'BEGIN DELETEUSER(:1); END;',
  //1: controlNumber 2: password
  LOGIN_USER = "SELECT * FROM USERSFM WHERE controlNumber = :1 AND password_ = :2",
  //1: controlNumber
  GETBYCONTROLNUMBER = 'SELECT * FROM USERSFM WHERE controlNumber = :1'
}
export enum ROLE_PROCEDURES {
  GET_ROLES = 'SELECT * FROM  ROLE WHERE isDelete = 0',
  //1: name
  CREATE_ROLE = 'BEGIN ADDROLE(:1); END;',
  //1: idRole, 2: name
  UPDATE_ROLE = 'BEGIN UPDATEROLE(:1,:2); END;',
  //1: idRole
  DELETE_ROLE = 'BEGIN DELETEROLE(:1); END;',
  //1: idRole
  GETBYID = 'SELECT * FROM ROLE WHERE idRole = :1 ',
}
export enum HOURXHOUR_PROCEDURES {
  GET_HOURXHOUR_WITHOUT_ISSUES = 'SELECT * FROM HourxHour',
  // p_must : Debe , p_id
  INSERT_MUST_AND_GET_ID = 'BEGIN InsertMustAndGetID(:p_must, :p_id); END;',
  //1: idHourXHour, 2: hour, 3: date, 4: must, 5: mustAcomulative, 6: is, 7: isAcomulative, 8: diference, 9: accomulativeDiference, 10: idCell, 11: idUser , 12: idAreas, 13: idOperation, 14: downtime
  UPDATE_HOURXHOUR = 'BEGIN UPDATEHOURXHOUR(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13,:14); END;',
  //1: idHourXHour
  GETBYID = 'SELECT * FROM HourxHour WHERE idHourXHour = :1',
}
export enum ISSUE_PROCEDURES {
  GET_ISSUES = 'SELECT * FROM ISSUEVW WHERE isDelete = 0',
  //1: idHourXHour, 2: idCategory, 3: idType, 4: enginesAffected, 5: description_, 6: date_, 7: estimateDate, 8: status, 9: shift, 10: idUser
  INSERT_ISSUE = 'BEGIN ADDISSUE(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10); END;',
  //1: idIssue, 2: idHourXHour, 3: idCategory, 4: idType, 5: enginesAffected, 6: description_, 7: date_, 8: estimateDate, 9: status, 10: shift, 11: idUser
  UPDATE_ISSUE = 'BEGIN UPDATEISSUE(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11); END;',
  //1: idIssue
  DELETE_ISSUE = 'BEGIN DELETEISSUE(:1); END;',
  //1: idIssue
  GETBYID = 'SELECT * FROM ISSUE WHERE idIssue = :1',
  LISTOFISSUES = 'SELECT * FROM LISTOFISSUES',
  //1: idIssue
  GETISSUESBYHOURS = 'SELECT * FROM issueXHourxHour WHERE idHourXHour = :1',
}
export enum CATEGORY_PROCEDURES {
  GET_CATEGORIES = 'SELECT * FROM CATEGORY ',
  // Confirmar si se les añadirá el campo isDelete
  GET_RECENTISSUES = 'SELECT * FROM RECENT_ISSUES',
  GET_ISSUESXAVAILABILITY = 'SELECT * FROM IssuesXAvailability',
  GET_ISSUESXQUALITY = 'SELECT * FROM IssuesXQuality',
  GET_ISSUESXPERFORMANCE = 'SELECT * FROM IssuesXPerformance',
  GET_STATUS_ISSUES = 'SELECT * FROM STATUS_ISSUES',
  //1: idCategory
  GETBYID = 'SELECT * FROM CATEGORY WHERE idCategory = :1',
}
export enum TYPECATEGORY_PROCEDURES {
  GET_TYPECATEGORIES = 'SELECT * FROM TYPES_CATEGORY',
  //1: idTypesCategory
  GETBYID = 'SELECT * FROM TYPES_CATEGORY WHERE idTypesCategory = :1',
}
export enum ESCALATEDISSUES_PROCEDURES {
  GET_ESCALATEDISSUES = 'SELECT * FROM ESCALATEDISSUES',
  //1: dateScaling, 2: scaleDeviation, 3: impeller, 4: agreedAction, 5: idUser, 6: status, 7: deadline, 8: idIssue
  INSERT_ESCALATEDISSUE = 'BEGIN ADDESCALATEDISSUE(:1,:2,:3,:4,:5,:6,:7,:8); END;',
  //1: idIssueScaled, 2: dateScaling, 3: scaleDeviation, 4: impeller, 5: affect5s, 6: agreedAction, 7: idUser, 8: status, 9: deadline, 10: idIssue
  UPDATE_ESCALATEDISSUE = 'BEGIN UPDATEESCALATEDISSUE(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10); END;',
  //1: idIssueScaled
  GETBYID = 'SELECT * FROM ESCALATEDISSUES WHERE idIssueScaled = :1',
}
export enum CELL_PROCEDURES {
  GET_CELLS = 'SELECT * FROM COMPLETECELLS',
  //1:CellName, 2: idUser, 3: idLine
  INSERT_CELL = 'BEGIN ADDCELL(:1,:2,:3); END;',
  //1: idCell, 2: cellName, 3: idUser, 4: idLine
  UPDATE_CELL = 'BEGIN UPDATECELL(:1,:2,:3,:4); END;',
  //1: idCell
  GETBYID = 'SELECT * FROM CELL WHERE idCell = :1 ',
  //1: idCell
  DELETE_CELL = 'BEGIN DELETECELL(:1);END;'
}
export enum LINE_PROCEDURES {
  GET_LINES = 'SELECT * FROM LineWithCar',
  //1: lineName 2: idCar
  INSERT_LINE = 'BEGIN ADDLINE(:1,:2); END;',
  //1: idLine, 2: lineName 3: idCar
  UPDATE_LINE = 'BEGIN UPDATELINE(:1,:2,:3); END;',
  //1: idLine
  DELETE_LINE = 'BEGIN DELETELINE(:1); END;',
  //1: idLine
  GETBYID = 'SELECT * FROM LINE WHERE idLine = :1 ',
}
export enum OPERATION_PROCEDURES {
  GET_OPERATION = 'SELECT * FROM OPERATION',
}
export enum AREA_PROCEDURES {
  GET_AREAS = 'SELECT * FROM AREAS',
}
export enum CAR_PROCEDURES{
  GET_CARS = 'SELECT * FROM CAR',
}