import Link from 'next/link';
import styles from './Page.module.css'; // Asume que tienes un archivo Page.module.css en la misma carpeta

export default function Page() {
  return (
    <div className={styles.otherPage}>
      <h1>Nuestros Servicios</h1>
      <p>Aquí puedes encontrar información sobre los servicios que ofrecemos.</p>
      
      <ul className={styles.serviceList}>
        <li>
          <h2>Desarrollo Web</h2>
          <p>Desarrollamos sitios web modernos y responsivos con las últimas tecnologías.</p>
        </li>
        <li>
          <h2>Administración de Bases de Datos</h2>
          <p>Ofrecemos soluciones para la gestión y optimización de bases de datos.</p>
        </li>
        <li>
          <h2>Asesorías en Programación</h2>
          <p>Brindamos asesorías y consultorías para resolver tus dudas y problemas de programación.</p>
        </li>
        {/* Puedes agregar más servicios aquí */}
      </ul>
      
      <Link href="/" className={styles.backLink}>
        Volver a Inicio
      </Link>
    </div>
  )
}
