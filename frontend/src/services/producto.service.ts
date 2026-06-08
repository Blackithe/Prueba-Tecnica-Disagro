import type { IProducto } from "../types/producto.interface";

const API_URL = 'http://localhost:4000';

export const productoService = {
    //GET /listado
    obtenerListado: async (): Promise<IProducto[]> => {
        const response = await fetch(`${API_URL}/listado`);
        if (!response.ok) throw new Error('Error al obtener el listado de productos');
        return response.json();
    },
    //GET /producto?codigo=XXX
    obtenerPorCodigo: async (codigo: string): Promise<IProducto> => {
        const response = await fetch(`${API_URL}/producto?codigo=${codigo}`);
        if (!response.ok) throw new Error('Producto no encontrado');
        return response.json();
    },
    //POST /crear
    crearProducto: async (producto: IProducto): Promise<{ mensaje: string }> => {
        const response = await fetch(`${API_URL}/crear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear el producto');
        }
        return response.json();
    },
    //PUT /actualizar
    modificarProducto: async (producto: IProducto): Promise<{ mensaje: string }> => {
        const response = await fetch(`${API_URL}/modificar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al modificar el producto');
        }
        return response.json();
    },
    //DELETE /eliminar?codigo=XXX
    eliminarProducto: async (codigo: string): Promise<{ mensaje: string }> => {
        const response = await fetch(`${API_URL}/eliminar?codigo=${codigo}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar el producto');
        }
        return response.json();
    }
}