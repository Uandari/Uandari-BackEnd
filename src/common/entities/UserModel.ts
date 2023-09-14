export interface UserModel {
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
}


