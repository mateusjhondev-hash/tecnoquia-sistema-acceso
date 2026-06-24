package tecnoquiaaccesojdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Clase DAO (Data Access Object) encargada de realizar las
 * operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la
 * tabla "usuarios" de la base de datos tecnoquia_db.
 *
 * Cada metodo de esta clase utiliza PreparedStatement, lo cual evita
 * ataques de inyeccion SQL y es una buena practica recomendada en
 * el desarrollo de aplicaciones con JDBC.
 *
 * @author Jhon Alvaro Mateus Saganome
 */
public class UsuarioDAO {

    /**
     * Inserta un nuevo usuario en la base de datos.
     *
     * @param usuario objeto Usuario con los datos a registrar
     * @return true si la insercion fue exitosa, false en caso contrario
     */
    public boolean insertar(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombres, apellidos, cedula, correo, usuario, password) "
                + "VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conexion = Conexion.conectar();
             PreparedStatement ps = conexion.prepareStatement(sql)) {

            ps.setString(1, usuario.getNombres());
            ps.setString(2, usuario.getApellidos());
            ps.setString(3, usuario.getCedula());
            ps.setString(4, usuario.getCorreo());
            ps.setString(5, usuario.getUsuario());
            ps.setString(6, usuario.getPassword());

            int filasAfectadas = ps.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Error al insertar usuario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Consulta todos los usuarios registrados en la base de datos.
     *
     * @return lista de objetos Usuario
     */
    public List<Usuario> consultarTodos() {
        List<Usuario> listaUsuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuarios ORDER BY id";

        try (Connection conexion = Conexion.conectar();
             PreparedStatement ps = conexion.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Usuario usuario = new Usuario(
                        rs.getInt("id"),
                        rs.getString("nombres"),
                        rs.getString("apellidos"),
                        rs.getString("cedula"),
                        rs.getString("correo"),
                        rs.getString("usuario"),
                        rs.getString("password")
                );
                listaUsuarios.add(usuario);
            }

        } catch (SQLException e) {
            System.err.println("Error al consultar usuarios: " + e.getMessage());
        }

        return listaUsuarios;
    }

    /**
     * Consulta un usuario especifico a partir de su id.
     *
     * @param id identificador del usuario a buscar
     * @return objeto Usuario encontrado, o null si no existe
     */
    public Usuario consultarPorId(int id) {
        String sql = "SELECT * FROM usuarios WHERE id = ?";

        try (Connection conexion = Conexion.conectar();
             PreparedStatement ps = conexion.prepareStatement(sql)) {

            ps.setInt(1, id);
            
            // Try-with-resources anidado para asegurar el cierre del ResultSet
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Usuario(
                            rs.getInt("id"),
                            rs.getString("nombres"),
                            rs.getString("apellidos"),
                            rs.getString("cedula"),
                            rs.getString("correo"),
                            rs.getString("usuario"),
                            rs.getString("password")
                    );
                }
            }

        } catch (SQLException e) {
            System.err.println("Error al consultar usuario por id: " + e.getMessage());
        }

        return null;
    }

    /**
     * Actualiza los datos de un usuario existente.
     *
     * @param usuario objeto Usuario con el id del registro a actualizar
     * y los nuevos datos
     * @return true si la actualizacion fue exitosa, false en caso contrario
     */
    public boolean actualizar(Usuario usuario) {
        String sql = "UPDATE usuarios SET nombres = ?, apellidos = ?, cedula = ?, "
                + "correo = ?, usuario = ?, password = ? WHERE id = ?";

        try (Connection conexion = Conexion.conectar();
             PreparedStatement ps = conexion.prepareStatement(sql)) {

            ps.setString(1, usuario.getNombres());
            ps.setString(2, usuario.getApellidos());
            ps.setString(3, usuario.getCedula());
            ps.setString(4, usuario.getCorreo());
            ps.setString(5, usuario.getUsuario());
            ps.setString(6, usuario.getPassword());
            ps.setInt(7, usuario.getId());

            int filasAfectadas = ps.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Error al actualizar usuario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Elimina un usuario de la base de datos a partir de su id.
     *
     * @param id identificador del usuario a eliminar
     * @return true si la eliminacion fue exitosa, false en caso contrario
     */
    public boolean eliminar(int id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";

        try (Connection conexion = Conexion.conectar();
             PreparedStatement ps = conexion.prepareStatement(sql)) {

            ps.setInt(1, id);
            int filasAfectadas = ps.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }
}