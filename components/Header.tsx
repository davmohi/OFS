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
//components/Header.tsx
import React from 'react';
import AboutButton from './buttons/AboutButton';

// Header component that displays the application's header
const Header: React.FC<{ changeWindow: () => void }> = ({ changeWindow }) => {
  // Function to handle the button click and change the window
  const handleClick = () => {
    changeWindow();
  }

  return (
    <div className="header-container">
      <h1 className="header-title">ONE FLOW STREAM</h1>
      <button onClick={handleClick} className="btn-otros">
        Otros Productos
      </button>
      <AboutButton />
    </div>
  );
};

export default Header;