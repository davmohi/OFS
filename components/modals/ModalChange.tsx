// components/ModalChange.tsx
import React, { useState } from 'react';

// ModalChangeProps interface for defining the modal's properties
interface ModalChangeProps {
  isOpen: boolean;         // Indicates whether the modal is open or closed
  onClose: () => void;     // Function to close the modal
  onAccept: (newId: string) => void; // Function to handle the acceptance of the new ID
}

// ModalChange component
const ModalChange: React.FC<ModalChangeProps> = ({ isOpen, onClose, onAccept }) => {
  const [newIdValue, setNewIdValue] = useState<string>(''); // State to store the new ID value

  // Function to handle the "Aceptar" button click
  const handleChange = () => {
    onAccept(newIdValue); // Call the onAccept function with the new ID value
    onClose(); // Close the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setNewIdValue(''); // Clear the value of the input field
    onClose(); // Close the modal
  };

  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>&times;</span>
        <h2>Cambiar ID</h2>
        <input
          type="text"
          placeholder="Nuevo ID"
          value={newIdValue}
          onChange={(e) => setNewIdValue(e.target.value)} // Update the new ID value on input change
        />
        <button className="accept-button" onClick={handleChange}>Aceptar</button>
        <button className="cancel-button" onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalChange;
