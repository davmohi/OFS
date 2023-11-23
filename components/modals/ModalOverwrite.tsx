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
}) => (
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

export default ModalOverwrite;
