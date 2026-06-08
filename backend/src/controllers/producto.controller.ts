import {Request, Response} from 'express';
import { getConnection, mssql } from '../config/db';
import { IProducto } from '../models/producto.interface';

//GET /listado
export const obtenerListado = async (req : Request, res : Response) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Productos ORDER BY CreadoEn DESC');

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener el listado de productos:', error);
        res.status(500).json({ message: 'Error al obtener el listado de productos' });
    }
}

//GET /producto

export const obtenerProducto = async (req : Request, res : Response) => {
    try {
    const { codigo } = req.query;

    if (!codigo) {
        res.status(400).json({ error: 'El código del producto es requerido' });
        return;
    }

    const pool = await getConnection();
    const result = await pool.request()
        .input('Codigo', mssql.VarChar, codigo)
        .query('SELECT * FROM Productos WHERE Codigo = @Codigo');

    if (result.recordset.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }

    res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
}

//POST /crear
export const crearProducto = async (req : Request, res : Response) => {
    try {
        const { Codigo, Nombre, Descripcion, Precio, Categorias }: IProducto = req.body;
        if (!Codigo || !Nombre  || Precio === undefined || !Categorias) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
            return;
        }

        if (Precio < 0) {
            res.status(400).json({ error: 'El precio no puede ser negativo' });
            return;
        }

        const pool = await getConnection();
        const existe = await pool.request()
            .input('CheckCodigo', mssql.VarChar, Codigo)
            .query('SELECT Id FROM Productos WHERE Codigo = @CheckCodigo');

        if (existe.recordset.length > 0) {
            res.status(400).json({ error: 'El código del producto ya existe' });
            return;
        }

        await pool.request()
            .input('Codigo', mssql.VarChar, Codigo)
            .input('Nombre', mssql.VarChar, Nombre)
            .input('Descripcion', mssql.VarChar, Descripcion)
            .input('Precio', mssql.Decimal(10, 2), Precio)
            .input('Categorias', mssql.VarChar, Categorias)
            .query(`
                INSERT INTO Productos (Codigo, Nombre, Descripcion, Precio, Categorias)
                VALUES (@Codigo, @Nombre, @Descripcion, @Precio, @Categorias)
            `);
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
}

// PUT /modificar
export const modificarProducto = async (req : Request, res : Response) => {
    try {
        const { Codigo, Nombre, Descripcion, Precio, Categorias }: IProducto = req.body;
        if (!Codigo || !Nombre  || Precio === undefined || !Categorias) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
            return;
        }

        if (Precio < 0) {
            res.status(400).json({ error: 'El precio no puede ser negativo' });
            return;
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('Codigo', mssql.VarChar, Codigo)
            .input('Nombre', mssql.VarChar, Nombre)
            .input('Descripcion', mssql.VarChar, Descripcion)
            .input('Precio', mssql.Decimal(10, 2), Precio)
            .input('Categorias', mssql.VarChar, Categorias)
            .query(`
                UPDATE Productos
                SET Nombre = @Nombre, Descripcion = @Descripcion, Precio = @Precio, Categorias = @Categorias
                WHERE Codigo = @Codigo
            `);
    
        if (result.rowsAffected[0] === 0) {
            res.status(404).json({ error: 'Producto no encontrado con el codigo brindado' });
            return;
        }
        res.status(200).json({ message: 'Producto modificado exitosamente' });        
    } catch (error) {
        console.error('Error al modificar el producto:', error);
        res.status(500).json({ message: 'Error al modificar el producto' });
    }
}

//DELETE /eliminar
export const eliminarProducto = async (req : Request, res : Response) => {
    try {
        const { codigo } = req.query;

        if (!codigo) {
            res.status(400).json({ error: 'El código del producto es requerido' });
            return;
        }
        const pool = await getConnection();
        const result = await pool.request()
            .input('Codigo', mssql.VarChar, codigo)
            .query('DELETE FROM Productos WHERE Codigo = @Codigo');
        if (result.rowsAffected[0] === 0) {
            res.status(404).json({ error: 'Producto no encontrado con el codigo brindado' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
}
