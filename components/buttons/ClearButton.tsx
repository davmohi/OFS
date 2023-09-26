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
      <img src="/limpiar.svg" alt="Limpiar" />
    </button>
  );
};

export default ClearButton;