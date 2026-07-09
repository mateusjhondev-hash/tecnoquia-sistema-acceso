/**
 * Footer.jsx - Componente de pie de página
 *
 * Muestra la barra inferior con la información de derechos de autor
 * y el nombre de la empresa. Aparece en todas las páginas del sistema.
 *
 * Props:
 *   anio    -> año actual (número)
 *   empresa -> nombre de la empresa (texto)
 */
function Footer({ anio = 2026, empresa = 'Tecnoquia S.A.S.' }) {
  return (
    <footer className="footer">
      © {anio} {empresa} — Todos los derechos reservados.
      Sistema desarrollado por el equipo ADSO Ficha 3134707.
    </footer>
  )
}

export default Footer
