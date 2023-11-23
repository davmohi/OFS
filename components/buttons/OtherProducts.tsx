/* 
University: Universidad Nacional
School: Escuela de Informatica
Course: Paradigmas de Programación EIF 400
Semester: 2 Year: 2023
Team 02-1pm 
Members:
Luis Lopez Castro id: 402420889
Anderson Mora Aguero id: 115600170
David Morales Hidalgo id: 116300616
Alberto Aguero Herdocia id: 118450651
Project: OneFlowStream (OFS)
*/
//components/OtherProducts.tsx
import React from 'react';

// OtherProducts component
const OtherProducts: React.FC<{ changeWindow: () => void }> = ({ changeWindow }) => {
  // Event handler for the button click
  const handleClick = () => {
    changeWindow(); // Calls the changeWindow function when the button is clicked
  };

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
      </ul>
      <div>
        <button onClick={handleClick} className='otherPageButton'>
          Volver a Inicio
        </button>
      </div>
    </div>
  );
}

export default OtherProducts;
