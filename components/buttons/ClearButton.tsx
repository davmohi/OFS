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
//components/ClearButton.tsx
import React from 'react';

// Prop for the clear function
interface ClearButtonProps {
  onClear: () => void; 
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  
  // Function to handle the clear button click
  const handleClearClick = () => {
    onClear(); // Call the clear function when the button is clicked
  };

  return (
    <button onClick={handleClearClick} title="Limpiar">
      <img src="/limpiar.svg" alt="Limpiar" draggable="false"/>
    </button>
  );
};

export default ClearButton;