# Prueba Técnica - Catálogo de Productos Disagro
Aplicación web Fullstack para la administración del catálogo de productos.

## Arquitectura y Tecnologías Utilizadas

El ecosistema está construido con lo siguiente:

* **Backend:** Node.js v24.16.0 con **Express** y **TypeScript**.
* **Frontend:** **React** con **Tailwind CSS** para un diseño responsivo y corporativo.
* **Base de Datos:** **Microsoft SQL Server** como motor relacional.
* **Seguridad:** Autenticación basada en **JWT (JSON Web Tokens)** y hashing criptográfico de contraseñas con **Bcrypt**.

---

## Características Principales

1.  **Consola Híbrida de Acceso:** * **Modo Invitado (Lectura):** Permite a cualquier colaborador buscar productos por código y visualizar el catálogo completo en tiempo real.
    * **Modo Administrador (Escritura):** Eleva los privilegios del usuario permitiendo crear, modificar y eliminar registros del inventario.
2.  **Seguridad Defensiva:** Las rutas críticas del Backend están blindadas mediante un Middleware personalizado que valida las firmas de los tokens. En el Frontend, los componentes adaptan su interfaz inhabilitando y "grisando" la botonera de operaciones si la sesión no cuenta con privilegios administrativos.
3.  **Limpieza Automática:** El formulario de registro obliga la transformación de identificadores a mayúsculas estrictas para evitar redundancias o inconsistencias en los índices de la base de datos.

---

## Requisitos Previos

Antes de iniciar, se debe tener instalado en el entorno local:
* Node.js (Versión 18 o superior recomendada)
* pnpm (o npm / yarn)
* Microsoft SQL Server & SQL Server Management Studio (SSMS)

---

## Configuración de la Base de Datos

1. Abre **SQL Server Management Studio (SSMS)** en la instancia local.
2. Abre y ejecuta el script localizado en: `/backend/database/init.sql`.
3. El script creará automáticamente la base de datos `DisagroCatalogoBD`, las tablas con sus respectivas restricciones de integridad (`CHECK`, `UNIQUE`) y cargará el dato inicial (incluyendo el catálogo base y el usuario administrador de pruebas).

---

## Instalación y Despliegue

### 1. Configuración del Backend

Navega a la carpeta del servidor:
   cd backend
   Importante instalar las dependencias con pnpm install

   Utilizar el .env.example para crear un archivo .env con los datos del equipo local
   Levantar el servicio con pnpm dev

### 2. Configuración del Frontend

Navega hacia la carpeta del serivdor:
    cd frontend
    Importante instalar las dependencias con pnpm install
    Levantar el servicio con pnpm dev

## Credenciales para pruebas y modo lectura

Acceso Administrador (CRUD Habilitado):

Usuario: admin

Contraseña: Disagro2026

Acceso Invitado (Solo Lectura):

Hacer clic directamente en el botón "Entrar como Invitado (Lectura)" en la interfaz de login.