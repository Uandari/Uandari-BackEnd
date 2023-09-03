import { OracleHelper } from '../handlers/OracleHelper';
import { EscalatedIssuesModel } from '../common/entities/EscalatedIssuesModel';
import { ResultVW } from '../common/api-interfaces/result';
import { ESCALATEDISSUES_PROCEDURES } from '../common/enums/stored-procedures';
import { StatusCodes } from '../common/enums/enums';

//Get all Escalated Issues using Oracle Procedures
export async function getEscalatedIssuesOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = `${ESCALATEDISSUES_PROCEDURES.GET_ESCALATEDISSUES}`;
        const result = await db.execute(query);
        if (!result.rows) {
            throw new Error('Query result rows are undefined')
        }
        const EscalatedIssues: EscalatedIssuesModel[] = result.rows.map((EscalatedIssue: any) => ({
            idIssueScaled: EscalatedIssue[0],
            dateScaling: EscalatedIssue[1],
            scaleDeviation: EscalatedIssue[2],
            impeller: EscalatedIssue[3],
            affect5s: EscalatedIssue[4],
            agreedAction: EscalatedIssue[5],
            idUser: EscalatedIssue[6],
            status: EscalatedIssue[7],
            deadline: EscalatedIssue[8],
            idIssue: EscalatedIssue[9]
        }));
        if (EscalatedIssues.length === 0) {
            return new ResultVW(
                'There are no Escalated Issues to show',
                StatusCodes.NO_CONTENT,
                EscalatedIssues
            );
        }
        return new ResultVW('Escalated Issues Found', StatusCodes.OK, EscalatedIssues);
    } catch (error) {
        throw error;
    } finally {
        db.close();
    }
};

//Add a new Escalated Issue using Oracle Procedure
export async function insertEscalatedIssueOracle(escalatedIssue: EscalatedIssuesModel): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const {
            dateScaling,
            scaleDeviation,
            impeller,
            agreedAction,
            idUser,
            status,
            deadline,
            idIssue,
        } = escalatedIssue;
        const query = `BEGIN
        ${ESCALATEDISSUES_PROCEDURES.INSERT_ESCALATEDISSUE}(
            '${dateScaling}',
            ${scaleDeviation},
            '${impeller}',
            '${agreedAction}',
            ${idUser},
            ${status},
            '${deadline}',
            ${idIssue}
        );
        END;`;
        console.log(query);
        await db.execute(query);
        const escalatedIssueResult: ResultVW = new ResultVW(
            'Escalated Issue added',
            StatusCodes.OK,
            escalatedIssue
        );
        return escalatedIssueResult;
    } catch (error) {
        throw error;
    } finally {
        db.close();
    }
}

//Verify if Escalated Issue exist
export async function verifyIssueScaled(idIssueScaled: number): Promise<boolean> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = `${ESCALATEDISSUES_PROCEDURES.GETBYID}(${idIssueScaled})`;
        const result: any = await db.execute(query);
        return result.rows && result.rows.length > 0;
    } catch (error) {
        throw error;
    }
}

//Get a Escalated Issue by Id using Oracle Procedure
export async function getEscalatedIssueByIdOracle(idIssueScaled: number): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        if (!await verifyIssueScaled(idIssueScaled)) {
            return new ResultVW('Escalated Issue not found', StatusCodes.NOT_FOUND, []);
        }
        const query = `${ESCALATEDISSUES_PROCEDURES.GETBYID}(${idIssueScaled})`;
        const result: any = await db.execute(query);
        const escalatedIssue: EscalatedIssuesModel[] = result.rows.map((row: any) => ({
            idIssueScaled: row[0],
            dateScaling: row[1],
            scaleDeviation: row[2],
            impeller: row[3],
            affect5s: row[4],
            agreedAction: row[5],
            idUser: row[6],
            status: row[7],
            deadline: row[8],
            idIssue: row[9]
        }));
        const escalatedIssueResult: ResultVW = new ResultVW(
            'Escalated Issue found',
            StatusCodes.OK,
            escalatedIssue
        );
        return escalatedIssueResult;
    } catch (error) {
        throw error;
    }
}

//Update a Escalated Issue using Oracle Procedure
export async function updateEscalatedIssueOracle(escalatedIssue: EscalatedIssuesModel): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const {
            idIssueScaled,
            dateScaling,
            scaleDeviation,
            impeller,
            affect5s,
            agreedAction,
            idUser,
            status,
            deadline,
            idIssue,
        } = escalatedIssue;
        const query = `BEGIN
        ${ESCALATEDISSUES_PROCEDURES.UPDATE_ESCALATEDISSUE}(
            ${idIssueScaled},
            '${dateScaling}',
            ${scaleDeviation},
            '${impeller}',
            ${affect5s},
            '${agreedAction}',
            ${idUser},
            ${status},
            '${deadline}',
            ${idIssue}
        );
        END;`;
        await db.execute(query);
        let escalatedIssueResult: ResultVW;

        if (typeof idIssueScaled === 'number'){
            escalatedIssueResult = await getEscalatedIssueByIdOracle(idIssueScaled);
            if (escalatedIssueResult.vw.length === 0){
                return new ResultVW('Escalated Issue not found', StatusCodes.NOT_FOUND, escalatedIssueResult.vw);
            }
            return new ResultVW('Escalated Issue updated', StatusCodes.OK, escalatedIssueResult.vw);
        }
        return new ResultVW('Something went wrong ', StatusCodes.NOT_FOUND, []);
    }
    catch (error) {
        throw error;
    }
}