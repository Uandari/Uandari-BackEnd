export interface HourXHourModel {
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
}
