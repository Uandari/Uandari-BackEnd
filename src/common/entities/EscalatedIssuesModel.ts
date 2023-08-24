export class EscalatedIssuesModel{
    idProblemScaled?: number;
    dateScaling: string;
    scaleDeviation: number;
    impeller: string;
    affect5s: boolean;
    agreedAction: string;
    idUser: number;
    status: number;
    deadline: string;
    idIssue: number;
    constructor(
        dateScaling: string,
        scaleDeviation: number,
        impeller: string,
        affect5s: boolean,
        agreedAction: string,
        idUser: number,
        status: number,
        deadline: string,
        idIssue: number,
        idProblemScaled?: number,
    ){
        this.idProblemScaled = idProblemScaled;
        this.dateScaling = dateScaling;
        this.scaleDeviation = scaleDeviation;
        this.impeller = impeller;
        this.affect5s = affect5s;
        this.agreedAction = agreedAction;
        this.idUser = idUser;
        this.status = status;
        this.deadline = deadline;
        this.idIssue = idIssue;
    }
}