/**
 * usuarioService.js - Servicio de gestión de usuarios
 *
 * Este archivo centraliza todas las operaciones de datos del módulo
 * de usuarios: consultar, crear, actualizar y eliminar.
 *
 * Por ahora trabajamos con datos simulados en memoria (sin base de
 * datos real), pero el servicio está organizado de manera que en el
 * futuro se puede conectar fácilmente con el backend de Hibernate
 * a través de peticiones HTTP (fetch o axios).
 *
 * Estas operaciones corresponden a las historias de usuario definidas
 * en la evidencia AA3-EV02:
 *   HU-001: Registrar nuevo usuario     -> funcion crear()
 *   HU-002: Consultar usuarios          -> funcion obtenerTodos()
 *   HU-003: Actualizar usuario          -> funcion actualizar()
 *   HU-004: Eliminar usuario            -> funcion eliminar()
 */

// Datos de ejemplo que simulan los registros guardados en la base de datos.
// Representan los mismos integrantes del equipo de trabajo del proyecto.
let usuarios = [
  {
    id: 1,
    nombres: 'Jhon Álvaro',
    apellidos: 'Mateus Saganome',
    cedula: '12345678',
    correo: 'jhon@tecnoquia.com',
    usuario: 'jhonm',
    password: 'clave123'
  },
  {
    id: 2,
    nombres: 'Tania Mildred',
    apellidos: 'Arciniegas Yáñez',
    cedula: '98765432',
    correo: 'tania@tecnoquia.com',
    usuario: 'taniam',
    password: 'clave456'
  },
  {
    id: 3,
    nombres: 'Adrian Camilo',
    apellidos: 'Marín Isaza',
    cedula: '11223344',
    correo: 'adrian@tecnoquia.com',
    usuario: 'adrianm',
    password: 'clave789'
  },
  {
    id: 4,
    nombres: 'Blanca Azucena',
    apellidos: 'González Clavijo',
    cedula: '55667788',
    correo: 'blanca@tecnoquia.com',
    usuario: 'blancag',
    password: 'clave000'
  }
]

// Variable para generar IDs únicos de forma incremental
let contadorId = 5

/**
 * Retorna una copia del arreglo de todos los usuarios.
 * Usamos el spread [...] para no exponer el arreglo original.
 */
export const obtenerTodos = () => [...usuarios]

/**
 * Busca y retorna un usuario por su ID.
 * Si no lo encuentra, retorna undefined.
 */
export const obtenerPorId = (id) => usuarios.find(u => u.id === id)

/**
 * Crea y guarda un nuevo usuario en el sistema.
 * Asigna automáticamente un ID único incremental.
 * Retorna el objeto del usuario recién creado.
 */
export const crear = (datos) => {
  const nuevoUsuario = {
    id: contadorId++,
    nombres:   datos.nombres.trim(),
    apellidos: datos.apellidos.trim(),
    cedula:    datos.cedula.trim(),
    correo:    datos.correo.trim().toLowerCase(),
    usuario:   datos.usuario.trim(),
    password:  datos.password
  }
  usuarios.push(nuevoUsuario)
  return nuevoUsuario
}

/**
 * Actualiza los datos de un usuario existente.
 * Busca el usuario por ID y reemplaza sus campos con los nuevos valores.
 * Si se ingresa una contraseña nueva, también la actualiza.
 * Retorna true si se actualizó, false si el ID no existe.
 */
export const actualizar = (id, datos) => {
  const indice = usuarios.findIndex(u => u.id === id)
  if (indice === -1) return false

  // Usamos el spread operator para mantener los datos anteriores
  // y solo reemplazar los campos que llegan en "datos"
  usuarios[indice] = {
    ...usuarios[indice],
    nombres:   datos.nombres.trim(),
    apellidos: datos.apellidos.trim(),
    cedula:    datos.cedula.trim(),
    correo:    datos.correo.trim().toLowerCase(),
    usuario:   datos.usuario.trim(),
    // Solo actualizamos la contraseña si el usuario escribió una nueva
    ...(datos.password ? { password: datos.password } : {})
  }
  return true
}

/**
 * Elimina un usuario del sistema por su ID.
 * Filtra el arreglo dejando fuera el usuario con ese ID.
 * Retorna true si se eliminó alguien, false si el ID no existía.
 */
export const eliminar = (id) => {
  const cantidadAntes = usuarios.length
  usuarios = usuarios.filter(u => u.id !== id)
  return usuarios.length < cantidadAntes
}

/**
 * Verifica si un usuario y contraseña son correctos para iniciar sesión.
 * Primero revisa las credenciales del administrador del sistema.
 * Si no coinciden, busca entre los usuarios registrados.
 * Retorna el objeto de usuario si las credenciales son válidas, o null.
 *
 * NOTA: En un sistema real, esta validación la haría el backend
 *       comparando contraseñas cifradas con bcrypt o similar.
 */
export const verificarCredenciales = (usuarioLogin, password) => {
  // Credencial principal del administrador del sistema
  if (usuarioLogin === 'admin' && password === 'admin123') {
    return { id: 0, nombres: 'Administrador', apellidos: 'Sistema', usuario: 'admin' }
  }
  // También permite iniciar sesión con cualquier usuario registrado
  return usuarios.find(u => u.usuario === usuarioLogin && u.password === password) || null
}
