package tecnoquiahibernate.tecnoquiahibernate;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

/**
 * Clase utilitaria que gestiona el SessionFactory de Hibernate.
 * Se implementa como Singleton para crear el SessionFactory una sola vez.
 *
 * @author Jhon Alvaro Mateus Saganome
 * @author Tania Mildred Arciniegas Yanez
 * @author Adrian Camilo Marin Isaza
 * @author Blanca Azucena Gonzalez Clavijo
 */
public class HibernateUtil {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            try {
                Configuration configuracion = new Configuration();
                configuracion.configure("hibernate.cfg.xml");

                // Registro directo de la clase entidad
                configuracion.addAnnotatedClass(Usuario.class);

                ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                        .applySettings(configuracion.getProperties())
                        .build();

                sessionFactory = configuracion.buildSessionFactory(serviceRegistry);
                System.out.println("Conexion Hibernate establecida correctamente.");

            } catch (Exception e) {
                System.out.println("Error al crear el SessionFactory: " + e.getMessage());
                throw new RuntimeException(e);
            }
        }
        return sessionFactory;
    }

    public static void cerrar() {
        if (sessionFactory != null && !sessionFactory.isClosed()) {
            sessionFactory.close();
            System.out.println("Conexion Hibernate cerrada correctamente.");
        }
    }
}