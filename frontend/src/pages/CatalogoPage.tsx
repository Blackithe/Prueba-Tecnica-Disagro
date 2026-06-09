import { useEffect, useState } from 'react';
import { productoService } from '../services/producto.service';
import { ProductoTabla } from '../components/ProductoTabla';
import { ProductoForm } from '../components/ProductoForm';
import type { IProducto } from '../models/producto.interface';

interface CatalogoPageProps {
  isLoggedIn: boolean;
}

export function CatalogoPage({ isLoggedIn }: CatalogoPageProps) {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [productoEditando, setProductoEditando] = useState<IProducto | null>(null);
  const [busqueda, setBusqueda] = useState<string>('');

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productoService.obtenerListado(); 
      setProductos(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con el servidor de datos de inventario.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleGuardar = async (producto: IProducto) => {
    try {
      if (productoEditando) {
        await productoService.modificarProducto(producto);
      } else {
        await productoService.crearProducto(producto);
      }
      setMostrarFormulario(false);
      setProductoEditando(null);
      await cargarProductos();
    } catch (err: any) {
      alert(err.message || 'Ocurrió un error al guardar.');
      throw err;
    }
  };

  const handleEditarClick = (producto: IProducto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
  };

  const handleEliminar = async (codigo: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${codigo}?`)) {
      try {
        await productoService.eliminarProducto(codigo);
        await cargarProductos();
      } catch (err: any) {
        alert(err.message || 'Error al eliminar.');
      }
    }
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.Codigo.toLowerCase().includes(busqueda.toLowerCase())
  ).sort((a, b) => a.Codigo.localeCompare(b.Codigo));

  return (
    <>
      {/* Encabezado del Tablero */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
            Control de Catálogo
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Consola de administración interna para actualización de productos agrícolas y nutrientes.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          {!mostrarFormulario && (
            <button 
              onClick={() => { setProductoEditando(null); setMostrarFormulario(true); }}
              disabled={!isLoggedIn}
              className={isLoggedIn
                ? "inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-emerald-500 transition-colors cursor-pointer"
                : "inline-flex items-center justify-center rounded-md bg-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 shadow-none cursor-not-allowed select-none"
              }
            >
              Agregar Producto
            </button>
          )}
        </div>
      </div>

      {mostrarFormulario && (
        <ProductoForm 
          productoEditando={productoEditando}
          onGuardar={handleGuardar}
          onCancelar={handleCancelarFormulario}
        />
      )}

      <div className="mb-6 max-w-md animate-fadeIn">
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">
          Buscar por Código de Producto
        </label>
        <input
          type="text"
          placeholder="Escribe las letras del código... (Ej: FERT)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-hidden transition-colors"
        />
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-7 w-7 border-4 border-slate-200 border-t-emerald-600 mb-3"></div>
          <p className="text-slate-500 text-xs font-semibold tracking-wide uppercase">Consultando SQL Server...</p>
        </div>
      ) : error ? (
        <div className="rounded-md bg-rose-50 p-4 border border-rose-200 text-center shadow-xs">
          <p className="text-sm font-semibold text-rose-800">{error}</p>
          <button 
            onClick={cargarProductos}
            className="mt-3 text-xs bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold px-3 py-1.5 rounded-md transition-colors"
          >
            Reintentar conexión
          </button>
        </div>
      ) : productos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300 p-6 shadow-xs">
          <p className="text-sm font-medium text-slate-400">No existen registros de inventario disponibles.</p>
        </div>
      ) : (
        <ProductoTabla 
          productos={productosFiltrados} 
          onEditar={handleEditarClick} 
          onEliminar={handleEliminar} 
          isLoggedIn={isLoggedIn} 
        />
      )}
    </>
  );
}