export class HourXHour {
  idHourxHour?: number;
  hour: string;
  date: string;
  must: number;
  mustAcomulative: number;
  is: number;
  isAcomulative: number;
  diference: number;
  diferenceAcomulative: number;
  idCell: number;
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
    idCell: number,
    idHourxHour?: number
  ) {
    this.hour = hour;
    this.date = date;
    this.must = must;
    this.mustAcomulative = mustAcomulative;
    this.is = is;
    this.isAcomulative = isAcomulative;
    this.diference = diference;
    this.diferenceAcomulative = diferenceAcomulative;
    this.idCell = idCell;
    this.idUser = idUser;
    this.idHourxHour = idHourxHour;
  }
}
