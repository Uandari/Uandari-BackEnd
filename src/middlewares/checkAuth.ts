import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
  let token;
  let secret: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret || token);
      console.log(decoded);
      return next();
    } catch (error) {
      return res.status(404).json({ mensaje: "Hubo un error" });
    }
  }
  if (!token) {
    const error = new Error("Token no valido");
    return res.status(401).json({ msg: error.message });
  }
  next();
};
export default checkAuth;
