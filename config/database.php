<?php
/**
 * database.php - Configuracion de la conexion a la base de datos
 *
 * Este archivo contiene la clase Conexion que nos permite conectar
 * el servicio web con la base de datos MySQL de Tecnoquia S.A.S.
 *
 * Usamos PDO (PHP Data Objects) en lugar de mysqli porque:
 *   - Previene ataques de inyeccion SQL con sentencias preparadas
 *   - Es compatible con diferentes motores de base de datos
 *   - Maneja los errores de forma mas clara con excepciones
 *
 * Para usar este proyecto en XAMPP, la configuracion por defecto
 * de usuario 'root' sin contrasena es correcta. Si tu instalacion
 * tiene una contrasena diferente, actualizala aqui.
 */

class Conexion {

    // Datos del servidor de base de datos
    private $host     = 'localhost';   // Servidor (XAMPP siempre es localhost)
    private $bd       = 'tecnoquia_db'; // Nombre de la base de datos
    private $usuario  = 'root';        // Usuario de MySQL en XAMPP
    private $password = '';            // Contrasena (vacia por defecto en XAMPP)

    // Variable que va a guardar la conexion activa
    public $conn;

    /**
     * Crea y retorna la conexion a la base de datos.
     * Si la conexion falla, muestra el error en formato JSON y retorna null.
     */
    public function conectar() {
        $this->conn = null;

        try {
            // Creamos la conexion PDO indicando el servidor, base de datos y charset
            $dsn = "mysql:host={$this->host};dbname={$this->bd};charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->usuario, $this->password);

            // Configuramos PDO para que lance excepciones cuando hay errores
            // Esto nos facilita capturar los errores con try-catch
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            // Si no se puede conectar, respondemos con un error en JSON
            http_response_code(500);
            echo json_encode([
                'exito'   => false,
                'mensaje' => 'No se pudo conectar con la base de datos. Verifica que XAMPP este corriendo.'
            ]);
            exit();
        }

        return $this->conn;
    }
}
