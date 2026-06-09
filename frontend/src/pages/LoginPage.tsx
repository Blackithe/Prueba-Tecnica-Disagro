import React, { useState } from 'react';
import { authService } from '../services/auth.service';

interface LoginPageProps {
  onLoginExitoso: () => void;
  onInvitadoClick: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginExitoso, onInvitadoClick }) => {
  const [usuario, setUsuario] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario || !password) {
      setError('Por favor, ingresa tu usuario y contraseña corporativa.');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      
      // Petición real al Backend de Express
      await authService.login(usuario, password);
      onLoginExitoso();
    } catch (err: any) {
      setError(err.message || 'Credenciales incorrectas. Verifica tus datos de acceso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white rounded-lg border border-slate-200 p-8 shadow-xs animate-fadeIn">
      {/* Logotipo */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
          Control de Catálogo
        </h2>
        <p className="mt-2 text-xs font-medium text-slate-500 max-w-xs mx-auto">
          Ingresa al sistema de gestión de inventarios o navega en modo de lectura.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs font-bold text-rose-800 animate-shake">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">
            Usuario
          </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-disagro-green focus:outline-hidden transition-colors disabled:bg-slate-50"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-disagro-green focus:outline-hidden transition-colors disabled:bg-slate-50"
          />
        </div>

        {/* Botón de Acceso Principal */}
        <button
          type="submit"
          disabled={loading}
          className="w-full justify-center rounded-md bg-disagro-green px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer flex items-center justify-center disabled:bg-emerald-800"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Verificando firma...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        {/* Separador Visual */}
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ó</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Botón de Acceso como Invitado */}
        <button
          type="button"
          onClick={onInvitadoClick}
          disabled={loading}
          className="w-full justify-center rounded-md border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center disabled:opacity-50"
        >
          Entrar como Invitado (Lectura)
        </button>
      </form>
    </div>
  );
};