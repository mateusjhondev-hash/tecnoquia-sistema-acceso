package tecnoquiahibernate.tecnoquiahibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Clase entidad que representa un Usuario del sistema de acceso
 * de Tecnoquia S.A.S.
 *
 * A diferencia de la evidencia EV01 donde esta clase era un POJO simple,
 * aqui usamos anotaciones JPA/Hibernate para indicarle al framework
 * como debe mapear esta clase a la tabla "usuarios" de la base de datos.
 * Hibernate lee estas anotaciones y genera el SQL automaticamente,
 * sin que el programador tenga que escribirlo manualmente.
 *
 * Anotaciones utilizadas:
 * - @Entity: indica que esta clase es una entidad gestionada por Hibernate
 * - @Table: indica el nombre de la tabla en la base de datos
 * - @Id: indica que el campo es la llave primaria
 * - @GeneratedValue: indica que el valor se genera automaticamente (AUTO_INCREMENT)
 * - @Column: configura el nombre y restricciones de cada columna
 *
 * @author Jhon Alvaro Mateus Saganome
 * @author Tania Mildred Arciniegas Yanez
 * @author Adrian Camilo Marin Isaza
 * @author Blanca Azucena Gonzalez Clavijo
 */
@Entity
@Table(name = "usuarios")
public class Usuario {

    // Llave primaria autogenerada (equivalente a AUTO_INCREMENT en MySQL)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    // Cada @Column mapea el atributo Java con la columna exacta de la tabla
    @Column(name = "nombres", nullable = false, length = 100)
    private String nombres;

    @Column(name = "apellidos", nullable = false, length = 100)
    private String apellidos;

    @Column(name = "cedula", nullable = false, unique = true, length = 20)
    private String cedula;

    @Column(name = "correo", nullable = false, length = 100)
    private String correo;

    @Column(name = "usuario", nullable = false, unique = true, length = 50)
    private String usuario;

    @Column(name = "password", nullable = false, length = 50)
    private String password;

    // Hibernate requiere un constructor vacio para poder crear objetos
    public Usuario() {
    }

    // Constructor para crear un nuevo usuario (sin id, lo genera Hibernate)
    public Usuario(String nombres, String apellidos, String cedula,
            String correo, String usuario, String password) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.correo = correo;
        this.usuario = usuario;
        this.password = password;
    }

    // Metodos getter y setter de cada atributo
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    /**
     * Representacion en texto del usuario, util para mostrarlo
     * en la consola del menu principal.
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