// components/Modal.tsx
import React from 'react';

// ModalProps interface for defining the modal's properties
interface ModalProps {
  isOpen: boolean;       // Indicates whether the modal is open or closed
  onClose: () => void;   // Function to close the modal
  title: string;         // Title of the modal
  content: string;       // Content to be displayed in the modal
  children?: React.ReactNode; // Allow the Modal component to accept children
}

// Modal component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, children }) => !isOpen
  ? null
  : (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <p>{content}</p>
        {children} {/* Render any children here, if they exist */}
        <button className="cancel-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );

export default Modal;
