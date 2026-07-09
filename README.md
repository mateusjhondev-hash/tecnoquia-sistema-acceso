# Tecnoquia S.A.S. - Servicio Web (API PHP)

Proyecto formativo ADSO — Evidencia GA7-220501096-AA5-EV01
Ficha: 3134707 — Grupo 6

## Descripcion

Servicio web REST desarrollado en PHP para el registro e inicio de
sesion de usuarios del sistema Tecnoquia S.A.S. Responde en formato
JSON y se conecta a una base de datos MySQL.

## Integrantes
- Jhon Alvaro Mateus Saganome
- Tania Mildred Arciniegas Yanez
- Adrian Camilo Marin Isaza
- Blanca Azucena Gonzalez Clavijo

## Endpoints disponibles

| Metodo | URL                        | Descripcion            |
|--------|----------------------------|------------------------|
| POST   | /api/registro.php          | Registrar nuevo usuario|
| POST   | /api/login.php             | Iniciar sesion         |

## Como ejecutar el proyecto

### Requisitos
- XAMPP (Apache + MySQL) instalado

### Pasos
1. Copia la carpeta `tecnoquia-api` dentro de: `C:/xampp/htdocs/`
2. Abre XAMPP y enciende Apache y MySQL
3. Abre phpMyAdmin en: http://localhost/phpmyadmin
4. Crea la base de datos ejecutando el archivo `tecnoquia_db.sql`
5. Abre el navegador y ve a: http://localhost/tecnoquia-api/test.html
6. Prueba el registro y el login desde la interfaz

## Repositorio
https://github.com/mateusjhondev-hash/tecnoquia-sistema-acceso
Rama: api-php
