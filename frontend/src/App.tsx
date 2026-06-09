import { useState } from 'react';
import { authService } from './services/auth.service';
import { LoginPage } from './pages/LoginPage';
import { CatalogoPage } from './pages/CatalogoPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  const [token, setToken] = useState<string | null>(authService.obtenerToken());
  const [vistaActual, setVistaActual] = useState<'login' | 'catalogo'>(
    authService.obtenerToken() ? 'catalogo' : 'login'
  );

  const handleLoginExitoso = () => {
    setToken(authService.obtenerToken());
    setVistaActual('catalogo');
  };

  const handleEntrarComoInvitado = () => {
    authService.logout();
    setToken(null);
    setVistaActual('catalogo');
  };

  const handleLogout = () => {
    authService.logout();
    setToken(null);
    setVistaActual('login');
  };

  return (
    <div className="min-h-screen bg-disagro-bg flex flex-col justify-between text-disagro-text">
      <div>

        <Navbar 
          isLoggedIn={!!token} 
          onLogout={handleLogout} 
          onLoginClick={() => setVistaActual('login')}
          nombreUsuario={token ? (authService.obtenerNombreUsuario() || 'Admin') : 'Invitado'}
        />
        <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {vistaActual === 'login' ? (
            <LoginPage 
              onLoginExitoso={handleLoginExitoso} 
              onInvitadoClick={handleEntrarComoInvitado} 
            />
          ) : (
            <CatalogoPage isLoggedIn={!!token} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;