<?php
/**
 * login.php - Servicio web de inicio de sesion
 *
 * Este endpoint recibe un usuario y una contrasena, los verifica
 * contra la base de datos y responde si la autenticacion fue
 * satisfactoria o si hubo un error.
 *
 * ── Metodo HTTP: POST ────────────────────────────────────────────
 * URL: http://localhost/tecnoquia-api/api/login.php
 *
 * ── Cuerpo de la peticion (JSON): ───────────────────────────────
 * {
 *   "usuario":  "jhonm",
 *   "password": "clave123"
 * }
 *
 * ── Respuesta exitosa (codigo 200): ─────────────────────────────
 * {
 *   "exito":   true,
 *   "mensaje": "Autenticacion satisfactoria.",
 *   "datos": {
 *     "id":       1,
 *     "nombres":  "Jhon Alvaro",
 *     "apellidos":"Mateus Saganome",
 *     "correo":   "jhon@tecnoquia.com",
 *     "usuario":  "jhonm"
 *   }
 * }
 *
 * ── Respuesta de error (codigo 401): ────────────────────────────
 * { "exito": false, "mensaje": "Error en la autenticacion." }
 *
 * Evidencia: GA7-220501096-AA5-EV01
 * Autores: Jhon Alvaro Mateus Saganome, Tania Mildred Arciniegas Yanez,
 *          Adrian Camilo Marin Isaza, Blanca Azucena Gonzalez Clavijo
 */

// ── Cabeceras HTTP ────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Respondemos el preflight del navegador y terminamos
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo aceptamos peticiones POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['exito' => false, 'mensaje' => 'Metodo no permitido. Use POST.']);
    exit();
}

// ── Conexion a la base de datos ───────────────────────────────────────────────
include_once '../config/database.php';
$db = (new Conexion())->conectar();

// ── Lectura de los datos recibidos ────────────────────────────────────────────
$cuerpo = file_get_contents('php://input');
$datos  = json_decode($cuerpo, true);

// Verificamos que el JSON es valido
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Formato de datos invalido. Se espera JSON.']);
    exit();
}

// ── Validacion: campos obligatorios ──────────────────────────────────────────
if (empty(trim($datos['usuario'] ?? '')) || empty($datos['password'] ?? '')) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El usuario y la contrasena son obligatorios.']);
    exit();
}

// ── Busqueda del usuario en la base de datos ──────────────────────────────────
try {
    // Buscamos el usuario por su nombre de usuario
    // Seleccionamos todos los campos incluyendo la contrasena para verificarla
    $consulta = $db->prepare(
        'SELECT id, nombres, apellidos, cedula, correo, usuario, password
         FROM usuarios
         WHERE usuario = ?
         LIMIT 1'
    );
    $consulta->execute([trim($datos['usuario'])]);

    // ── Verificacion de existencia ────────────────────────────────────────────
    if ($consulta->rowCount() === 0) {
        // El usuario no existe. Devolvemos el mismo mensaje que si la contrasena
        // fuera incorrecta para no revelar si el usuario existe o no (seguridad)
        http_response_code(401); // 401 Unauthorized
        echo json_encode(['exito' => false, 'mensaje' => 'Error en la autenticacion.']);
        exit();
    }

    $usuarioEncontrado = $consulta->fetch(PDO::FETCH_ASSOC);

    // ── Verificacion de la contrasena ─────────────────────────────────────────
    // password_verify compara la contrasena ingresada con el hash guardado en BD
    // Internamente desencripta el hash de bcrypt y los compara de forma segura
    if (!password_verify($datos['password'], $usuarioEncontrado['password'])) {
        http_response_code(401);
        echo json_encode(['exito' => false, 'mensaje' => 'Error en la autenticacion.']);
        exit();
    }

    // ── Autenticacion exitosa ─────────────────────────────────────────────────
    // Eliminamos la contrasena del arreglo antes de enviarla en la respuesta
    // Nunca debemos enviar la contrasena (ni cifrada) al cliente
    unset($usuarioEncontrado['password']);

    // Convertimos el id a entero para que no venga como string en el JSON
    $usuarioEncontrado['id'] = (int) $usuarioEncontrado['id'];

    http_response_code(200);
    echo json_encode([
        'exito'   => true,
        'mensaje' => 'Autenticacion satisfactoria.',
        'datos'   => $usuarioEncontrado
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al verificar las credenciales.']);
}
