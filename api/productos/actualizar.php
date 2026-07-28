<?php
/**
 * actualizar.php - Actualizar un producto
 *
 * Metodo: PUT
 * URL: http://localhost/tecnoquia-api-v2/api/productos/actualizar.php
 *
 * Body JSON:
 * {
 *   "id":          1,
 *   "nombre":      "Electrodo actualizado",
 *   "descripcion": "Nueva descripcion",
 *   "precio":      50000,
 *   "stock":       120
 * }
 *
 * Respuesta 200: { "exito": true, "mensaje": "Producto actualizado exitosamente." }
 * Respuesta 404: { "exito": false, "mensaje": "Producto no encontrado." }
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
    echo json_encode(['exito' => false, 'mensaje' => 'Debe proporcionar el ID del producto a actualizar.']);
    exit();
}

if (empty(trim($datos['nombre'] ?? ''))) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El nombre del producto es obligatorio.']);
    exit();
}

$precio = floatval($datos['precio'] ?? 0);
if ($precio <= 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El precio debe ser mayor a cero.']);
    exit();
}

$stock = intval($datos['stock'] ?? 0);
if ($stock < 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'El stock no puede ser negativo.']);
    exit();
}

try {
    // Verificamos que el producto existe
    $check = $db->prepare('SELECT id FROM productos WHERE id = ? LIMIT 1');
    $check->execute([$id]);
    if ($check->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['exito' => false, 'mensaje' => "No existe un producto con el ID $id."]);
        exit();
    }

    $stmt = $db->prepare(
        'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE id=?'
    );
    $stmt->execute([
        trim($datos['nombre']),
        trim($datos['descripcion'] ?? ''),
        $precio,
        $stock,
        $id
    ]);

    http_response_code(200);
    echo json_encode(['exito' => true, 'mensaje' => 'Producto actualizado exitosamente.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al actualizar el producto.']);
}
