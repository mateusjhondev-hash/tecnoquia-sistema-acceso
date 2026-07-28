<?php
/**
 * crear.php - Crear un nuevo producto
 *
 * Metodo: POST
 * URL: http://localhost/tecnoquia-api-v2/api/productos/crear.php
 *
 * Body JSON:
 * {
 *   "nombre":      "Electrodo de superficie",
 *   "descripcion": "Electrodo adhesivo para electromiografia",
 *   "precio":      45000,
 *   "stock":       100
 * }
 *
 * Respuesta 201: { "exito": true, "mensaje": "Producto creado.", "id": 1 }
 * Respuesta 400: { "exito": false, "mensaje": "Error de validacion" }
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

// Validamos campos obligatorios
if (empty(trim($datos['nombre'] ?? ''))) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El nombre del producto es obligatorio.']);
    exit();
}

// Validamos que el precio sea un numero positivo
$precio = floatval($datos['precio'] ?? 0);
if ($precio <= 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El precio debe ser un numero mayor a cero.']);
    exit();
}

// Validamos que el stock sea un numero entero no negativo
$stock = intval($datos['stock'] ?? 0);
if ($stock < 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El stock no puede ser un numero negativo.']);
    exit();
}

try {
    $stmt = $db->prepare(
        'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([
        trim($datos['nombre']),
        trim($datos['descripcion'] ?? ''),
        $precio,
        $stock
    ]);

    http_response_code(201);
    echo json_encode([
        'exito'   => true,
        'mensaje' => 'Producto creado exitosamente.',
        'id'      => (int) $db->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al crear el producto.']);
}
