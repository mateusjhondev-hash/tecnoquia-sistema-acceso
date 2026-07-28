-- =====================================================
-- tecnoquia_db.sql - Base de datos del proyecto formativo
-- Empresa: Tecnoquia S.A.S.
-- Evidencia: GA7-220501096-AA5-EV03
-- Autores: Jhon Alvaro Mateus Saganome
--          Tania Mildred Arciniegas Yanez
--          Adrian Camilo Marin Isaza
--          Blanca Azucena Gonzalez Clavijo
-- Ficha: 3134707 - Grupo 6
-- Instructor: Juan Manuel Carmona Arzuaga
-- =====================================================

-- Creamos la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tecnoquia_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE tecnoquia_db;

-- ── TABLA DE USUARIOS ─────────────────────────────────────────────────────
-- Basada en la clase Usuario del diagrama de clases del proyecto
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    nombre         VARCHAR(120) NOT NULL    COMMENT 'Nombre completo del usuario',
    correo         VARCHAR(100) NOT NULL UNIQUE COMMENT 'Correo electronico unico',
    direccion      VARCHAR(200)            COMMENT 'Direccion del usuario',
    telefono       VARCHAR(20)             COMMENT 'Numero de telefono',
    usuario        VARCHAR(30)  NOT NULL UNIQUE COMMENT 'Nombre de usuario para login',
    password       VARCHAR(255) NOT NULL   COMMENT 'Contrasena cifrada con bcrypt',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Tabla de usuarios del sistema Tecnoquia S.A.S.';

-- ── TABLA DE PRODUCTOS ────────────────────────────────────────────────────
-- Basada en la clase Visualizacion de Productos del diagrama de clases
DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    nombre         VARCHAR(100) NOT NULL   COMMENT 'Nombre del producto',
    descripcion    TEXT                    COMMENT 'Descripcion del producto',
    precio         DECIMAL(10,2) NOT NULL  COMMENT 'Precio de venta',
    stock          INT NOT NULL DEFAULT 0  COMMENT 'Cantidad disponible en inventario',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Tabla de productos de Tecnoquia S.A.S.';

-- ── DATOS DE PRUEBA ───────────────────────────────────────────────────────
-- Insertamos algunos productos de ejemplo para probar los endpoints
INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Electrodo de superficie', 'Electrodo adhesivo para electromiografia de superficie', 45000.00, 100),
('Cable de estimulacion', 'Cable bipolar para estimulador de nervio periferico', 78000.00, 50),
('Gel conductor', 'Gel conductor para electrodos de contacto neurologico', 25000.00, 200),
('Electrodo de aguja', 'Electrodo de aguja para electromiografia de insercion', 120000.00, 30),
('Sensor de presion', 'Sensor de presion para monitoreo neurologico continuo', 350000.00, 15);

SELECT 'Base de datos tecnoquia_db creada correctamente.' AS resultado;
