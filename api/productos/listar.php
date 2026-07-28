<?php
/**
 * listar.php - Consultar todos los productos
 *
 * Metodo: GET
 * URL: http://localhost/tecnoquia-api-v2/api/productos/listar.php
 *
 * No requiere body. Retorna la lista completa de productos del catalogo.
 *
 * Respuesta 200: { "exito": true, "total": 5, "datos": [{...}] }
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

include_once '../../config/database.php';
$db = (new Conexion())->conectar();

try {
    $stmt = $db->prepare(
        'SELECT id, nombre, descripcion, precio, stock, fecha_registro
         FROM productos ORDER BY id ASC'
    );
    $stmt->execute();
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertimos los tipos numericos para que el JSON sea correcto
    foreach ($productos as &$p) {
        $p['id']     = (int)   $p['id'];
        $p['precio'] = (float) $p['precio'];
        $p['stock']  = (int)   $p['stock'];
    }

    http_response_code(200);
    echo json_encode([
        'exito' => true,
        'total' => count($productos),
        'datos' => $productos
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['exito' => false, 'mensaje' => 'Error al consultar los productos.']);
}
