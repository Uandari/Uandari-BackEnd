export class HourXHour {
  idHourXHour?: number;
  hour: string;
  date: string;
  must: number;
  mustAcomulative: number;
  is: number;
  isAcomulative: number;
  diference: number;
  diferenceAcomulative: number;
  idCelula: number;
  idUser: number;

  constructor(
    hour: string,
    date: string,
    must: number,
    mustAcomulative: number,
    is: number,
    isAcomulative: number,
    diference: number,
    diferenceAcomulative: number,
    idUser: number,
    idCelula: number,
    idHourXHour?: number
  ) {
    this.hour = hour;
    this.date = date;
    this.must = must;
    this.mustAcomulative = mustAcomulative;
    this.is = is;
    this.isAcomulative = isAcomulative;
    this.diference = diference;
    this.diferenceAcomulative = diferenceAcomulative;
    this.idCelula = idCelula;
    this.idUser = idUser;
    this.idHourXHour = idHourXHour;
  }
}

