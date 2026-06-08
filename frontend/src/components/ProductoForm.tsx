import { useState, useEffect } from 'react';
import type { IProducto } from '../types/producto.interface';

interface Props {
    productoEditando: IProducto | null;
    onGuardar: (producto: IProducto) => Promise<void>;
    onCancelar: () => void;
}

export function ProductoForm({ productoEditando, onGuardar, onCancelar }: Props) {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [categorias, setCategorias] = useState('');
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (productoEditando) {
            setCodigo(productoEditando.Codigo);
            setNombre(productoEditando.Nombre);
            setDescripcion(productoEditando.Descripcion || '');
            setPrecio(productoEditando.Precio);
            setCategorias(productoEditando.Categorias);
            
        }
    }, [productoEditando]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnviando(true);

        const producto: IProducto = {
            Codigo: codigo,
            Nombre: nombre,
            Descripcion: descripcion,
            Precio: precio,
            Categorias: categorias,
        };
        try {
            await onGuardar(producto);
        } catch (error) {

        }finally {
            setEnviando(false);
        }
    };

    return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-8 animate-fadeIn">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        {productoEditando ? 'Editar Producto' : 'Registrar Nuevo Producto'}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
        {/* Código */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Código de Producto</label>
          <input
            type="text"
            required
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            disabled={!!productoEditando} 
            placeholder="Ej: FERT-003"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400 transition-colors"
          />
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nombre Comercial</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Insecticida Ultra"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-hidden transition-colors"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Precio Unitario (Q)</label>
          <input
            type="number"
            step="0.01"
            required
            min="0"
            value={precio === 0 ? '' : precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            placeholder="0.00"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-hidden transition-colors"
          />
        </div>

        {/* Categorías */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Categorías (Separadas por comas)</label>
          <input
            type="text"
            required
            value={categorias}
            onChange={(e) => setCategorias(e.target.value)}
            placeholder="Ej: Agroquímicos, Herbicidas"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-hidden transition-colors"
          />
        </div>

        {/* Descripción */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Descripción Técnica</label>
          <textarea
            rows={2}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Detalles sobre el uso o composición del producto..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        {/* Botones de Acción */}
        <div className="sm:col-span-2 flex justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 shadow-xs hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:bg-emerald-400 transition-colors"
          >
            {enviando ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}