package tecnoquiahibernate.tecnoquiahibernate;

import java.util.ArrayList;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

/**
 * Clase DAO que realiza las operaciones CRUD sobre la entidad Usuario,
 * usando Hibernate en lugar de JDBC directo.
 *
 * Diferencia clave con la EV01 (JDBC):
 * - En JDBC escribiamos SQL: "INSERT INTO usuarios (...) VALUES (?, ?, ?)"
 * - Con Hibernate usamos: session.save(usuario) — Hibernate genera el SQL solo
 *
 * @author Jhon Alvaro Mateus Saganome
 * @author Tania Mildred Arciniegas Yanez
 * @author Adrian Camilo Marin Isaza
 * @author Blanca Azucena Gonzalez Clavijo
 */
public class UsuarioDAO {

    public boolean insertar(Usuario usuario) {
        Transaction transaccion = null;
        Session sesion = null;
        try {
            sesion = HibernateUtil.getSessionFactory().openSession();
            transaccion = sesion.beginTransaction();
            sesion.save(usuario);
            transaccion.commit();
            return true;
        } catch (Exception e) {
            if (transaccion != null) transaccion.rollback();
            System.out.println("Error al insertar: " + e.getMessage());
            return false;
        } finally {
            if (sesion != null) sesion.close();
        }
    }

    public List<Usuario> consultarTodos() {
        Session sesion = null;
        try {
            sesion = HibernateUtil.getSessionFactory().openSession();
            Query<Usuario> consulta = sesion.createQuery("FROM Usuario ORDER BY id", Usuario.class);
            return consulta.list();
        } catch (Exception e) {
            System.out.println("Error al consultar: " + e.getMessage());
            return new ArrayList<>();
        } finally {
            if (sesion != null) sesion.close();
        }
    }

    public Usuario consultarPorId(int id) {
        Session sesion = null;
        try {
            sesion = HibernateUtil.getSessionFactory().openSession();
            return sesion.get(Usuario.class, id);
        } catch (Exception e) {
            System.out.println("Error al consultar por ID: " + e.getMessage());
            return null;
        } finally {
            if (sesion != null) sesion.close();
        }
    }

    public boolean actualizar(Usuario usuario) {
        Transaction transaccion = null;
        Session sesion = null;
        try {
            sesion = HibernateUtil.getSessionFactory().openSession();
            transaccion = sesion.beginTransaction();
            sesion.update(usuario);
            transaccion.commit();
            return true;
        } catch (Exception e) {
            if (transaccion != null) transaccion.rollback();
            System.out.println("Error al actualizar: " + e.getMessage());
            return false;
        } finally {
            if (sesion != null) sesion.close();
        }
    }

    public boolean eliminar(int id) {
        Transaction transaccion = null;
        Session sesion = null;
        try {
            sesion = HibernateUtil.getSessionFactory().openSession();
            transaccion = sesion.beginTransaction();
            Usuario usuario = sesion.get(Usuario.class, id);
            if (usuario != null) {
                sesion.delete(usuario);
                transaccion.commit();
                return true;
            } else {
                transaccion.rollback();
                return false;
            }
        } catch (Exception e) {
            if (transaccion != null) transaccion.rollback();
            System.out.println("Error al eliminar: " + e.getMessage());
            return false;
        } finally {
            if (sesion != null) sesion.close();
        }
    }
}