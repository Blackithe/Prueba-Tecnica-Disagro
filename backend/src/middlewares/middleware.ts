import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestAutenticado } from "../models/auth.interface";

export const verificarToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticación no proporcionado" });
  }
  try {
    const secretKey =
      process.env.JWT_SECRET ||
      "ContrasenaMasterPrivadaPruebaTecnicaDisagro2026";
    const datosDecodificados = jwt.verify(token, secretKey) as any;
    (req as RequestAutenticado).usuarioLogueado = {
      id: datosDecodificados.id,
      usuario: datosDecodificados.usuario,
      nombre: datosDecodificados.nombre,
    };
    return next();
  } catch (error) {
    return res.status(403).json({ error: "Token de autenticación inválido" });
  }
};
