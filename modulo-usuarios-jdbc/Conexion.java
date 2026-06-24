package tecnoquiaaccesojdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase encargada de establecer la conexion con la base de datos
 * de Tecnoquia S.A.S utilizando JDBC.
 *
 * Esta clase aplica el principio de responsabilidad unica: su unico
 * trabajo es abrir y cerrar la conexion con MySQL, nada mas.
 *
 * @author Jhon Alvaro Mateus Saganome
 */
public class Conexion {

    // Datos de conexion a la base de datos local (XAMPP)
    private static final String URL = "jdbc:mysql://localhost:3306/tecnoquia_db?useSSL=false&serverTimezone=UTC";
    private static final String USUARIO = "root";
    private static final String CLAVE = ""; // XAMPP por defecto no tiene clave para root

    /**
     * Crea y retorna una conexion activa hacia la base de datos.
     *
     * @return objeto Connection listo para usarse
     * @throws SQLException si ocurre un error al conectar
     */
    public static Connection conectar() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, CLAVE);
    }

    /**
     * Cierra una conexion de forma segura, validando que no sea nula.
     *
     * @param conexion la conexion que se desea cerrar
     */
    public static void cerrar(Connection conexion) {
        try {
            if (conexion != null && !conexion.isClosed()) {
                conexion.close();
            }
        } catch (SQLException e) {
            System.out.println("Error al cerrar la conexion: " + e.getMessage());
        }
    }
}