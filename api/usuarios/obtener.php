<?php
/**
 * obtener.php - Consultar un usuario por ID
 *
 * Metodo: GET
 * URL: http://localhost/tecnoquia-api-v2/api/usuarios/obtener.php?id=1
 *
 * Parametro de URL: id (numero entero)
 *
 * Respuesta 200: { "exito": true, "datos": {...} }
 * Respuesta 404: { "exito": false, "mensaje": "Usuario no encontrado." }
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

// Leemos el ID de los parametros de la URL (?id=1)
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Debe proporcionar un ID valido en la URL. Ejemplo: ?id=1']);
    exit();
}

include_once '../../config/database.php';
$db = (new Conexion())->conectar();

try {
    $stmt = $db->prepare(
        'SELECT id, nombre, correo, direccion, telefono, usuario, fecha_registro
         FROM usuarios WHERE id = ? LIMIT 1'
    );
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['exito' => false, 'mensaje' => "No existe un usuario con el ID $id."]);
        exit();
    }

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    $usuario['id'] = (int) $usuario['id'];

    http_response_code(200);
    echo json_encode(['exito' => true, 'datos' => $usuario]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error al consultar el usuario.']);
}
