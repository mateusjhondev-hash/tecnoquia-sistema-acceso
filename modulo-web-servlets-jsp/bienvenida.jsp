<%-- 
    Documento : bienvenida.jsp
    Esta pagina JSP muestra un mensaje de bienvenida ya sea despues
    de un login exitoso o de un registro exitoso. Utiliza expresiones
    JSP (<%= %>) para mostrar los datos enviados desde los servlets,
    y un scriptlet (<% %>) para aplicar logica condicional segun el
    caso (login o registro).
    Autor     : Jhon Alvaro Mateus Saganome
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Bienvenido - Tecnoquia S.A.S</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F0F4F8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .card {
            background: white;
            border-radius: 14px;
            box-shadow: 0 4px 24px rgba(11,46,94,0.15);
            width: 420px;
            text-align: center;
            padding: 30px;
        }
        .icono {
            width: 70px;
            height: 70px;
            background-color: #1A7850;
            border-radius: 50%;
            margin: 0 auto 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
        }
        h1 {
            color: #0B2E5E;
            font-size: 22px;
            margin-bottom: 8px;
        }
        p {
            color: #555;
            font-size: 14px;
            line-height: 1.6;
        }
        .dato {
            background-color: #F5F7FA;
            border-radius: 8px;
            padding: 10px;
            margin-top: 14px;
            font-size: 13px;
            color: #0B2E5E;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            color: #1A5BB5;
            text-decoration: none;
            font-size: 13px;
        }
    </style>
</head>
<body>

    <div class="card">
        <div class="icono">&#10003;</div>

        <%-- 
            Scriptlet JSP: aplica logica condicional en Java para 
            mostrar un mensaje distinto segun si el usuario viene 
            de un login o de un registro exitoso.
        --%>
        <% 
            Boolean esRegistro = (Boolean) request.getAttribute("esRegistro");
            if (esRegistro != null && esRegistro) {
        %>
                <h1>¡Registro Exitoso!</h1>
                <p>Tu cuenta ha sido creada correctamente en el sistema de Tecnoquia S.A.S.</p>
                <div class="dato">
                    <strong>Nombre:</strong> <%= request.getAttribute("nombresCompletos") %><br>
                    <strong>Usuario:</strong> <%= request.getAttribute("nombreUsuario") %><br>
                    <strong>Correo:</strong> <%= request.getAttribute("correoUsuario") %>
                </div>
        <% 
            } else {
        %>
                <h1>¡Bienvenido!</h1>
                <p>Has iniciado sesion correctamente en el sistema de Tecnoquia S.A.S.</p>
                <div class="dato">
                    <strong>Usuario conectado:</strong> <%= request.getAttribute("nombreUsuario") %>
                </div>
        <% 
            } 
        %>

        <a href="login.html">Volver al inicio de sesion</a>
    </div>

</body>
</html>
