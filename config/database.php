<?php
/**
 * database.php - Configuracion de la conexion a la base de datos
 *
 * Clase reutilizable que crea la conexion PDO con MySQL.
 * Se incluye en todos los endpoints del proyecto para no
 * repetir el codigo de conexion en cada archivo.
 *
 * PDO (PHP Data Objects) es la forma mas segura de conectarse
 * a MySQL porque usa sentencias preparadas que previenen
 * ataques de inyeccion SQL.
 *
 * Proyecto: Tecnoquia S.A.S. - GA7-220501096-AA5-EV03
 */
class Conexion {

    private $host     = 'localhost';
    private $bd       = 'tecnoquia_db';
    private $usuario  = 'root';
    private $password = '';
    public  $conn;

    /**
     * Crea y retorna la conexion activa a la base de datos.
     * Si falla, responde con un JSON de error y termina el script.
     */
    public function conectar() {
        $this->conn = null;
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->bd};charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->usuario, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'exito'   => false,
                'mensaje' => 'Error de conexion con la base de datos. Verifica que XAMPP este activo.'
            ]);
            exit();
        }
        return $this->conn;
    }
}
