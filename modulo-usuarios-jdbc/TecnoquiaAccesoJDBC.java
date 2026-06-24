package tecnoquiaaccesojdbc;

import java.util.List;
import java.util.Scanner;

/**
 * Clase principal del proyecto. Contiene el metodo main y un menu
 * de consola que permite probar las operaciones CRUD (insertar,
 * consultar, actualizar y eliminar) sobre la tabla "usuarios" de
 * la base de datos tecnoquia_db, usando JDBC.
 *
 * Esta evidencia corresponde a GA7-220501096-AA2-EV01, donde se
 * codifica el modulo de usuarios del sistema de acceso de
 * Tecnoquia S.A.S, aplicando los estandares de codificacion
 * definidos en la evidencia GA7-220501096-AA1-EV02 (nombramiento
 * de variables en camelCase, clases en PascalCase, metodos con
 * verbo en camelCase, etc).
 *
 * @author Jhon Alvaro Mateus Saganome
 */
public class TecnoquiaAccesoJDBC {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        UsuarioDAO usuarioDAO = new UsuarioDAO();
        int opcion;

        System.out.println("=================================================");
        System.out.println("  SISTEMA DE ACCESO - TECNOQUIA S.A.S");
        System.out.println("  Modulo de Usuarios - Conexion JDBC con MySQL");
        System.out.println("=================================================");

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
                    System.out.println("\nGracias por usar el sistema de Tecnoquia S.A.S. Hasta luego.");
                    break;
                default:
                    System.out.println("\nOpcion no valida. Intente de nuevo.");
            }

        } while (opcion != 5);

        scanner.close();
    }

    /**
     * Imprime el menu principal de opciones en consola.
     */
    private static void mostrarMenu() {
        System.out.println("\n--------- MENU PRINCIPAL ---------");
        System.out.println("1. Insertar nuevo usuario");
        System.out.println("2. Consultar todos los usuarios");
        System.out.println("3. Actualizar un usuario");
        System.out.println("4. Eliminar un usuario");
        System.out.println("5. Salir");
        System.out.println("-----------------------------------");
    }

    /**
     * Solicita los datos por consola e inserta un nuevo usuario
     * en la base de datos.
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

        Usuario nuevoUsuario = new Usuario(nombres, apellidos, cedula, correo, usuarioLogin, password);

        boolean exito = usuarioDAO.insertar(nuevoUsuario);

        if (exito) {
            System.out.println("\nUsuario registrado exitosamente.");
        } else {
            System.out.println("\nNo se pudo registrar el usuario. Verifique los datos.");
        }
    }

    /**
     * Consulta y muestra en consola todos los usuarios registrados.
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
     * Solicita el id de un usuario y actualiza sus datos.
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

        Usuario usuarioActualizado = new Usuario(id, nombres, apellidos, cedula, correo, usuarioLogin, password);

        boolean exito = usuarioDAO.actualizar(usuarioActualizado);

        if (exito) {
            System.out.println("\nUsuario actualizado exitosamente.");
        } else {
            System.out.println("\nNo se pudo actualizar el usuario.");
        }
    }

    /**
     * Solicita el id de un usuario y lo elimina de la base de datos.
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
     * Metodo de apoyo para leer un numero entero desde consola
     * de forma segura, evitando que el programa se rompa si el
     * usuario escribe texto en lugar de un numero.
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