<?php
/**
 * obtener.php - Consultar un producto por ID
 *
 * Metodo: GET
 * URL: http://localhost/tecnoquia-api-v2/api/productos/obtener.php?id=1
 *
 * Parametro de URL: id (numero entero)
 *
 * Respuesta 200: { "exito": true, "datos": {...} }
 * Respuesta 404: { "exito": false, "mensaje": "Producto no encontrado." }
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

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Debe proporcionar un ID valido. Ejemplo: ?id=1']);
    exit();
}

include_once '../../config/database.php';
$db = (new Conexion())->conectar();

try {
    $stmt = $db->prepare(
        'SELECT id, nombre, descripcion, precio, stock, fecha_registro
         FROM productos WHERE id = ? LIMIT 1'
    );
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['exito' => false, 'mensaje' => "No existe un producto con el ID $id."]);
        exit();
    }

    $producto = $stmt->fetch(PDO::FETCH_ASSOC);
    $producto['id']     = (int)   $producto['id'];
    $producto['precio'] = (float) $producto['precio'];
    $producto['stock']  = (int)   $producto['stock'];

    http_response_code(200);
    echo json_encode(['exito' => true, 'datos' => $producto]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error al consultar el producto.']);
}
