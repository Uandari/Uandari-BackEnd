CREATE TABLE Role (
    idRole NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    name VARCHAR2(50) NOT NULL,
    CONSTRAINT pk_rol PRIMARY KEY (idRole)
);

ALTER TABLE
    Role
ADD
    isDelete NUMBER(1, 0) DEFAULT 0;

-- 1 for true, 0 for false
--PROCESOS DE ALMACENADO ROL
--AÑADIR ROL 
CREATE
OR REPLACE PROCEDURE ADDROLE(p_name IN VARCHAR2) AS BEGIN -- Insertar un nuevo registro en la tabla Rol
INSERT INTO
    Role (name)
VALUES
    (p_name);

-- Confirmar la transacción para aplicar la inserción
COMMIT;

EXCEPTION -- En caso de error, deshacer la transacción y relanzar la excepción
WHEN OTHERS THEN ROLLBACK;

RAISE;

END ADDROLE;

--BORRADO LOGICO ROL
CREATE
OR REPLACE PROCEDURE DELETEROLE(p_idRole IN NUMBER) AS BEGIN
UPDATE
    Role
SET
    isDelete = 1
WHERE
    idRole = p_idRole;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END DELETEROLE;

--ACTUALIZAR ROL
CREATE
OR REPLACE PROCEDURE UPDATEROLE(
    p_idRole IN NUMBER,
    p_name IN VARCHAR2
) AS BEGIN
UPDATE
    Role
SET
    name = p_name
WHERE
    idRole = p_idRole;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END UPDATEROLE;

/* 
 TABLA DE USUARIOS
 */
CREATE TABLE UserVW (
    idUser NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    name_ VARCHAR2(100) NOT NULL,
    lastNames VARCHAR2(100) NOT NULL,
    controlNumber VARCHAR2(20) NOT NULL,
    mail VARCHAR2(100) NOT NULL,
    password_ VARCHAR2(100) NOT NULL,
    idRole NUMBER,
    token VARCHAR2(200),
    verifiedAccount NUMBER(1, 0) DEFAULT 0,
    -- 1 for true, 0 for false
    CONSTRAINT pk_user PRIMARY KEY (idUser),
    CONSTRAINT fk_user_role FOREIGN KEY (idRole) REFERENCES Role(idRole)
);

ALTER TABLE
    UserVW
ADD
    imageUrl VARCHAR2(255)
ALTER TABLE
    UserVW
ADD
    isDelete NUMBER(1, 0) DEFAULT 0;

-- 1 for true, 0 for false
CREATE
OR REPLACE PROCEDURE ADDUSER(
    p_name IN VARCHAR2,
    p_lastNames IN VARCHAR2,
    p_controlNumber IN VARCHAR2,
    p_mail IN VARCHAR2,
    p_password IN VARCHAR2,
    p_idRole IN NUMBER,
    p_token IN VARCHAR2,
    p_imageUrl IN VARCHAR2
) AS BEGIN
INSERT INTO
    UserVW (
        name_,
        lastNames,
        controlNumber,
        mail,
        password_,
        idRole,
        token,
        imageUrl
    )
VALUES
    (
        p_name,
        p_lastNames,
        p_controlNumber,
        p_mail,
        p_password,
        p_idRole,
        p_token,
        p_imageUrl
    );

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END ADDUSER;

/* 
 PROCESO DE ALMENADO PARA ACTUALIZAR UN USUARIO
 */
CREATE
OR REPLACE PROCEDURE UPDATEUSER(
    p_idUser IN NUMBER,
    p_name IN VARCHAR2,
    p_lastNames IN VARCHAR2,
    p_controlNumber IN VARCHAR2,
    p_mail IN VARCHAR2,
    p_password IN VARCHAR2,
    p_idRole IN NUMBER,
    p_token IN VARCHAR2,
    p_imageUrl IN VARCHAR2
) AS BEGIN
UPDATE
    UserVW
SET
    name_ = p_name,
    lastNames = p_lastNames,
    controlNumber = p_controlNumber,
    mail = p_mail,
    password_ = p_password,
    idRole = p_idRole,
    token = p_token,
    imageUrl = p_imageUrl
WHERE
    idUser = p_idUser;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END UPDATEUSER;

/* 
 PROCESO DE ALMENADO PARA ELIMINAR UN USUARIO
 */
CREATE
OR REPLACE PROCEDURE DELETEUSER(p_idUser IN NUMBER) AS BEGIN
UPDATE
    UserVW
SET
    isDelete = 1
WHERE
    idUser = p_idUser;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END DELETEUSER;

/* 
 TABLA DE HORAXHORA
 */
CREATE TABLE HourxHour (
    idHourXHour NUMBER GENERATED ALWAYS AS IDENTITY,
    hour_ VARCHAR2(10),
    date_ VARCHAR2(10),
    must NUMBER,
    mustAcomulative NUMBER,
    is_ NUMBER,
    isAcomulative NUMBER,
    diference NUMBER,
    diferenceAcomulative NUMBER,
    idCelula NUMBER,
    idUser NUMBER,
    CONSTRAINT pk_HourxHour PRIMARY KEY (idHourXHour)
);

/* 
 PROCESO 
 DE ALMACENADO ADD HOURXHOUR MUST
 */
CREATE
OR REPLACE PROCEDURE InsertMustAndGetID(p_must NUMBER, p_id OUT NUMBER) AS BEGIN
INSERT INTO
    HourxHour (must)
VALUES
    (p_must) RETURNING idHourXHour INTO p_id;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END InsertMustAndGetID;

/* 
 PROCESO 
 DE ALMACENADO UPDATE HOURXHOUR MUST
 */
CREATE
OR REPLACE PROCEDURE UpdateHourxHour(
    p_idHourXHour_ NUMBER,
    p_hour_ VARCHAR2,
    p_date_ VARCHAR2,
    p_must NUMBER,
    p_mustAcomulative NUMBER,
    p_is_ NUMBER,
    p_isAcomulative NUMBER,
    p_diference NUMBER,
    p_diferenceAcomulative NUMBER,
    p_idCelula NUMBER,
    p_idUser NUMBER
) AS BEGIN
UPDATE
    HourxHour
SET
    hour_ = p_hour_,
    date_ = p_date_,
    must = p_must,
    mustAcomulative = p_mustAcomulative,
    is_ = p_is_,
    isAcomulative = p_isAcomulative,
    diference = p_diference,
    diferenceAcomulative = p_diferenceAcomulative,
    idCelula = p_idCelula,
    idUser = p_idUser
WHERE
    idHourXHour = p_idHourXHour_;

COMMIT;

EXCEPTION -- En caso de error, deshacer la transacción y relanzar la excepción
WHEN OTHERS THEN ROLLBACK;

RAISE;

END UpdateHourxHour;

/* 
 Tabla Problema
 */
CREATE TABLE ISSUE (
    idIssue NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    idHourXHour NUMBER,
    idCategory NUMBER,
    idType NUMBER,
    enginesAffected NUMBER,
    description_ VARCHAR2(1000),
    date_ VARCHAR(50),
    estimateDate VARCHAR2(255),
    status VARCHAR2(50),
    shift VARCHAR2(1),
    isDelete NUMBER(1, 0) DEFAULT 0,
    -- 1 for true, 0 for false,
    idUser NUMBER,
    CONSTRAINT pk_issue PRIMARY KEY (idIssue)
);

/*
 PROCESO DE ALMACENADO ADD
 */
CREATE
OR REPLACE PROCEDURE ADDISSUE(
    p_idHourXHour NUMBER,
    p_idCategory NUMBER,
    p_idType NUMBER,
    p_enginesAffected NUMBER,
    p_description_ VARCHAR2,
    p_date_ VARCHAR2,
    p_estimateDate VARCHAR2,
    p_status VARCHAR2,
    p_shift VARCHAR2,
    p_idUser NUMBER
) AS BEGIN
INSERT INTO
    ISSUE (
        idHourXHour,
        idCategory,
        idType,
        enginesAffected,
        description_,
        date_,
        estimateDate,
        status,
        shift,
        idUser
    )
VALUES
    (
        p_idHourXHour,
        p_idCategory,
        p_idType,
        p_enginesAffected,
        p_description_,
        p_date_,
        p_estimateDate,
        p_status,
        p_shift,
        p_idUser
    );

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

END ADDISSUE;

/
/*
 PROCESO DE ALMACENADO  UPDATE
 */
CREATE
OR REPLACE PROCEDURE UPDATEISSUE(
    p_issueId NUMBER,
    p_HourXHour NUMBER,
    p_idCategory NUMBER,
    p_idType NUMBER,
    p_enginesAffected NUMBER,
    p_description_ VARCHAR2,
    p_date_ VARCHAR2,
    p_estimateDate VARCHAR2,
    p_status VARCHAR2,
    p_shift VARCHAR2,
    p_idUser NUMBER
) AS BEGIN
UPDATE
    ISSUE
SET
    idHourXHour = p_HourXHour,
    idCategory = p_idCategory,
    idType = p_idType,
    enginesAffected = p_enginesAffected,
    description_ = p_description_,
    date_ = p_date_,
    estimateDate = p_estimateDate,
    status = p_status,
    shift = p_shift,
    idUser = p_idUser
WHERE
    idIssue = p_issueId;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

END UPDATEISSUE;

/
/*
 BORRADO LOGICO 
 */
CREATE
OR REPLACE PROCEDURE DELETEISSUE(p_issueId NUMBER) AS BEGIN
UPDATE
    ISSUE
SET
    isDelete = 1
WHERE
    idIssue = p_issueId;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

END DELETEISSUE;

/*
 CREACION TABLA CATERGORIA
 */
CREATE TABLE CATEGORY (
    idCategory NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    name_ VARCHAR(255),
    description_ VARCHAR(1000)
);

INSERT INTO
    CATEGORY (name_, description_)
VALUES
    (
        'Disponibilidad',
        'Categoría relacionada con la disponibilidad de materiales.'
    );

INSERT INTO
    CATEGORY (name_, description_)
VALUES
    (
        'Desempeño',
        'Categoría relacionada con el factor humano Proveedor, Logistica.'
    );

INSERT INTO
    CATEGORY (name_, description_)
VALUES
    (
        'Calidad',
        'Categoría relacionada con la calidad de retrabajo y desecho de piezas'
    );

/*
 TIPOS CATEGORIA
 */
CREATE TABLE TYPES_CATEGORY (
    idTypesCategory NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    typeCategory VARCHAR(255),
    idCategory NUMBER
);

-- Insertar para idCategory = 1
INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Averias o fallas de equipos(piezas)', 1);

INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Cambio/ajuste Herramientas o modelo(piezas)', 1);

INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Cambio Herramienta de corte(piezas)', 1);

INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Paros Planeados Mantenimiento', 1);

-- Insertar para idCategory = 2
INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Proveedor', 2);

INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Organizativas', 2);

INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Logistica', 2);

-- Insertar para idCategory = 3
INSERT INTO
    TYPES_CATEGORY (typeCategory, idCategory)
VALUES
    ('Desecho y retrabajo (piezas)', 3);

select
    *
from
    TYPES_CATEGORY
    /*
     GET  ALL HORA X HORA
     */
    CREATE VIEW HourxHourComplete AS
SELECT
    h.idHourXHour AS "idHourxHour",
    h.hour_ AS "hour",
    h.date_ AS "date",
    h.must,
    h.mustAcomulative,
    h.is_ AS "is",
    h.isAcomulative AS "isAcomulative",
    h.diference,
    h.diferenceAcomulative,
    h.idCelula AS "idCell",
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
    t.typeCategory AS "idIssue.idType.typeCategory"
FROM
    HourxHour h
    JOIN ISSUE i ON h.idHourXHour = i.idHourXHour
    JOIN CATEGORY c ON i.idCategory = c.idCategory
    JOIN TYPES_CATEGORY t ON i.idType = t.idTypesCategory
WHERE
    i.isDelete = 0;

/*
 EJECUCION HORAXHORA
 */
select
    *
from
    HourxHourComplete
    /*
     PROBLEMAS RECIENTES
     */
    CREATE VIEW RECENT_ISSUES AS
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
    JOIN TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
    JOIN UserVW u ON i.idUser = u.idUser
    JOIN CATEGORY c ON i.idCategory = c.idCategory;

SELECT
    *
FROM
    RECENT_ISSUES
    /*
     PROBLEMAS X RENDIMIENTO
     */
    CREATE VIEW IssuesXPerformance AS
SELECT
    tc.typeCategory AS categoryType,
    COUNT(i.idIssue) AS issueCount
FROM
    ISSUE i
    JOIN CATEGORY c ON i.idCategory = c.idCategory
    JOIN TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
WHERE
    c.name_ = 'Desempeño'
GROUP BY
    tc.typeCategory;

/*
 PROBLEMAS X CALIDAD
 */
CREATE VIEW IssuesXQuality AS
SELECT
    tc.typeCategory AS categoryType,
    COUNT(i.idIssue) AS issueCount
FROM
    ISSUE i
    JOIN CATEGORY c ON i.idCategory = c.idCategory
    JOIN TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
WHERE
    c.name_ = 'Calidad'
GROUP BY
    tc.typeCategory;

/*
 PROBLEMAS X DISPONIBILIDAD
 */
CREATE VIEW IssuesXAvailability AS
SELECT
    tc.typeCategory AS categoryType,
    COUNT(i.idIssue) AS issueCount
FROM
    ISSUE i
    JOIN CATEGORY c ON i.idCategory = c.idCategory
    JOIN TYPES_CATEGORY tc ON i.idType = tc.idTypesCategory
WHERE
    c.name_ = 'Disponibilidad'
GROUP BY
    tc.typeCategory;

select
    *
from
    IssuesXAvailability
    /*
     TABLA DE PROBLEMAS A ESCALAR
     */
    CREATE TABLE ESCALATEDISSUES (
        idIssueScaled NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
        dateScaling VARCHAR (50),
        scaleDeviation VARCHAR(50),
        impeller VARCHAR(100),
        affect5s NUMBER(1, 0) DEFAULT 0,
        agreedAction VARCHAR(50),
        idUser NUMBER,
        status NUMBER,
        deadLine VARCHAR(50),
        idIssue NUMBER,
        CONSTRAINT pk_issueScaled PRIMARY KEY (idIssueScaled)
    );

/*
 SP AÑADIR PROBLEMA ESCALADO
 */
CREATE
OR REPLACE PROCEDURE ADDESCALATEDISSUE(
    p_dateScaling VARCHAR2,
    p_scaleDeviation VARCHAR2,
    p_impeller VARCHAR2,
    p_affect5s NUMBER,
    p_agreedAction VARCHAR2,
    p_idUser NUMBER,
    p_status NUMBER,
    p_deadLine VARCHAR2,
    p_idIssue NUMBER
) AS BEGIN
INSERT INTO
    ESCALATEDISSUES (
        dateScaling,
        scaleDeviation,
        impeller,
        affect5s,
        agreedAction,
        idUser,
        status,
        deadLine,
        idIssue
    )
VALUES
    (
        p_dateScaling,
        p_scaleDeviation,
        p_impeller,
        p_affect5s,
        p_agreedAction,
        p_idUser,
        p_status,
        p_deadLine,
        p_idIssue
    );

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

-- Log or handle the exception here
RAISE;

END ADDESCALATEDISSUE;

/*
 VIEW PARA VER LOS PROBLEMAS POR IDHOURXHOUR
 */
CREATE
OR REPLACE VIEW issueXHourxHour AS
SELECT
    i.*,
    tc.typeCategory
FROM
    ISSUE i
    JOIN TYPES_CATEGORY tc ON i.idCategory = tc.idCategory;

/*
 Tabla Cell
 */
CREATE TABLE Cell (
    idCell NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    cellName VARCHAR2(100) NOT NULL,
    idUser NUMBER,
    idLine NUMBER,
    CONSTRAINT pk_idCell PRIMARY KEY (idCell)
);

/*
 SP ADDCELL
 */
CREATE
OR REPLACE PROCEDURE ADDCELL(
    cellName IN VARCHAR2,
    idUser IN NUMBER,
    idLine IN NUMBER
) AS BEGIN
INSERT INTO
    Cell(
        cellName,
        idUser,
        idLine
    )
VALUES
    (
        cellName,
        idUser,
        idLine
    );

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END ADDCELL;

SELECT
    *
FROM
    CELL BEGIN ADDCELL('Célula A', 1, 1);

-- Aquí se asumen valores de idUser y idLine
ADDCELL('Célula B', 2, 2);

-- que corresponden a registros existentes
ADDCELL('Célula C', 3, 3);

-- en las tablas de usuarios y líneas
END;

/*Alterar unos campos HORA X HORA*/
ALTER TABLE
    HourxHour RENAME COLUMN mustAcomulative TO mustAccumulative;

ALTER TABLE
    HourxHour RENAME COLUMN isAcomulative TO isAccumulative;

ALTER TABLE
    HourxHour RENAME COLUMN diference TO difference;

ALTER TABLE
    HourxHour RENAME COLUMN diferenceAcomulative TO accumulativeDifference;

ALTER TABLE
    HourxHour RENAME COLUMN idCelula TO idCell;

select
    *
from
    HourxHour CREATE
    OR REPLACE PROCEDURE InsertHourxHour(
        p_hour_ VARCHAR2,
        p_date_ VARCHAR2,
        p_must NUMBER,
        p_mustAccumulative NUMBER,
        p_is NUMBER,
        p_isAccumulative NUMBER,
        p_difference NUMBER,
        p_accumulativeDifference NUMBER,
        p_idCell NUMBER,
        p_idUser NUMBER
    ) AS BEGIN
INSERT INTO
    HourxHour (
        hour_,
        date_,
        must,
        mustAccumulative,
        is_,
        isAccumulative,
        difference,
        accumulativeDifference,
        idCell,
        idUser
    )
VALUES
    (
        p_hour_,
        p_date_,
        p_must,
        p_mustAccumulative,
        p_is,
        p_isAccumulative,
        p_difference,
        p_accumulativeDifference,
        p_idCell,
        p_idUser
    );

COMMIT;

EXCEPTION -- En caso de error, deshacer la transacción y relanzar la excepción
WHEN OTHERS THEN ROLLBACK;

RAISE;

END InsertHourxHour;

CREATE
OR REPLACE PROCEDURE UpdateHourxHour(
    p_idHourXHour_ NUMBER,
    p_hour_ VARCHAR2,
    p_date_ VARCHAR2,
    p_must NUMBER,
    p_mustAccumulative NUMBER,
    p_is_ NUMBER,
    p_isAccumulative NUMBER,
    p_difference NUMBER,
    p_accumulativeDifference NUMBER,
    p_idCell NUMBER,
    p_idUser NUMBER
) AS BEGIN
UPDATE
    HourxHour
SET
    hour_ = p_hour_,
    date_ = p_date_,
    must = p_must,
    mustAccumulative = p_mustAccumulative,
    is_ = p_is_,
    isAccumulative = p_isAccumulative,
    difference = p_difference,
    accumulativeDifference = p_accumulativeDifference,
    idCell = p_idCell,
    idUser = p_idUser
WHERE
    idHourXHour = p_idHourXHour_;

COMMIT;

EXCEPTION -- En caso de error, deshacer la transacción y relanzar la excepción
WHEN OTHERS THEN ROLLBACK;

RAISE;

END UpdateHourxHour;

--Añadir el campo de isDelete a Cell
ALTER TABLE
    Cell
ADD
    isDelete NUMBER(1, 0) DEFAULT 0;

/*
 Opdate cell sp
 */
CREATE
OR REPLACE PROCEDURE UPDATECELL(
    p_idCell IN NUMBER,
    p_cellName IN VARCHAR2,
    p_idUser IN NUMBER,
    p_idLine IN NUMBER
) AS BEGIN
UPDATE
    Cell
SET
    cellName = p_cellName,
    idUser = p_idUser,
    idLine = p_idLine
WHERE
    idCell = p_idCell;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END UPDATECELL;

/*
 Delete cell sp
 */
CREATE
OR REPLACE PROCEDURE DELETECELL(p_idCell IN NUMBER) AS BEGIN
UPDATE
    Cell
SET
    isDelete = 1
WHERE
    idCell = p_idCell;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END DELETECELL;

/*
 Tabla Object Indicators
 */
CREATE TABLE OBJECTIVES_INDICATORS (
    idObjectivesIndicators NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    idUser NUMBER,
    security_MUST NUMBER,
    productionVolume_MUST NUMBER,
    issuesB_MUST NUMBER,
    issuesC1_MUST NUMBER,
    damagedMaterial_MUST NUMBER CONSTRAINT pk_idObjectivesIndicators PRIMARY KEY (idObjectivesIndicators)
);

/*
 SP INSERT OBJECTIVES INDICATORS
 */
CREATE
OR REPLACE PROCEDURE INSERT_OBJECTIVES_INDICATOR (
    p_idUser IN NUMBER,
    p_security_MUST IN NUMBER,
    p_productionVolume_MUST IN NUMBER,
    p_issuesB_MUST IN NUMBER,
    p_issuesC1_MUST IN NUMBER,
    p_damagedMaterial_MUST IN NUMBER
) AS BEGIN
INSERT INTO
    OBJECTIVES_INDICATORS (
        idUser,
        security_MUST,
        productionVolume_MUST,
        issuesB_MUST,
        issuesC1_MUST,
        damagedMaterial_MUST
    )
VALUES
    (
        p_idUser,
        p_security_MUST,
        p_productionVolume_MUST,
        p_issuesB_MUST,
        p_issuesC1_MUST,
        p_damagedMaterial_MUST
    );

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END INSERT_OBJECTIVES_INDICATOR;

/*
 SP UPDATE OBJECTIVES INDICATORS
 */
CREATE
OR REPLACE PROCEDURE UPDATE_OBJECTIVES_INDICATOR (
    p_idObjectivesIndicators IN NUMBER,
    p_idUser IN NUMBER,
    p_security_MUST IN NUMBER,
    p_productionVolume_MUST IN NUMBER,
    p_issuesB_MUST IN NUMBER,
    p_issuesC1_MUST IN NUMBER,
    p_damagedMaterial_MUST IN NUMBER
) AS BEGIN
UPDATE
    OBJECTIVES_INDICATORS
SET
    idUser = p_idUser,
    security_MUST = p_security_MUST,
    productionVolume_MUST = p_productionVolume_MUST,
    issuesB_MUST = p_issuesB_MUST,
    issuesC1_MUST = p_issuesC1_MUST,
    damagedMaterial_MUST = p_damagedMaterial_MUST
WHERE
    idObjectivesIndicators = p_idObjectivesIndicators;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

WHEN OTHERS THEN ROLLBACK;

RAISE;

END UPDATE_OBJECTIVES_INDICATOR;

/* Create Table Line */
CREATE TABLE LINE (
    idLine NUMBER GENERATED ALWAYS AS IDENTITY,
    lineName VARCHAR2(50),
    isDelete NUMBER(1, 0) DEFAULT 0,
    CONSTRAINT pk_idLineVW PRIMARY KEY (idLine)
);

/*
 SP INSERT LINE
 */
CREATE
OR REPLACE PROCEDURE ADDLINE (lineName IN VARCHAR2) AS BEGIN
INSERT INTO
    LINE (lineName)
VALUES
    (lineName);

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END ADDLINE;

/*
 SP UPDATE LINE
 */
CREATE
OR REPLACE PROCEDURE PROCEDURE UPDATELINE (
    p_idLine IN NUMBER,
    p_lineName IN VARCHAR2
) AS BEGIN
UPDATE
    LINE
SET
    lineName = p_lineName
WHERE
    idLine = p_idLine;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END UPDATELINE;

/*
 SP DELETE LINE
 */
CREATE
OR REPLACE PROCEDURE DELETELINE(p_idLine IN NUMBER) AS BEGIN
UPDATE
    LINE
SET
    isDelete = 1
WHERE
    idLine = p_idLine;

COMMIT;

EXCEPTION
WHEN OTHERS THEN ROLLBACK;

RAISE;

END DELETELINE;

CREATE VIEW USERSFM AS
SELECT
    uv.idUser,
    uv.name_,
    uv.lastNames,
    uv.controlNumber,
    uv.imageUrl,
    uv.password_,
    r.name AS rol,
    uv.token AS access_token
FROM
    UserVW uv
    INNER JOIN Role r ON uv.idRole = r.idRole;

FROM
    UserVW uv
    INNER JOIN Role r ON uv.idRole = r.idRole;

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
INNER JOIN Role r ON uv.idRole = r.idRole;

create or replace PROCEDURE DELETEUSER(
    p_controlNumber IN NUMBER
) AS
BEGIN
    UPDATE UserVW
    SET
        isDelete = 1
    WHERE controlnumber = p_controlNumber;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END DELETEUSER;

DROP VIEW USERSFM

CREATE VIEW USERSFM AS
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
INNER JOIN Role r ON uv.idRole = r.idRole;


CREATE TABLE OPERATION (
    idOperation NUMBER GENERATED ALWAYS AS IDENTITY,
    idCell NUMBER,
    name_ VARCHAR2(255),
    CONSTRAINT pk_idOperation PRIMARY KEY (idOperation)
);


CREATE TABLE OPERATION (
    idOperation NUMBER GENERATED ALWAYS AS IDENTITY,
    idCell NUMBER,
    name_ VARCHAR2(255),
    CONSTRAINT pk_idOperation PRIMARY KEY (idOperation)
);
