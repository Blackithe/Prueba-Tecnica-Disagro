export function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-xs py-6 mt-12 border-t-4 border-disagro-green">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-extrabold text-white tracking-wider text-sm">
            DISAGRO<span className="text-disagro-green">.</span>
          </span>
          <p className="mt-1 text-slate-500">
            &copy; {anioActual} DISAGRO. Todos los derechos reservados. Prueba Técnica de Desarrollo.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-slate-500">
          <span>Módulo de Control de Catálogo v1.0</span>
        </div>
      </div>
    </footer>
  );
}