-- =====================================================
-- tecnoquia_db.sql
-- Script de creacion de la base de datos del servicio web
-- Proyecto: Tecnoquia S.A.S. - Servicios Web
-- Evidencia: GA7-220501096-AA5-EV01
-- Autores: Jhon Alvaro Mateus Saganome
--          Tania Mildred Arciniegas Yanez
--          Adrian Camilo Marin Isaza
--          Blanca Azucena Gonzalez Clavijo
-- Ficha: 3134707 - Grupo 6
-- =====================================================

-- Creamos la base de datos si no existe todavia
CREATE DATABASE IF NOT EXISTS tecnoquia_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Seleccionamos la base de datos para trabajar sobre ella
USE tecnoquia_db;

-- Eliminamos la tabla si ya existe, para crear una version limpia
DROP TABLE IF EXISTS usuarios;

-- Creamos la tabla de usuarios del sistema
-- Cada campo tiene su tipo de dato y restriccion definida
CREATE TABLE usuarios (
    id             INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador unico del usuario',
    nombres        VARCHAR(60)  NOT NULL          COMMENT 'Nombres del usuario',
    apellidos      VARCHAR(60)  NOT NULL          COMMENT 'Apellidos del usuario',
    cedula         VARCHAR(15)  NOT NULL UNIQUE   COMMENT 'Numero de cedula (unico)',
    correo         VARCHAR(100) NOT NULL UNIQUE   COMMENT 'Correo electronico (unico)',
    usuario        VARCHAR(30)  NOT NULL UNIQUE   COMMENT 'Nombre de usuario para login (unico)',
    password       VARCHAR(255) NOT NULL          COMMENT 'Contrasena cifrada con bcrypt',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de registro'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Tabla de usuarios del sistema Tecnoquia S.A.S.';

-- Mensaje de confirmacion al ejecutar el script
SELECT 'Base de datos tecnoquia_db creada correctamente.' AS resultado;
