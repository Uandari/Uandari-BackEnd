export interface userResponse {
    idUser: number;
    name: string;
    lastNames: string;
    controlNumber: string;
    imageUrl: string;
    password?: string;
    role: string;
    accessToken?: string;
}