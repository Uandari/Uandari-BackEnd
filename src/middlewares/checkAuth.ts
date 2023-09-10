import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { findByNoControl } from "../data/user-data"; // Asegúrate de importar el modelo de usuario adecuado para Oracle

// Define una interfaz personalizada que extienda la interfaz 'Request'
interface CustomRequest extends Request {
  usuario?: any; // Puedes especificar el tipo adecuado para 'usuario' según tu modelo de datos
}

const checkAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const secret: Secret = process.env.JWT_SECRET || "";
      const decoded: any = jwt.verify(token, secret);
      const user = await findByNoControl(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      req.usuario = user;
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
