export class HourXHourModel {
  idHourxHour?: number;
  hour: string;
  date: string;
  must: number;
  mustAccumulative: number;
  is: number;
  isAccumulative: number;
  difference: number;
  accumulativeDifference: number;
  idCell: number;
  idUser: number;
  idAreas: number;
  idOperation: number;
  downtime: number;

  constructor(
    hour: string,
    date: string,
    must: number,
    mustAccumulative: number,
    is: number,
    isAccumulative: number,
    difference: number,
    accumulativeDifference: number,
    idUser: number,
    idCell: number,
    idAreas: number,
    idOperation: number,
    downtime: number,
    idHourxHour?: number
  ) {
    this.hour = hour;
    this.date = date;
    this.must = must;
    this.mustAccumulative = mustAccumulative;
    this.is = is;
    this.isAccumulative = isAccumulative;
    this.difference = difference;
    this.accumulativeDifference = accumulativeDifference;
    this.idCell = idCell;
    this.idUser = idUser;
    this.idAreas = idAreas;
    this.idOperation = idOperation;
    this.downtime = downtime;
    this.idHourxHour = idHourxHour;
  }
}
