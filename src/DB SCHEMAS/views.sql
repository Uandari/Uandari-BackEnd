--------------------------------------------------------
-- Archivo creado  - domingo-septiembre-24-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for View STATUS_ISSUES
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."STATUS_ISSUES" ("IDISSUE", "DESCRIPTION_", "STATUS", "TYPENAME") AS 
  SELECT
    i.idIssue,
    i.description_,
    i.status,
    tc.typeCategory AS typeName
FROM
    ISSUE i
JOIN
    TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
;
--------------------------------------------------------
--  DDL for View USERSFM
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."USERSFM" ("IDUSER", "NAME_", "LASTNAMES", "CONTROLNUMBER", "IMAGEURL", "PASSWORD_", "ISDELETE", "ROL", "ACCESS_TOKEN") AS 
  SELECT
    uv.idUser,
    uv.name_,
    uv.lastNames,
    uv.controlNumber,
    uv.imageUrl,
    uv.password_,
    uv.isdelete,
    r.name AS rol,
    uv.token AS access_token
FROM UserVW uv
INNER JOIN Role r ON uv.idRole = r.idRole
;
--------------------------------------------------------
--  DDL for View RECENT_ISSUES
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."RECENT_ISSUES" ("IDISSUE", "CATEGORYNAME", "CATEGORYTYPE", "DESCIPTION", "DATE_", "RESPONSIBLE", "STATUS", "ENGINESAFFECTED") AS 
  SELECT
    i.idIssue,
    c.name_ AS categoryName,
    tc.typeCategory AS categoryType,
    i.description_ AS desciption,
    i.date_,
    u.name_ || ' ' || u.lastNames AS responsible,
    i.status,
    i.enginesAffected
FROM
    ISSUE i
JOIN
    TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
JOIN
    UserVW u ON i.idUser = u.idUser
JOIN
    CATEGORY c ON i.idCategory = c.idCategory
;
--------------------------------------------------------
--  DDL for View LISTOFISSUES
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."LISTOFISSUES" ("DAY_OF_WEEK", "SHIFT", "NOMBRE_TIPO_CATEGORIA", "DESCRIPCION_PROBLEMA", "TOTAL_ENGINES_AFFECTED", "CAR_NAME") AS 
  SELECT
    TO_CHAR(TO_DATE(i.date_, 'YYYY-MM-DD'), 'Day') AS day_of_week,
    i.shift,
    tc.typeCategory AS nombre_tipo_categoria,
    i.description_ AS descripcion_problema,
    SUM(i.enginesAffected) AS total_engines_affected,
    c.name_ AS car_name
FROM ISSUE i
JOIN TYPES_CATEGORY tc ON i.idCategory = tc.idCategory
JOIN HOURXHOUR hh ON i.idHourXhour = hh.idHourXhour
JOIN CELL ce ON hh.idCell = ce.idCell
JOIN LINE l ON ce.idLine = l.idLine
JOIN CAR c ON l.idCar = c.idCar
GROUP BY TO_CHAR(TO_DATE(i.date_, 'YYYY-MM-DD'), 'Day'), i.shift, tc.typeCategory, i.description_, c.name_
;
--------------------------------------------------------
--  DDL for View LINEWITHCAR
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."LINEWITHCAR" ("IDLINE", "LINENAME", "ISDELETE", "NAMECAR") AS 
  SELECT L.idLine, L.lineName, L.isDelete, C.NAME_ AS nameCar
FROM LINE L
LEFT JOIN CAR C ON L.idCar = C.idCar
WHERE L.isDelete = 0
;
--------------------------------------------------------
--  DDL for View ISSUEXHOURXHOUR
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."ISSUEXHOURXHOUR" ("IDISSUE", "IDHOURXHOUR", "IDCATEGORY", "IDTYPE", "ENGINESAFFECTED", "DESCRIPTION_", "DATE_", "ESTIMATEDATE", "STATUS", "SHIFT", "ISDELETE", "IDUSER", "TYPECATEGORY") AS 
  SELECT i."IDISSUE",i."IDHOURXHOUR",i."IDCATEGORY",i."IDTYPE",i."ENGINESAFFECTED",i."DESCRIPTION_",i."DATE_",i."ESTIMATEDATE",i."STATUS",i."SHIFT",i."ISDELETE",i."IDUSER", tc.typeCategory
FROM ISSUE i
JOIN TYPES_CATEGORY tc ON i.idCategory = tc.idCategory
;
--------------------------------------------------------
--  DDL for View ISSUESXQUALITY
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."ISSUESXQUALITY" ("CATEGORYTYPE", "ISSUECOUNT") AS 
  SELECT
    tc.typeCategory AS categoryType,
    COUNT(i.idIssue) AS issueCount
FROM
    ISSUE i
JOIN
    CATEGORY c ON i.idCategory = c.idCategory
JOIN
    TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
WHERE
    c.name_ = 'Calidad'
GROUP BY
    tc.typeCategory
;
--------------------------------------------------------
--  DDL for View ISSUESXPERFORMANCE
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."ISSUESXPERFORMANCE" ("CATEGORYTYPE", "ISSUECOUNT") AS 
  SELECT
    tc.typeCategory AS categoryType,
    COUNT(i.idIssue) AS issueCount
FROM
    ISSUE i
JOIN
    CATEGORY c ON i.idCategory = c.idCategory
JOIN
    TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
WHERE
    c.name_ = 'Desempeño'
GROUP BY
    tc.typeCategory
;
--------------------------------------------------------
--  DDL for View ISSUESXAVAILABILITY
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."ISSUESXAVAILABILITY" ("CATEGORYTYPE", "ISSUECOUNT") AS 
  SELECT
    tc.typeCategory AS categoryType,
    COUNT(i.idIssue) AS issueCount
FROM
    ISSUE i
JOIN
    CATEGORY c ON i.idCategory = c.idCategory
JOIN
    TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
WHERE
    c.name_ = 'Disponibilidad'
GROUP BY
    tc.typeCategory
;
--------------------------------------------------------
--  DDL for View HOURXHOURCOMPLETE
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."HOURXHOURCOMPLETE" ("idHourxHour", "hour", "date", "MUST", "MUSTACCUMULATIVE", "is", "isAccumulative", "DIFFERENCE", "DIFFERENCEACCUMULATIVE", "idCell", "IDUSER", "idIssue.idHourXHour", "idIssue.enginesAffected", "idIssue.description_", "idIssue.date_", "idIssue.estimateDate", "idIssue.status", "idIssue.shift", "idIssue.isDelete", "idIssue.idUser", "idIssue.idCategory.name_", "idIssue.idCategory.description_", "idIssue.idType.typeCategory", "idAreas", "idOperation", "downtime") AS 
  SELECT
    h.idHourXHour AS "idHourxHour",
    h.hour_ AS "hour",
    h.date_ AS "date",
    h.must,
    h.mustAccumulative,
    h.is_ AS "is",
    h.isAccumulative AS "isAcomulative",
    h.difference,
    h.accumulativeDifference,
    h.idCell AS "idCell",
    h.idUser,
    i.idHourXHour AS "idIssue.idHourXHour",
    i.enginesAffected AS "idIssue.enginesAffected",
    i.description_ AS "idIssue.description_",
    i.date_ AS "idIssue.date_",
    i.estimateDate AS "idIssue.estimateDate",
    i.status AS "idIssue.status",
    i.shift AS "idIssue.shift",
    i.isDelete AS "idIssue.isDelete",
    i.idUser AS "idIssue.idUser",
    c.name_ AS "idIssue.idCategory.name_",
    c.description_ AS "idIssue.idCategory.description_",
    t.typeCategory AS "idIssue.idType.typeCategory",
    h.idAreas, -- Add idAreas column
    h.idOperation, -- Add idOperation column
    h.downtime -- Add downtime column
FROM HourxHour h
JOIN ISSUE i ON h.idHourXHour = i.idHourXHour
JOIN CATEGORY c ON i.idCategory = c.idCategory
JOIN TYPES_CATEGORY t ON i.idType = t.idTypesCategory
WHERE i.isDelete = 0
;
--------------------------------------------------------
--  DDL for View COMPLETECELLS
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."COMPLETECELLS" ("IDCELL", "CELLNAME", "USERNAME", "LINENAME") AS 
  SELECT CELL.IDCELL, CELL.CELLNAME, COALESCE(UserVW.Name_, 'User Not Found') AS UserName, COALESCE(Line.lineName, 'Line Not Found') AS LineName
FROM CELL
LEFT JOIN UserVW ON CELL.IdUser = UserVW.idUser
LEFT JOIN Line ON CELL.IdLine = Line.idLine
WHERE CELL.isDelete = 0
;
REM INSERTING into UANDARI_USER.STATUS_ISSUES
SET DEFINE OFF;
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (26,'Descripción del problema','Pending','Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (48,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (103,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (21,'Descripción del problema','Pending','Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (23,'Descripción del problema','Pending','Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (27,'Descripción del problema','Pending','Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (49,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (52,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (104,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (2,'Descripción del problemaW','Resuelto','Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (3,'Descripción del problemaW','Resuelto','Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (22,'Descripción del problema','Pending','Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (28,'Descripción del problemaW','Resuelto','Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (41,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (43,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (45,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (50,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (53,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (1,'Descripción del problemaW','Resuelto','Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (24,'Descripción del problema','Pending','Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (42,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (44,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (46,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (51,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (54,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (61,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (81,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (25,'Descripción del problema','Pending','Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (47,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (62,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (101,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (102,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.STATUS_ISSUES (IDISSUE,DESCRIPTION_,STATUS,TYPENAME) values (105,'Descripción del problema','Pending','Cambio Herramienta de corte(piezas)');
REM INSERTING into UANDARI_USER.USERSFM
SET DEFINE OFF;
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (65,'maria','belen','71','src/img/photo.png','123456',1,'Admin','bgdrfc52ns81hakjv9r0');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (67,'maria','belen','69','src/img/photo.png','123456',0,'Admin','bq4role0qco1haldamji');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (4,'John','Doe','11','src/img/photo.png','45534345312',1,'Admin','sometokenvalue');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (5,'Juan','Ayala','10','src/img/photo.png','123456',0,'Admin','j42ppbcvogg1h89tejh5');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (7,'Juan','Ayala','10','src/img/photo.png','123456',0,'Admin','2lafjld05go1h89trc1m');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (8,'Juan','Ayala','10','src/img/photo.png','123456',0,'Admin','jhope5arho1h89tsjic');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (9,'Juan','Ayala','10','src/img/photo.png','123456',0,'Admin','45dmnbftpp1h89tstav');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (10,'Juan','Ayala','10','src/img/photo.png','123456',0,'Admin','7ct1fqgpei1h89uhq3o');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (11,'Juan','Ayala','11','src/img/photo.png','123456',1,'Admin','f05na9me6io1h89ur6p0');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (41,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','0uda69ap2j1h9kbh1jc');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (47,'Juan','Ayala','72705','src/img/photo.png','123456',1,'Admin','okrco2tirhg1h9kc9g8t');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (48,'Juan','Ayala','72706','src/img/photo.png','123456',0,'Admin','aqt513es2kg1h9kdi0t6');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (49,'Juan','Ayala','72707','src/img/photo.png','123456',0,'Admin','50q6rb67d1g1h9kdkb0u');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (64,'maria','belen','75','src/img/photo.png','123456',0,'Admin','1rq1giv6qug1haftjrq2');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (66,'maria','belen','70','src/img/photo.png','123456',0,'Admin','q6218c22o881hal57e7u');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (42,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','2tprbcub11h9kbjkqa');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (43,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','uou4h39pin1h9kbjqg5');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (44,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','dkf28v4p6381h9kbkrlf');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (45,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','upqrbl0elsg1h9kbnant');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (46,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','eeua1d06r4o1h9kboen7');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (62,'Juan','Ayala','7228897','src/img/photo.png','123456',0,'Admin','aqbpq4e3ufo1haag94ur');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (63,'karla','vazquez','735356','src/img/photo.png','123456',0,'Admin','eoaa6639sm1had3moqu');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (6,'Juan','Ayala','10','src/img/photo.png','123456',0,'Admin','7l4snsgmong1h89th825');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (21,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','6f477vegss81h9beagug');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (22,'Juan','Ayala','1854','src/img/photo.png','123456',0,'Admin','qcmr7iqmhc81h9bgomf6');
Insert into UANDARI_USER.USERSFM (IDUSER,NAME_,LASTNAMES,CONTROLNUMBER,IMAGEURL,PASSWORD_,ISDELETE,ROL,ACCESS_TOKEN) values (61,'Juan','Ayala','72289','src/img/photo.png','123456',0,'Admin','e2qaf2objug1ha90bgla');
REM INSERTING into UANDARI_USER.RECENT_ISSUES
SET DEFINE OFF;
Insert into UANDARI_USER.RECENT_ISSUES (IDISSUE,CATEGORYNAME,CATEGORYTYPE,DESCIPTION,DATE_,RESPONSIBLE,STATUS,ENGINESAFFECTED) values (26,'Calidad','Averias o fallas de equipos(piezas)','Descripción del problema','2023-08-19','John Doe','Pending',3);
Insert into UANDARI_USER.RECENT_ISSUES (IDISSUE,CATEGORYNAME,CATEGORYTYPE,DESCIPTION,DATE_,RESPONSIBLE,STATUS,ENGINESAFFECTED) values (21,'Desempeño','Averias o fallas de equipos(piezas)','Descripción del problema','2023-08-19','Juan Ayala','Pending',3);
Insert into UANDARI_USER.RECENT_ISSUES (IDISSUE,CATEGORYNAME,CATEGORYTYPE,DESCIPTION,DATE_,RESPONSIBLE,STATUS,ENGINESAFFECTED) values (23,'Calidad','Averias o fallas de equipos(piezas)','Descripción del problema','2023-08-19','Juan Ayala','Pending',3);
Insert into UANDARI_USER.RECENT_ISSUES (IDISSUE,CATEGORYNAME,CATEGORYTYPE,DESCIPTION,DATE_,RESPONSIBLE,STATUS,ENGINESAFFECTED) values (2,'Disponibilidad','Cambio/ajuste Herramientas o modelo(piezas)','Descripción del problemaW','2023-08-19','Juan Ayala','Resuelto',3);
REM INSERTING into UANDARI_USER.LISTOFISSUES
SET DEFINE OFF;
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Domingo  ','A','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Golf');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','A','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Golf');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Domingo  ','A','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','B','Averias o fallas de equipos(piezas)','Descripción del problemaW',9,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','B','Cambio/ajuste Herramientas o modelo(piezas)','Descripción del problemaW',9,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','B','Cambio Herramienta de corte(piezas)','Descripción del problemaW',9,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','B','Paros Planeados Mantenimiento','Descripción del problemaW',9,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','D','Desecho y retrabajo (piezas)','Descripción del problema',24,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','A','Desecho y retrabajo (piezas)','Descripción del problema',15,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Martes   ','D','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Miércoles','D','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Jueves   ','D','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','A','Averias o fallas de equipos(piezas)','Descripción del problemaW',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','A','Cambio/ajuste Herramientas o modelo(piezas)','Descripción del problemaW',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','A','Cambio Herramienta de corte(piezas)','Descripción del problemaW',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','A','Paros Planeados Mantenimiento','Descripción del problemaW',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Viernes  ','D','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Sábado   ','B','Desecho y retrabajo (piezas)','Descripción del problema',12,'VW Jetta');
Insert into UANDARI_USER.LISTOFISSUES (DAY_OF_WEEK,SHIFT,NOMBRE_TIPO_CATEGORIA,DESCRIPCION_PROBLEMA,TOTAL_ENGINES_AFFECTED,CAR_NAME) values ('Lunes    ','D','Desecho y retrabajo (piezas)','Descripción del problema',3,'VW Jetta');
REM INSERTING into UANDARI_USER.LINEWITHCAR
SET DEFINE OFF;
Insert into UANDARI_USER.LINEWITHCAR (IDLINE,LINENAME,ISDELETE,NAMECAR) values (21,'Cigueñal',0,'VW Golf');
Insert into UANDARI_USER.LINEWITHCAR (IDLINE,LINENAME,ISDELETE,NAMECAR) values (5,'Cigueñal',0,'VW Golf');
Insert into UANDARI_USER.LINEWITHCAR (IDLINE,LINENAME,ISDELETE,NAMECAR) values (41,'Cigueñal',0,'VW Passat');
Insert into UANDARI_USER.LINEWITHCAR (IDLINE,LINENAME,ISDELETE,NAMECAR) values (4,'Prueba',0,'VW Tiguan');
Insert into UANDARI_USER.LINEWITHCAR (IDLINE,LINENAME,ISDELETE,NAMECAR) values (42,'Cigueñal',0,'VW Tiguan');
REM INSERTING into UANDARI_USER.ISSUEXHOURXHOUR
SET DEFINE OFF;
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (26,123,3,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',1,4,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (48,3,3,3,3,'Descripción del problema','2023-08-22','2023-08-26','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (103,7,3,3,3,'Descripción del problema','2023-03-19','2023-09-01','Pending','A',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (21,123,2,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,5,'Proveedor');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (21,123,2,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,5,'Organizativas');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (21,123,2,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,5,'Logistica');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (23,123,3,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,5,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (27,123,3,2,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (49,3,3,3,3,'Descripción del problema','2023-08-23','2023-08-26','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (52,3,3,3,3,'Descripción del problema','2023-08-26','2023-08-26','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (104,81,3,3,3,'Descripción del problema','2023-03-19','2023-09-01','Pending','A',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (2,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,8,'Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (2,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,8,'Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (2,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,8,'Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (2,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,8,'Paros Planeados Mantenimiento');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (3,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',1,101,'Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (3,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',1,101,'Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (3,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',1,101,'Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (3,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',1,101,'Paros Planeados Mantenimiento');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (22,123,2,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Proveedor');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (22,123,2,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Organizativas');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (22,123,2,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Logistica');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (28,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,101,'Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (28,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,101,'Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (28,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,101,'Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (28,7,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,101,'Paros Planeados Mantenimiento');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (41,7,3,3,3,'Descripción del problema','2023-08-19','2023-08-21','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (43,7,3,3,3,'Descripción del problema','2023-08-19','2023-08-23','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (45,7,3,3,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (50,3,3,3,3,'Descripción del problema','2023-08-24','2023-08-26','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (53,3,3,3,12,'Descripción del problema','2023-08-26','2023-08-26','Pending','A',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (1,3,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','A',1,101,'Averias o fallas de equipos(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (1,3,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','A',1,101,'Cambio/ajuste Herramientas o modelo(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (1,3,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','A',1,101,'Cambio Herramienta de corte(piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (1,3,1,2,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','A',1,101,'Paros Planeados Mantenimiento');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (24,123,3,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (42,7,3,3,3,'Descripción del problema','2023-08-19','2023-08-22','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (44,7,3,3,3,'Descripción del problema','2023-08-19','2023-08-24','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (46,7,3,3,3,'Descripción del problema','2023-08-19','2023-08-26','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (51,3,3,3,3,'Descripción del problema','2023-08-25','2023-08-26','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (54,3,3,3,12,'Descripción del problema','2023-08-26','2023-08-26','Pending','B',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (61,123,3,3,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (81,123,3,3,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (25,123,3,1,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (47,3,3,3,3,'Descripción del problema','2023-08-21','2023-08-26','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (62,123,3,3,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (101,7,3,3,3,'Descripción del problema','2023-08-19','2023-09-01','Pending','D',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (102,7,3,3,3,'Descripción del problema','2023-08-19','2023-09-01','Pending','A',0,101,'Desecho y retrabajo (piezas)');
Insert into UANDARI_USER.ISSUEXHOURXHOUR (IDISSUE,IDHOURXHOUR,IDCATEGORY,IDTYPE,ENGINESAFFECTED,DESCRIPTION_,DATE_,ESTIMATEDATE,STATUS,SHIFT,ISDELETE,IDUSER,TYPECATEGORY) values (105,81,3,3,3,'Descripción del problema','2023-09-23','2023-09-01','Pending','A',0,101,'Desecho y retrabajo (piezas)');
REM INSERTING into UANDARI_USER.ISSUESXQUALITY
SET DEFINE OFF;
Insert into UANDARI_USER.ISSUESXQUALITY (CATEGORYTYPE,ISSUECOUNT) values ('Averias o fallas de equipos(piezas)',4);
Insert into UANDARI_USER.ISSUESXQUALITY (CATEGORYTYPE,ISSUECOUNT) values ('Cambio Herramienta de corte(piezas)',22);
Insert into UANDARI_USER.ISSUESXQUALITY (CATEGORYTYPE,ISSUECOUNT) values ('Cambio/ajuste Herramientas o modelo(piezas)',1);
REM INSERTING into UANDARI_USER.ISSUESXPERFORMANCE
SET DEFINE OFF;
Insert into UANDARI_USER.ISSUESXPERFORMANCE (CATEGORYTYPE,ISSUECOUNT) values ('Averias o fallas de equipos(piezas)',2);
REM INSERTING into UANDARI_USER.ISSUESXAVAILABILITY
SET DEFINE OFF;
Insert into UANDARI_USER.ISSUESXAVAILABILITY (CATEGORYTYPE,ISSUECOUNT) values ('Cambio/ajuste Herramientas o modelo(piezas)',4);
REM INSERTING into UANDARI_USER.HOURXHOURCOMPLETE
SET DEFINE OFF;
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-03-19','2023-09-01','Pending','A',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,8,'Disponibilidad','Categoría relacionada con la disponibilidad de materiales.','Cambio/ajuste Herramientas o modelo(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problemaW','2023-08-19','2023-08-25','Resuelto','B',0,101,'Disponibilidad','Categoría relacionada con la disponibilidad de materiales.','Cambio/ajuste Herramientas o modelo(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-08-21','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-08-23','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-08-22','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-08-24','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-08-26','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-09-01','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (7,'12:000000','2023-08-18',20000,15,3,8,2,4,3,456,7,3,'Descripción del problema','2023-08-19','2023-09-01','Pending','A',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (81,'12:000000','2023-08-18',20000,15,3,8,2,4,21,456,81,3,'Descripción del problema','2023-03-19','2023-09-01','Pending','A',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (81,'12:000000','2023-08-18',20000,15,3,8,2,4,21,456,81,3,'Descripción del problema','2023-09-23','2023-09-01','Pending','A',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',1,2,60);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,3,'Descripción del problema','2023-08-22','2023-08-26','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,3,'Descripción del problema','2023-08-23','2023-08-26','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,3,'Descripción del problema','2023-08-26','2023-08-26','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,3,'Descripción del problema','2023-08-24','2023-08-26','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,12,'Descripción del problema','2023-08-26','2023-08-26','Pending','A',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,3,'Descripción del problema','2023-08-25','2023-08-26','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,12,'Descripción del problema','2023-08-26','2023-08-26','Pending','B',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (3,'12:00','2023-08-18',5,15,3,8,2,4,3,1,3,3,'Descripción del problema','2023-08-21','2023-08-26','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,5,'Desempeño','Categoría relacionada con el factor humano Proveedor, Logistica.','Averias o fallas de equipos(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,5,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Averias o fallas de equipos(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio/ajuste Herramientas o modelo(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Desempeño','Categoría relacionada con el factor humano Proveedor, Logistica.','Averias o fallas de equipos(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Averias o fallas de equipos(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Averias o fallas de equipos(piezas)',null,null,null);
Insert into UANDARI_USER.HOURXHOURCOMPLETE ("idHourxHour","hour","date",MUST,MUSTACCUMULATIVE,"is","isAccumulative",DIFFERENCE,DIFFERENCEACCUMULATIVE,"idCell",IDUSER,"idIssue.idHourXHour","idIssue.enginesAffected","idIssue.description_","idIssue.date_","idIssue.estimateDate","idIssue.status","idIssue.shift","idIssue.isDelete","idIssue.idUser","idIssue.idCategory.name_","idIssue.idCategory.description_","idIssue.idType.typeCategory","idAreas","idOperation","downtime") values (123,null,null,150,null,null,null,null,null,null,null,123,3,'Descripción del problema','2023-08-19','2023-08-25','Pending','D',0,101,'Calidad','Categoría relacionada con la calidad de retrabajo y desecho de piezas','Cambio Herramienta de corte(piezas)',null,null,null);
REM INSERTING into UANDARI_USER.COMPLETECELLS
SET DEFINE OFF;
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (81,'CBP01','Juan','Line Not Found');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (82,'CBP01','Juan','Line Not Found');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (1,'Célula A','User Not Found','Prueba');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (42,'CBP01','User Not Found','Prueba');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (43,'CBP01','User Not Found','Prueba');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (61,'CBP01','User Not Found','Prueba');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (2,'Célula B','User Not Found','Ejemplo de nombre de línea');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (21,'Célula D','User Not Found','Cigueñal');
Insert into UANDARI_USER.COMPLETECELLS (IDCELL,CELLNAME,USERNAME,LINENAME) values (3,'Célula C','User Not Found','Cigueñal');
