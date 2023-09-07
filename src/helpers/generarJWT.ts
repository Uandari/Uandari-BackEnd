import jwt, { Secret } from "jsonwebtoken";
const generarJWT = (id: any) => {
    const secret: Secret = process.env.JWT_SECRET || "";
    return jwt.sign({ id: id }, secret, {
        expiresIn: "30d",
    });
};
export default generarJWT;
