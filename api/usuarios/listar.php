<?php
/**
 * listar.php - Consultar todos los usuarios
 *
 * Metodo: GET
 * URL: http://localhost/tecnoquia-api-v2/api/usuarios/listar.php
 *
 * No requiere body. Retorna la lista completa de usuarios.
 * Las contrasenas nunca se incluyen en la respuesta.
 *
 * Respuesta 200: { "exito": true, "total": 3, "datos": [{...}, {...}] }
 */
// Cabeceras HTTP para responder en JSON y permitir CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['exito' => false, 'mensaje' => 'Metodo no permitido. Use GET.']);
    exit();
}

include_once '../../config/database.php';
$db = (new Conexion())->conectar();

try {
    // Seleccionamos todos los campos excepto la contrasena
    $stmt = $db->prepare(
        'SELECT id, nombre, correo, direccion, telefono, usuario, fecha_registro
         FROM usuarios ORDER BY id ASC'
    );
    $stmt->execute();
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertimos el id a entero en cada registro
    foreach ($usuarios as &$u) { $u['id'] = (int) $u['id']; }

    http_response_code(200);
    echo json_encode([
        'exito'  => true,
        'total'  => count($usuarios),
        'datos'  => $usuarios
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error al consultar los usuarios.']);
}
