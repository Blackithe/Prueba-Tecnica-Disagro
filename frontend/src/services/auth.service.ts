export const authService = {
  login: async (usuario: string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Guardar JWT en la memoria local
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario_nombre', data.usuario.nombre);
      }

      return data;
    } catch (error: any) {
      console.error('Error en authService.login:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_nombre');
  },

  obtenerToken: () => {
    return localStorage.getItem('token');
  },

  obtenerNombreUsuario: () => {
    return localStorage.getItem('usuario_nombre');
  }
};