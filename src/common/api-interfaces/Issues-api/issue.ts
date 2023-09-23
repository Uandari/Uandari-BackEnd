import { Day } from "./day";
export interface Issue {
    typeCategory: string;
    description: string;
    carName: string;
    days: Day[];
}