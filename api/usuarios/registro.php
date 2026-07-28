<?php
/**
 * registro.php - Crear un nuevo usuario
 *
 * Metodo: POST
 * URL: http://localhost/tecnoquia-api-v2/api/usuarios/registro.php
 *
 * Body JSON:
 * {
 *   "nombre":    "Jhon Alvaro Mateus",
 *   "correo":    "jhon@tecnoquia.com",
 *   "direccion": "Calle 10 #5-20, Bucaramanga",
 *   "telefono":  "3101234567",
 *   "usuario":   "jhonm",
 *   "password":  "clave123"
 * }
 *
 * Respuesta 201: { "exito": true, "mensaje": "Usuario registrado.", "id": 1 }
 * Respuesta 400: { "exito": false, "mensaje": "Error de validacion" }
 * Respuesta 409: { "exito": false, "mensaje": "Usuario ya existe" }
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

// Validamos que los campos obligatorios no esten vacios
foreach (['nombre', 'correo', 'usuario', 'password'] as $campo) {
    if (empty(trim($datos[$campo] ?? ''))) {
        http_response_code(400);
        echo json_encode(['exito' => false, 'mensaje' => "El campo '$campo' es obligatorio."]);
        exit();
    }
}

// Validamos el formato del correo electronico
if (!filter_var(trim($datos['correo']), FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El correo no tiene un formato valido.']);
    exit();
}

// Validamos la longitud minima de la contrasena
if (strlen($datos['password']) < 6) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'La contrasena debe tener minimo 6 caracteres.']);
    exit();
}

try {
    // Verificamos si el usuario o correo ya existen en la base de datos
    $check = $db->prepare('SELECT id FROM usuarios WHERE usuario = ? OR correo = ? LIMIT 1');
    $check->execute([trim($datos['usuario']), strtolower(trim($datos['correo']))]);
    if ($check->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['exito' => false, 'mensaje' => 'El usuario o correo ya estan registrados.']);
        exit();
    }

    // Ciframos la contrasena antes de guardarla (nunca guardamos texto plano)
    $passwordCifrada = password_hash($datos['password'], PASSWORD_BCRYPT);

    $sql = 'INSERT INTO usuarios (nombre, correo, direccion, telefono, usuario, password)
            VALUES (?, ?, ?, ?, ?, ?)';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        trim($datos['nombre']),
        strtolower(trim($datos['correo'])),
        trim($datos['direccion'] ?? ''),
        trim($datos['telefono']  ?? ''),
        trim($datos['usuario']),
        $passwordCifrada
    ]);

    http_response_code(201);
    echo json_encode([
        'exito'   => true,
        'mensaje' => 'Usuario registrado exitosamente.',
        'id'      => (int) $db->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al registrar el usuario.']);
}
