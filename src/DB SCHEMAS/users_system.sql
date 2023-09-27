--------------------------------------------------------
-- Archivo creado  - martes-septiembre-26-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for View USERSYSTEMVIEW
--------------------------------------------------------

  CREATE OR REPLACE FORCE NONEDITIONABLE VIEW "UANDARI_USER"."USERSYSTEMVIEW" ("IDUSER", "NAME_", "LASTNAMES", "CONTROLNUMBER", "ROLENAME", "LINENAME") AS 
  SELECT
    u.idUser,
    u.name_,
    u.lastNames,
    u.controlNumber,
    r.name AS roleName,
    l.lineName
FROM
    UserVW u
LEFT JOIN
    Role r ON u.idRole = r.idRole
LEFT JOIN
    Cell c ON u.idUser = c.idUser
LEFT JOIN
    LineVW l ON c.idLine = l.idLine
;