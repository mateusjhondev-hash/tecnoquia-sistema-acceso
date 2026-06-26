package tecnoquiaweb;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet que procesa el formulario de inicio de sesion del sistema
 * de acceso de Tecnoquia S.A.S.
 *
 * Este servlet recibe los datos enviados desde login.html mediante
 * el metodo GET, y valida las credenciales ingresadas por el usuario.
 * Para esta evidencia academica se utiliza una validacion simple en
 * memoria (usuario "demo" y contraseña "demo123"), simulando lo que
 * en un sistema real seria una consulta a la base de datos mediante
 * JDBC (como se desarrollo en la evidencia GA7-220501096-AA2-EV01).
 *
 * @author Jhon Alvaro Mateus Saganome
 */
@WebServlet(name = "LoginServlet", urlPatterns = {"/LoginServlet"})
public class LoginServlet extends HttpServlet {

    // Credenciales de prueba para esta evidencia academica
    private static final String USUARIO_DEMO = "demo";
    private static final String PASSWORD_DEMO = "demo123";

    /**
     * Metodo que atiende las peticiones GET. El formulario de login
     * (login.html) envia sus datos usando este metodo, evidenciando
     * el uso de GET solicitado en la actividad de aprendizaje.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        procesarLogin(request, response);
    }

    /**
     * Metodo que atiende las peticiones POST, para que el servlet
     * tambien pueda recibir el login si en algun momento se cambia
     * el metodo del formulario a POST.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        procesarLogin(request, response);
    }

    /**
     * Valida las credenciales ingresadas y redirige a la pagina JSP
     * correspondiente: bienvenida.jsp si son correctas, o error.jsp
     * si son incorrectas.
     */
    private void procesarLogin(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Se obtienen los parametros enviados desde el formulario HTML
        String usuario = request.getParameter("usuario");
        String password = request.getParameter("password");

        // Se valida que las credenciales coincidan con las de prueba
        if (USUARIO_DEMO.equals(usuario) && PASSWORD_DEMO.equals(password)) {

            // Se guarda el nombre de usuario como atributo de la peticion,
            // para que la pagina JSP pueda mostrarlo
            request.setAttribute("nombreUsuario", usuario);

            // Se reenvia (forward) hacia la pagina de bienvenida JSP
            request.getRequestDispatcher("bienvenida.jsp").forward(request, response);

        } else {

            // Se guarda el mensaje de error como atributo de la peticion
            request.setAttribute("mensajeError",
                    "El usuario o la contraseña son incorrectos. Intente de nuevo.");

            // Se reenvia hacia la pagina de error JSP
            request.getRequestDispatcher("error.jsp").forward(request, response);
        }
    }

    /**
     * Devuelve una breve descripcion del servlet, util para
     * documentacion del servidor.
     */
    @Override
    public String getServletInfo() {
        return "Servlet que procesa el inicio de sesion de Tecnoquia S.A.S";
    }
}
