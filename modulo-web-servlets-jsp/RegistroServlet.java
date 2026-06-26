package tecnoquiaweb;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet que procesa el formulario de registro de nuevos usuarios
 * del sistema de acceso de Tecnoquia S.A.S.
 *
 * Este servlet recibe los datos enviados desde registro.html mediante
 * el metodo POST, ya que se trata de una operacion que crea informacion
 * nueva en el sistema. Realiza una validacion basica de los campos
 * obligatorios antes de mostrar la confirmacion al usuario.
 *
 * @author Jhon Alvaro Mateus Saganome
 */
@WebServlet(name = "RegistroServlet", urlPatterns = {"/RegistroServlet"})
public class RegistroServlet extends HttpServlet {

    /**
     * Metodo que atiende las peticiones POST enviadas desde el
     * formulario de registro (registro.html).
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        procesarRegistro(request, response);
    }

    /**
     * Metodo que atiende las peticiones GET, en caso de que el
     * servlet sea invocado directamente desde la barra de direcciones,
     * para evidenciar tambien el manejo del metodo GET.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        procesarRegistro(request, response);
    }

    /**
     * Valida los datos del nuevo usuario y redirige hacia la pagina
     * de bienvenida si todo esta correcto, o hacia la pagina de error
     * si falta algun campo obligatorio.
     */
    private void procesarRegistro(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Se obtienen todos los parametros enviados desde el formulario
        String nombres = request.getParameter("nombres");
        String apellidos = request.getParameter("apellidos");
        String cedula = request.getParameter("cedula");
        String correo = request.getParameter("correo");
        String usuario = request.getParameter("usuario");
        String password = request.getParameter("password");

        // Validacion basica: ningun campo obligatorio puede estar vacio
        if (esCampoValido(nombres) && esCampoValido(apellidos) && esCampoValido(cedula)
                && esCampoValido(correo) && esCampoValido(usuario) && esCampoValido(password)) {

            // Se guardan los datos del nuevo usuario como atributos de
            // la peticion, para que la pagina JSP pueda mostrarlos
            request.setAttribute("nombreUsuario", usuario);
            request.setAttribute("nombresCompletos", nombres + " " + apellidos);
            request.setAttribute("correoUsuario", correo);
            request.setAttribute("esRegistro", true);

            // Se reenvia hacia la pagina de bienvenida JSP
            request.getRequestDispatcher("bienvenida.jsp").forward(request, response);

        } else {

            request.setAttribute("mensajeError",
                    "Todos los campos son obligatorios. Por favor complete el formulario.");

            request.getRequestDispatcher("error.jsp").forward(request, response);
        }
    }

    /**
     * Verifica que un campo de texto no sea nulo ni este vacio.
     *
     * @param valor el valor del campo a validar
     * @return true si el campo tiene contenido valido
     */
    private boolean esCampoValido(String valor) {
        return valor != null && !valor.trim().isEmpty();
    }

    @Override
    public String getServletInfo() {
        return "Servlet que procesa el registro de usuarios de Tecnoquia S.A.S";
    }
}
