export class UserModel {
  idUsuario?: number;
  nombre: string;
  apellidos: string;
  numeroControl: string;
  correo: string;
  contrasenia: string;
  idRol?: number;
  cuentaVerificada?: number;
  token?: string;
  urlImagen?: string;
  isDeleted?: number;

  //General constructor
  constructor(
    nombre: string,
    apellidos: string,
    numeroControl: string,
    correo: string,
    contrasenia: string,
    idRol: number,
    token: string,
    urlImagen?: string,
    idUsuario?: number,
    isDelete?: number
  ) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.numeroControl = numeroControl;
    this.correo = correo;
    this.contrasenia = contrasenia;
    this.idRol = idRol;
    this.token = token;
    this.urlImagen = urlImagen;
    this.idUsuario = idUsuario;
    this.isDeleted = isDelete;
  }
}
