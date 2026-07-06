package tecnoquiahibernate.tecnoquiahibernate;

import java.util.List;
import java.util.Scanner;

/**
 * Clase principal del proyecto TecnoquiaHibernate.
 * Contiene el metodo main y el menu de consola para probar las
 * operaciones CRUD usando el framework Hibernate.
 *
 * Esta evidencia (GA7-220501096-AA3-EV01) es una evolucion directa
 * de la evidencia anterior (GA7-220501096-AA2-EV01) donde se uso JDBC
 * puro. La diferencia fundamental es:
 *
 * - EV01 (JDBC): el programador escribe el SQL manualmente con
 *   PreparedStatement y gestiona cada conexion.
 *
 * - EV02 (Hibernate): el framework genera el SQL automaticamente a
 *   partir de las anotaciones de la clase entidad. El programador
 *   trabaja solo con objetos Java, sin preocuparse por el SQL.
 *
 * @author Jhon Alvaro Mateus Saganome
 * @author Tania Mildred Arciniegas Yanez
 * @author Adrian Camilo Marin Isaza
 * @author Blanca Azucena Gonzalez Clavijo
 */
public class TecnoquiaHibernate {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        UsuarioDAO usuarioDAO = new UsuarioDAO();
        int opcion;

        System.out.println("=======================================================");
        System.out.println("  SISTEMA DE ACCESO - TECNOQUIA S.A.S");
        System.out.println("  Modulo de Usuarios - Framework Hibernate ORM");
        System.out.println("  GA7-220501096-AA3-EV01");
        System.out.println("=======================================================");

        do {
            mostrarMenu();
            opcion = leerEntero(scanner, "Seleccione una opcion: ");

            switch (opcion) {
                case 1:
                    insertarUsuario(scanner, usuarioDAO);
                    break;
                case 2:
                    consultarUsuarios(usuarioDAO);
                    break;
                case 3:
                    actualizarUsuario(scanner, usuarioDAO);
                    break;
                case 4:
                    eliminarUsuario(scanner, usuarioDAO);
                    break;
                case 5:
                    System.out.println("\nCerrando el sistema...");
                    HibernateUtil.cerrar();
                    System.out.println("Hasta luego.");
                    break;
                default:
                    System.out.println("\nOpcion no valida. Intente de nuevo.");
            }

        } while (opcion != 5);

        scanner.close();
    }

    /**
     * Muestra el menu principal de opciones en consola.
     */
    private static void mostrarMenu() {
        System.out.println("\n--------- MENU PRINCIPAL ---------");
        System.out.println("1. Insertar nuevo usuario");
        System.out.println("2. Consultar todos los usuarios");
        System.out.println("3. Actualizar un usuario");
        System.out.println("4. Eliminar un usuario");
        System.out.println("5. Salir");
        System.out.println("----------------------------------");
    }

    /**
     * Solicita los datos y guarda un nuevo usuario usando Hibernate.
     */
    private static void insertarUsuario(Scanner scanner, UsuarioDAO usuarioDAO) {
        System.out.println("\n--- Registrar nuevo usuario ---");

        System.out.print("Nombres: ");
        String nombres = scanner.nextLine();

        System.out.print("Apellidos: ");
        String apellidos = scanner.nextLine();

        System.out.print("Cedula: ");
        String cedula = scanner.nextLine();

        System.out.print("Correo electronico: ");
        String correo = scanner.nextLine();

        System.out.print("Nombre de usuario: ");
        String usuarioLogin = scanner.nextLine();

        System.out.print("Contraseña: ");
        String password = scanner.nextLine();

        Usuario nuevoUsuario = new Usuario(nombres, apellidos, cedula,
                correo, usuarioLogin, password);

        boolean exito = usuarioDAO.insertar(nuevoUsuario);

        if (exito) {
            System.out.println("\nUsuario registrado exitosamente con Hibernate.");
        } else {
            System.out.println("\nNo se pudo registrar el usuario.");
        }
    }

    /**
     * Consulta y muestra todos los usuarios usando HQL de Hibernate.
     */
    private static void consultarUsuarios(UsuarioDAO usuarioDAO) {
        System.out.println("\n--- Listado de usuarios registrados ---");

        List<Usuario> usuarios = usuarioDAO.consultarTodos();

        if (usuarios.isEmpty()) {
            System.out.println("No hay usuarios registrados todavia.");
        } else {
            for (Usuario usuario : usuarios) {
                System.out.println(usuario);
            }
        }
    }

    /**
     * Solicita el ID de un usuario y actualiza sus datos con Hibernate.
     */
    private static void actualizarUsuario(Scanner scanner, UsuarioDAO usuarioDAO) {
        System.out.println("\n--- Actualizar usuario ---");

        int id = leerEntero(scanner, "Ingrese el ID del usuario a actualizar: ");
        Usuario usuarioExistente = usuarioDAO.consultarPorId(id);

        if (usuarioExistente == null) {
            System.out.println("No existe un usuario con ese ID.");
            return;
        }

        System.out.println("Usuario encontrado: " + usuarioExistente);
        System.out.println("Ingrese los nuevos datos:");

        System.out.print("Nombres: ");
        usuarioExistente.setNombres(scanner.nextLine());

        System.out.print("Apellidos: ");
        usuarioExistente.setApellidos(scanner.nextLine());

        System.out.print("Cedula: ");
        usuarioExistente.setCedula(scanner.nextLine());

        System.out.print("Correo electronico: ");
        usuarioExistente.setCorreo(scanner.nextLine());

        System.out.print("Nombre de usuario: ");
        usuarioExistente.setUsuario(scanner.nextLine());

        System.out.print("Contraseña: ");
        usuarioExistente.setPassword(scanner.nextLine());

        boolean exito = usuarioDAO.actualizar(usuarioExistente);

        if (exito) {
            System.out.println("\nUsuario actualizado exitosamente.");
        } else {
            System.out.println("\nNo se pudo actualizar el usuario.");
        }
    }

    /**
     * Solicita el ID de un usuario y lo elimina con Hibernate.
     */
    private static void eliminarUsuario(Scanner scanner, UsuarioDAO usuarioDAO) {
        System.out.println("\n--- Eliminar usuario ---");

        int id = leerEntero(scanner, "Ingrese el ID del usuario a eliminar: ");
        Usuario usuarioExistente = usuarioDAO.consultarPorId(id);

        if (usuarioExistente == null) {
            System.out.println("No existe un usuario con ese ID.");
            return;
        }

        System.out.println("Usuario encontrado: " + usuarioExistente);
        System.out.print("¿Esta seguro que desea eliminarlo? (S/N): ");
        String confirmacion = scanner.nextLine();

        if (confirmacion.equalsIgnoreCase("S")) {
            boolean exito = usuarioDAO.eliminar(id);
            if (exito) {
                System.out.println("\nUsuario eliminado exitosamente.");
            } else {
                System.out.println("\nNo se pudo eliminar el usuario.");
            }
        } else {
            System.out.println("\nOperacion cancelada.");
        }
    }

    /**
     * Lee un numero entero desde consola de forma segura.
     */
    private static int leerEntero(Scanner scanner, String mensaje) {
        int valor = -1;
        boolean esValido = false;
        while (!esValido) {
            System.out.print(mensaje);
            String entrada = scanner.nextLine();
            try {
                valor = Integer.parseInt(entrada);
                esValido = true;
            } catch (NumberFormatException e) {
                System.out.println("Por favor ingrese un numero valido.");
            }
        }
        return valor;
    }
}