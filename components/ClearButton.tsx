import React from 'react';

interface ClearButtonProps {
  onClear: () => void; // Prop para la función de limpieza
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  const handleClearClick = () => {
    onClear(); // Llama a la función de limpieza cuando se hace clic en el botón
  };

  return (
    <button onClick={handleClearClick} title="Limpiar">
      <img src="/limpiar.svg" alt="Limpiar" />
    </button>
  );
};

export default ClearButton;
