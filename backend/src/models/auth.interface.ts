import { Request } from 'express';

export interface RequestAutenticado extends Request {
  usuarioLogueado?: {
    id: number;
    usuario: string;
    nombre: string;
  };
}