<?php
/**
 * login.php - Iniciar sesion
 *
 * Metodo: POST
 * URL: http://localhost/tecnoquia-api-v2/api/usuarios/login.php
 *
 * Body JSON:
 * { "usuario": "jhonm", "password": "clave123" }
 *
 * Respuesta 200: { "exito": true, "mensaje": "Autenticacion satisfactoria.", "datos": {...} }
 * Respuesta 401: { "exito": false, "mensaje": "Error en la autenticacion." }
 */
// Cabeceras HTTP para responder en JSON y permitir CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['exito' => false, 'mensaje' => 'Metodo no permitido. Use POST.']);
    exit();
}

include_once '../../config/database.php';
$db    = (new Conexion())->conectar();
$datos = json_decode(file_get_contents('php://input'), true);

if (empty(trim($datos['usuario'] ?? '')) || empty($datos['password'] ?? '')) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El usuario y la contrasena son obligatorios.']);
    exit();
}

try {
    $stmt = $db->prepare(
        'SELECT id, nombre, correo, direccion, telefono, usuario, password
         FROM usuarios WHERE usuario = ? LIMIT 1'
    );
    $stmt->execute([trim($datos['usuario'])]);

    if ($stmt->rowCount() === 0) {
        http_response_code(401);
        echo json_encode(['exito' => false, 'mensaje' => 'Error en la autenticacion.']);
        exit();
    }

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verificamos la contrasena comparandola con el hash guardado
    if (!password_verify($datos['password'], $user['password'])) {
        http_response_code(401);
        echo json_encode(['exito' => false, 'mensaje' => 'Error en la autenticacion.']);
        exit();
    }

    // Eliminamos la contrasena de la respuesta por seguridad
    unset($user['password']);
    $user['id'] = (int) $user['id'];

    http_response_code(200);
    echo json_encode([
        'exito'   => true,
        'mensaje' => 'Autenticacion satisfactoria.',
        'datos'   => $user
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al verificar credenciales.']);
}
