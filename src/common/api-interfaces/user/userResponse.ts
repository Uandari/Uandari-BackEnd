export interface userResponse {
    idUser: number;
    name: string;
    lastNames: string;
    controlNumber: string;
    password?: string;
    role: string;
    accessToken?: string;
}