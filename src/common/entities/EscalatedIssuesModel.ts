export class EscalatedIssuesModel {
    idIssueScaled?: number;
    dateScaling: string;
    scaleDeviation: number;
    impeller: string;
    affect5s?: boolean;
    agreedAction: string;
    idUser: number;
    status: number;
    deadline: string;
    idIssue: number;
    constructor(
        dateScaling: string,
        scaleDeviation: number,
        impeller: string,
        agreedAction: string,
        idUser: number,
        status: number,
        deadline: string,
        idIssue: number,
        affect5s?: boolean,
        idIssueScaled?: number,
    ) {
        this.idIssueScaled = idIssueScaled;
        this.dateScaling = dateScaling;
        this.scaleDeviation = scaleDeviation;
        this.impeller = impeller;
        this.agreedAction = agreedAction;
        this.idUser = idUser;
        this.status = status;
        this.deadline = deadline;
        this.affect5s = affect5s;
        this.idIssue = idIssue;
    }
}