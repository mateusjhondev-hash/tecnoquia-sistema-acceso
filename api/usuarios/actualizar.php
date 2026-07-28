<?php
/**
 * actualizar.php - Actualizar datos de un usuario
 *
 * Metodo: PUT
 * URL: http://localhost/tecnoquia-api-v2/api/usuarios/actualizar.php
 *
 * Body JSON:
 * {
 *   "id":        1,
 *   "nombre":    "Nuevo Nombre",
 *   "correo":    "nuevo@tecnoquia.com",
 *   "direccion": "Nueva direccion",
 *   "telefono":  "3009876543",
 *   "usuario":   "nuevousuario",
 *   "password":  "nuevaclave"  (opcional - si se omite no se cambia)
 * }
 *
 * Respuesta 200: { "exito": true, "mensaje": "Usuario actualizado exitosamente." }
 * Respuesta 404: { "exito": false, "mensaje": "Usuario no encontrado." }
 */
// Cabeceras HTTP para responder en JSON y permitir CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['exito' => false, 'mensaje' => 'Metodo no permitido. Use PUT.']);
    exit();
}

include_once '../../config/database.php';
$db    = (new Conexion())->conectar();
$datos = json_decode(file_get_contents('php://input'), true);

$id = (int) ($datos['id'] ?? 0);
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Debe proporcionar el ID del usuario a actualizar.']);
    exit();
}

foreach (['nombre', 'correo', 'usuario'] as $campo) {
    if (empty(trim($datos[$campo] ?? ''))) {
        http_response_code(400);
        echo json_encode(['exito' => false, 'mensaje' => "El campo '$campo' es obligatorio."]);
        exit();
    }
}

if (!filter_var(trim($datos['correo']), FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El correo no tiene un formato valido.']);
    exit();
}

try {
    // Verificamos que el usuario existe antes de actualizar
    $check = $db->prepare('SELECT id FROM usuarios WHERE id = ? LIMIT 1');
    $check->execute([$id]);
    if ($check->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['exito' => false, 'mensaje' => "No existe un usuario con el ID $id."]);
        exit();
    }

    // Si se envio una nueva contrasena la ciframos, si no mantenemos la anterior
    if (!empty($datos['password'])) {
        if (strlen($datos['password']) < 6) {
            http_response_code(400);
            echo json_encode(['exito' => false, 'mensaje' => 'La nueva contrasena debe tener minimo 6 caracteres.']);
            exit();
        }
        $sql = 'UPDATE usuarios SET nombre=?, correo=?, direccion=?, telefono=?, usuario=?, password=?
                WHERE id=?';
        $params = [
            trim($datos['nombre']),
            strtolower(trim($datos['correo'])),
            trim($datos['direccion'] ?? ''),
            trim($datos['telefono']  ?? ''),
            trim($datos['usuario']),
            password_hash($datos['password'], PASSWORD_BCRYPT),
            $id
        ];
    } else {
        $sql = 'UPDATE usuarios SET nombre=?, correo=?, direccion=?, telefono=?, usuario=?
                WHERE id=?';
        $params = [
            trim($datos['nombre']),
            strtolower(trim($datos['correo'])),
            trim($datos['direccion'] ?? ''),
            trim($datos['telefono']  ?? ''),
            trim($datos['usuario']),
            $id
        ];
    }

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    http_response_code(200);
    echo json_encode(['exito' => true, 'mensaje' => 'Usuario actualizado exitosamente.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al actualizar el usuario.']);
}
