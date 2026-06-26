<%-- 
    Documento : error.jsp
    Esta pagina JSP muestra un mensaje de error cuando las credenciales
    de login son incorrectas o cuando faltan campos obligatorios en el
    formulario de registro. Utiliza una expresion JSP (<%= %>) para 
    mostrar el mensaje de error enviado desde el servlet correspondiente.
    Autor     : Jhon Alvaro Mateus Saganome
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Error - Tecnoquia S.A.S</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .card {
            background: white;
            border: 1px solid #FEE2E2;
            border-radius: 14px;
            box-shadow: 0 4px 24px rgba(239,68,68,0.15);
            width: 400px;
            text-align: center;
            padding: 30px;
        }
        .icono {
            width: 70px;
            height: 70px;
            background-color: #EF4444;
            border-radius: 50%;
            margin: 0 auto 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
            font-weight: bold;
        }
        h1 {
            color: #991B1B;
            font-size: 22px;
            margin-bottom: 8px;
        }
        .mensaje {
            background-color: #FEE2E2;
            border-radius: 8px;
            padding: 14px;
            color: #991B1B;
            font-size: 14px;
            margin-top: 14px;
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
        <div class="icono">&times;</div>
        <h1>Error de Autenticacion</h1>

        <div class="mensaje">
            <%-- 
                Expresion JSP que muestra el mensaje de error enviado 
                desde el servlet (LoginServlet o RegistroServlet) a 
                traves del atributo "mensajeError" de la peticion.
            --%>
            <%= request.getAttribute("mensajeError") %>
        </div>

        <a href="login.html">&larr; Volver al inicio de sesion</a>
    </div>

</body>
</html>
