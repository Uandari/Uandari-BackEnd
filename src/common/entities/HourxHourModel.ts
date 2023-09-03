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
    this.idHourxHour = idHourxHour;
  }
}
