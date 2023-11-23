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
//components/StopButton.tsx
import React from 'react';

// Define types for the stop button props
interface StopButtonProps {
  setTranspiledCode: React.Dispatch<string>;
  setResponse: React.Dispatch<string>;
  setFileName:(code: string) => void;
}

const StopButton: React.FC<StopButtonProps> = ({ setTranspiledCode, setResponse, setFileName }) => {
  const handleStopClick = () => {
    setTranspiledCode('');
    setResponse('');
    setFileName('');
  };

  return (
    <button onClick={handleStopClick} title="Detener">
      <img src="/stop.svg" alt="Stop" style={{ height: '16px' }} draggable="false"/>
    </button>
  );
};

export default StopButton;
