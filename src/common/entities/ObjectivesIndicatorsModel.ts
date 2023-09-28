export class ObjectivesIndicatorsModel{
    idObjectivesIndicators?: number;
    security_MUST: number;
    productionVolume_MUST: number;
    issuesB_MUST: number;
    issuesC1_MUST: number;
    damagedMaterial_MUST: number;
    idUser: number;
    isDelete?: number;
    constructor(
        security_MUST: number,
        productionVolume_MUST: number,
        issuesB_MUST: number,
        issuesC1_MUST: number,
        damagedMaterial_MUST: number,
        idUser: number,
        idObjectivesIndicators?: number,
        isDelete?: number
        ){
        this.idObjectivesIndicators = idObjectivesIndicators;
        this.security_MUST = security_MUST;
        this.productionVolume_MUST = productionVolume_MUST;
        this.issuesB_MUST = issuesB_MUST;
        this.issuesC1_MUST = issuesC1_MUST;
        this.damagedMaterial_MUST = damagedMaterial_MUST;
        this.idUser = idUser;
        this.isDelete = isDelete;
    }
}