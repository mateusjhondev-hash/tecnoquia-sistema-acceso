<?php
/**
 * registro.php - Servicio web de registro de usuarios
 *
 * Este endpoint recibe los datos de un nuevo usuario, los valida
 * y los guarda en la base de datos con la contrasena cifrada.
 *
 * ── Metodo HTTP: POST ────────────────────────────────────────────
 * URL: http://localhost/tecnoquia-api/api/registro.php
 *
 * ── Cuerpo de la peticion (JSON): ───────────────────────────────
 * {
 *   "nombres":   "Jhon Alvaro",
 *   "apellidos": "Mateus Saganome",
 *   "cedula":    "12345678",
 *   "correo":    "jhon@tecnoquia.com",
 *   "usuario":   "jhonm",
 *   "password":  "clave123"
 * }
 *
 * ── Respuesta exitosa (codigo 201): ─────────────────────────────
 * { "exito": true, "mensaje": "Usuario registrado exitosamente.", "id": 1 }
 *
 * ── Respuesta de error (codigo 400 o 409): ──────────────────────
 * { "exito": false, "mensaje": "Descripcion del error" }
 *
 * Evidencia: GA7-220501096-AA5-EV01
 * Autores: Jhon Alvaro Mateus Saganome, Tania Mildred Arciniegas Yanez,
 *          Adrian Camilo Marin Isaza, Blanca Azucena Gonzalez Clavijo
 */

// ── Cabeceras HTTP ────────────────────────────────────────────────────────────
// Le decimos al cliente que la respuesta es JSON y en UTF-8
header('Content-Type: application/json; charset=UTF-8');

// Permitimos peticiones desde cualquier origen (necesario para el frontend React)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Las peticiones OPTIONS son de preflight (verificacion previa del navegador)
// Las respondemos con 200 OK y terminamos aqui
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo aceptamos peticiones de tipo POST para este servicio
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['exito' => false, 'mensaje' => 'Metodo no permitido. Use POST.']);
    exit();
}

// ── Conexion a la base de datos ───────────────────────────────────────────────
include_once '../config/database.php';
$db = (new Conexion())->conectar();

// ── Lectura de los datos recibidos ────────────────────────────────────────────
// Leemos el cuerpo de la peticion HTTP que viene en formato JSON
$cuerpo = file_get_contents('php://input');
$datos  = json_decode($cuerpo, true);

// Verificamos que el JSON se pudo leer correctamente
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El formato de los datos no es valido. Se espera JSON.']);
    exit();
}

// ── Validacion de campos obligatorios ────────────────────────────────────────
$camposRequeridos = ['nombres', 'apellidos', 'cedula', 'correo', 'usuario', 'password'];

foreach ($camposRequeridos as $campo) {
    if (empty(trim($datos[$campo] ?? ''))) {
        http_response_code(400);
        echo json_encode([
            'exito'   => false,
            'mensaje' => "El campo '{$campo}' es obligatorio y no puede estar vacio."
        ]);
        exit();
    }
}

// ── Validacion de formatos ────────────────────────────────────────────────────

// La cedula solo debe contener digitos numericos
if (!preg_match('/^[0-9]+$/', trim($datos['cedula']))) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'La cedula solo debe contener digitos numericos.']);
    exit();
}

// El correo debe tener un formato valido (usuario@dominio.com)
if (!filter_var(trim($datos['correo']), FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El correo no tiene un formato valido. Ejemplo: usuario@dominio.com']);
    exit();
}

// La contrasena debe tener al menos 6 caracteres
if (strlen($datos['password']) < 6) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'La contrasena debe tener al menos 6 caracteres.']);
    exit();
}

// ── Verificacion de duplicados ────────────────────────────────────────────────
// Comprobamos si ya existe un usuario con el mismo usuario, correo o cedula
try {
    $verificar = $db->prepare(
        'SELECT id FROM usuarios WHERE usuario = ? OR correo = ? OR cedula = ? LIMIT 1'
    );
    $verificar->execute([
        trim($datos['usuario']),
        strtolower(trim($datos['correo'])),
        trim($datos['cedula'])
    ]);

    if ($verificar->rowCount() > 0) {
        http_response_code(409); // 409 Conflict: el recurso ya existe
        echo json_encode([
            'exito'   => false,
            'mensaje' => 'Ya existe un usuario registrado con ese nombre de usuario, correo o cedula.'
        ]);
        exit();
    }

    // ── Cifrado de la contrasena ──────────────────────────────────────────────
    // Nunca guardamos la contrasena en texto plano en la base de datos.
    // Usamos password_hash con el algoritmo BCRYPT que es el estandar actual.
    // Al momento de verificar el login, usaremos password_verify().
    $passwordCifrada = password_hash($datos['password'], PASSWORD_BCRYPT);

    // ── Insercion en la base de datos ─────────────────────────────────────────
    // Usamos una sentencia preparada con parametros (?) para evitar SQL injection
    $insertar = $db->prepare(
        'INSERT INTO usuarios (nombres, apellidos, cedula, correo, usuario, password)
         VALUES (?, ?, ?, ?, ?, ?)'
    );

    $insertar->execute([
        trim($datos['nombres']),
        trim($datos['apellidos']),
        trim($datos['cedula']),
        strtolower(trim($datos['correo'])),
        trim($datos['usuario']),
        $passwordCifrada
    ]);

    // Obtenemos el ID que MySQL le asigno al nuevo registro
    $nuevoId = (int) $db->lastInsertId();

    // ── Respuesta exitosa ─────────────────────────────────────────────────────
    http_response_code(201); // 201 Created: recurso creado exitosamente
    echo json_encode([
        'exito'   => true,
        'mensaje' => 'Usuario registrado exitosamente.',
        'id'      => $nuevoId
    ]);

} catch (PDOException $e) {
    // Si ocurre un error inesperado en la base de datos, lo informamos
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al registrar el usuario.']);
}
