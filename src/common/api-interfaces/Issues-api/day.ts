export interface Day {
    day: string;
    shifts: {
        [shift: string]: number[];
        A: number[];
        B: number[];
        C: number[];
    };
}