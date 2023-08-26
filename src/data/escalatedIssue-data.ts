import { OracleHelper } from "../handlers/OracleHelper";
import { EscalatedIssuesModel } from "../common/entities/EscalatedIssuesModel";
import { ResultVW } from "../common/api-interfaces/result";
import { ESCALATEDISSUES_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Get all Escalated Issues using Oracle Procedures
export async function getEscalatedIssuesOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = `${ESCALATEDISSUES_PROCEDURES.GET_ESCALATEDISSUES}`;
        const result = await db.execute(query);
        if (!result.rows) {
            throw new Error("Query result rows are undefined")
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
                "There are no Escalated Issues to show",
                StatusCodes.NO_CONTENT,
                EscalatedIssues
            );
        }
        return new ResultVW("Escalated Issues Found", StatusCodes.OK, EscalatedIssues);
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
            "Escalated Issue added",
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