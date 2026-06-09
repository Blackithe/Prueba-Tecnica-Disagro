import { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getConnection, mssql } from '../config/db';

//POST /login
export const authController = {
   login: async (req: Request, res: Response) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
        return;
    }

    try {   
        const pool = await getConnection();
        const result = await pool.request()
            .input('Usuario', mssql.VarChar(50), usuario)
            .query('SELECT * FROM Usuarios WHERE Usuario = @Usuario');
        const user = result.recordset[0];
        if (!user) {
            res.status(401).json({ error: 'Credenciales incorrectas' });
            return;
        }

        const passwordCorrecto = await bcrypt.compare(password, user.Password);
        if (!passwordCorrecto) {
            res.status(401).json({ error: 'Credenciales incorrectas' });
            return;
        }
        

        const tokenPayload = { id: user.Id, usuario: user.Usuario, nombre: user.Nombre };
        const secretKey = process.env.JWT_SECRET || 'ContrasenaMasterPrivadaPruebaTecnicaDisagro2026';
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '2h' });

        return res.json({
            mensaje: 'Autenticación exitosa',
            token,
            usuario: {
                nombre: user.Nombre,
                login: user.Usuario
            }
        });
    } catch (error) {
        console.error('Error en el proceso de autenticación:', error);
        res.status(500).json({ error: 'Error en el proceso de autenticación' });    
        }

    }
}