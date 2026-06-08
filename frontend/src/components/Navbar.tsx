export function Navbar() {
  return (
    <header className="w-full bg-white shadow-xs border-b border-slate-200">
      {/* 1. Barra superior pequeña (Información de contacto) */}
      <div className="bg-slate-50 border-b border-slate-100 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex justify-between items-center">
        <div className="flex items-center gap-2 font-medium">
          <span>Guatemala</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <span>+502 2474-9300</span>
        </div>
      </div>

      {/* 2. Barra de Navegación Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logotipo Estilizado imitando la marca */}
        <div className="flex items-center gap-2 select-none">
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-disagro-green m-0 leading-none">
              DISAGRO
            </span>
            <span className="text-[9px] font-bold tracking-widest text-slate-400 text-right uppercase leading-none mt-0.5">
              Catálogo
            </span>
          </div>
        </div>

        {/* Links de Navegación*/}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-disagro-text">
          <span className="text-disagro-green cursor-pointer border-b-2 border-disagro-green pb-1">
            Inventario
          </span>
        </nav>
      </div>
    </header>
  );
}