
CREATE DATABASE DisagroCatalogoBD;
GO

USE DisagroCatalogoBD;
GO

--Creación de la Tabla de Productos
CREATE TABLE Productos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Codigo VARCHAR(50) NOT NULL UNIQUE,
    Nombre VARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(500) NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Categorias VARCHAR(250) NOT NULL,
    CreadoEn DATETIME DEFAULT GETDATE()
);
GO

--Insertar datos de prueba
INSERT INTO Productos (Codigo, Nombre, Descripcion, Precio, Categorias)
VALUES 
('FERT-001', 'Urea Granulada 46%', 'Fertilizante nitrogenado de alta concentración.', 350.00, 'Fertilizantes,Nutrición'),
('HERB-002', 'Glifosato Concentrado', 'Herbicida sistemático para control de malezas.', 180.50, 'Agroquímicos,Herbicidas');
GO

--Creacion de usuario para login
CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Usuario VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    CreadoEn DATETIME DEFAULT GETDATE()
);

--Usuario de prueba con contraseña hash
INSERT INTO Usuarios (Usuario, Password, Nombre)
VALUES (
    'admin', 
    '$2b$10$XdY72xYRJJ8QM6Ab7zLTIuwOAZgtSH3DnvJ4adlaP8uKesAOKycp.',
    'Erick Noriega'
);
GO

SELECT * FROM Usuarios;

