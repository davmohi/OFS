import React from 'react';

const OtrosProductos: React.FC<{changeWindow: () => void }> = ({changeWindow}) => {
    const handleClick = () =>{
      changeWindow();
    }

    return (
        <div className='otherPage'>
          <h1>Nuestros Servicios</h1>
          <p>Aquí puedes encontrar información sobre los servicios que ofrecemos.</p>
          
          <ul className='serviceList'>
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
          <div>
            <button onClick={handleClick} className='otherPageButton'>
                Volver a Inicio
            </button>
          </div>
        </div>
      )
}

export default OtrosProductos;