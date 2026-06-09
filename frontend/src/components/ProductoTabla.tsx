import type { IProducto } from '../models/producto.interface';

interface ProductoTablaProps {
  productos: IProducto[];
  onEditar: (producto: IProducto) => void;
  onEliminar: (codigo: string) => void;
  isLoggedIn: boolean;
}

export function ProductoTabla({ productos, onEditar, onEliminar, isLoggedIn }: ProductoTablaProps) {
  return (
    <div className="overflow-x-auto max-h-[450px] overflow-y-auto rounded-lg border border-slate-200 shadow-sm relative">
      <table className="w-full text-left border-collapse bg-white text-sm text-slate-600">
        {/* Encabezado de la Tabla */}
        <thead className="sticky top-0 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-700 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4">Código</th>
            <th className="px-6 py-4">Nombre / Descripción</th>
            <th className="px-6 py-4">Precio</th>
            <th className="px-6 py-4">Categorías</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>

        {/* Cuerpo de la Tabla */}
        <tbody className="divide-y divide-slate-100">
          {productos.map((producto) => (
            <tr key={producto.Id || producto.Codigo} className="hover:bg-slate-50/75 transition-colors">
              {/* Código */}
              <td className="px-6 py-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                {producto.Codigo}
              </td>
              
              {/* Nombre y Descripción */}
              <td className="px-6 py-4 max-w-md">
                <div className="font-semibold text-slate-900">{producto.Nombre}</div>
                <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {producto.Descripcion || 'Sin descripción'}
                </div>
              </td>
              
              {/* Precio*/}
              <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                Q {producto.Precio.toFixed(2)}
              </td>
              
              {/* Categorías transformadas en Tags de Tailwind */}
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {producto.Categorias.split(',').map((cat, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/10 ring-inset"
                    >
                      {cat.trim()}
                    </span>
                  ))}
                </div>
              </td>
              
              {/* Botones de Operación */}
              <td className="px-6 py-4 text-right whitespace-nowrap font-medium">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEditar(producto)}
                    disabled={!isLoggedIn}
                    className={isLoggedIn
                      ? "text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      : "text-slate-400 bg-slate-100 px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-not-allowed select-none"
                    }
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onEliminar(producto.Codigo)}
                    disabled={!isLoggedIn}
                    className={isLoggedIn
                      ? "text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                      : "text-slate-400 bg-slate-100 px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-not-allowed select-none"
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}