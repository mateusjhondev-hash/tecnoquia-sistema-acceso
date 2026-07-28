<?php
/**
 * eliminar.php - Eliminar un producto
 *
 * Metodo: DELETE
 * URL: http://localhost/tecnoquia-api-v2/api/productos/eliminar.php
 *
 * Body JSON: { "id": 1 }
 *
 * Respuesta 200: { "exito": true, "mensaje": "Producto eliminado exitosamente." }
 * Respuesta 404: { "exito": false, "mensaje": "Producto no encontrado." }
 */
// Cabeceras HTTP para responder en JSON y permitir CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['exito' => false, 'mensaje' => 'Metodo no permitido. Use DELETE.']);
    exit();
}

include_once '../../config/database.php';
$db    = (new Conexion())->conectar();
$datos = json_decode(file_get_contents('php://input'), true);

$id = (int) ($datos['id'] ?? 0);
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Debe proporcionar el ID del producto a eliminar.']);
    exit();
}

try {
    $check = $db->prepare('SELECT id FROM productos WHERE id = ? LIMIT 1');
    $check->execute([$id]);
    if ($check->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['exito' => false, 'mensaje' => "No existe un producto con el ID $id."]);
        exit();
    }

    $stmt = $db->prepare('DELETE FROM productos WHERE id = ?');
    $stmt->execute([$id]);

    http_response_code(200);
    echo json_encode(['exito' => true, 'mensaje' => 'Producto eliminado exitosamente.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno al eliminar el producto.']);
}
