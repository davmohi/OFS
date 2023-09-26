// components/ModalOverWrite.tsx
import React from 'react';

// ModalOverwriteProps interface for defining the modal's properties
interface ModalOverwriteProps {
  message: string;        // The message to display in the modal
  onConfirm: () => void;  // Function to handle the confirmation action
  onCancel: () => void;   // Function to handle the cancellation action
}

// ModalOverwrite component
const ModalOverwrite: React.FC<ModalOverwriteProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p> {/* Display the provided message */}
        <div className="modal-buttons">
          <button className="accept-button" onClick={onConfirm}>Aceptar</button> {/* Confirm button */}
          <button className="cancel-button" onClick={onCancel}>Cancelar</button> {/* Cancel button */}
        </div>
      </div>
    </div>
  );
};

export default ModalOverwrite;
