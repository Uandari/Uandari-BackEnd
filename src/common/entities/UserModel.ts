export class UserModel {
  idUser?: number;
  name: string;
  lastNames: string;
  controlNumber: string;
  mail: string;
  password: string;
  idRole?: number;
  verifiedAccount?: number;
  token?: string;
  imageUrl?: string;
  isDeleted?: number;

  //General constructor
  constructor(
    name: string,
    lastNames: string,
    controlNumber: string,
    mail: string,
    password: string,
    idRole: number,
    token: string,
    imageUrl?: string,
    idUser?: number,
    isDelete?: number
  ) {
    this.name = name;
    this.lastNames = lastNames;
    this.controlNumber = controlNumber;
    this.mail = mail;
    this.password = password;
    this.idRole = idRole;
    this.token = token;
    this.imageUrl = imageUrl;
    this.idUser = idUser;
    this.isDeleted = isDelete;
  }
}
