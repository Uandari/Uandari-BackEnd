export class IssueModel {
  idIssue?: number;
  idHourXHour: number;
  idCategory: number;
  idType: number;
  enginesAffected: number;
  description_: string;
  date_: string;
  estimateDate: string;
  status: string;
  shift: string;
  isDelete?: number;
  idUser: number;
  constructor(
    idHourXHour: number,
    idCategory: number,
    idType: number,
    enginesAffected: number,
    description_: string,
    date_: string,
    estimateDate: string,
    status: string,
    shift: string,
    idUser: number,
    isDelete?: number,
    idIssue?: number
  ) {
    this.idHourXHour = idHourXHour;
    this.idCategory = idCategory;
    this.idType = idType;
    this.enginesAffected = enginesAffected;
    this.description_ = description_;
    this.date_ = date_;
    this.estimateDate = estimateDate;
    this.status = status;
    this.shift = shift;
    this.idUser = idUser;
    this.isDelete = isDelete;
    this.idIssue = idIssue;
  }
}
