package tecnoquiaaccesojdbc;

/**
 * Clase modelo que representa un Usuario del sistema de acceso
 * de Tecnoquia S.A.S.
 *
 * Esta clase sigue el paradigma orientado a objetos: encapsula los
 * atributos de un usuario y expone metodos getter y setter para
 * acceder a ellos de forma controlada.
 *
 * @author Jhon Alvaro Mateus Saganome
 */
public class Usuario {

    private int id;
    private String nombres;
    private String apellidos;
    private String cedula;
    private String correo;
    private String usuario;
    private String password;

    // Constructor vacio, util para crear el objeto antes de llenarlo
    public Usuario() {
    }

    // Constructor usado al insertar un nuevo usuario (sin id, porque se autogenera)
    public Usuario(String nombres, String apellidos, String cedula, String correo, String usuario, String password) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.correo = correo;
        this.usuario = usuario;
        this.password = password;
    }

    // Constructor completo, usado cuando se consulta un usuario ya existente
    public Usuario(int id, String nombres, String apellidos, String cedula, String correo, String usuario, String password) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.correo = correo;
        this.usuario = usuario;
        this.password = password;
    }

    // Metodos getter y setter de cada atributo

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Representacion en texto del usuario, util para mostrarlo
     * facilmente en consola.
     */
    @Override
    public String toString() {
        return "ID: " + id
                + " | Nombres: " + nombres
                + " | Apellidos: " + apellidos
                + " | Cedula: " + cedula
                + " | Correo: " + correo
                + " | Usuario: " + usuario;
    }
}
