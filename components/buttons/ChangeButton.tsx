//components/ChangeButton.tsx
import React, { useState } from 'react';
import Modal from '../modals/Modal';
import ModalChange from '../modals/ModalChange';

const ChangeButton: React.FC<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  editorContent: string;
}> = ({ inputValue, setInputValue }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [changeModalOpen, setChangeModalOpen] = useState(false);

  // Function to handle changing the ID
  const handleChange = async (newId: string) => {
    setChangeModalOpen(false);

    if (newId && newId !== inputValue) {
      try {
        const response = await fetch('/api/change', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: inputValue, newId }),
        });

        if (response.ok) {
          setInputValue(newId);
          setModalContent('ID cambiada exitosamente');
          setModalOpen(true);
        } else {
          setModalContent('Error al cambiar la ID');
          setModalOpen(true);
        }
      } catch (error) {
        setModalContent('Error inesperado al cambiar ID');
        setModalOpen(true);
      }
    } else if (newId === inputValue) {
      setModalContent('El nuevo ID es el mismo que el actual. No se hicieron cambios.');
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to handle the change button click
  const change = async () => {
    if (!inputValue) {
      setModalContent('ID es requerido');
      setModalOpen(true);
    } else {
      setChangeModalOpen(true);
    }
  };

  return (
    <div>
      <button onClick={change} title="Editar ID">
        <img src="/rename.png" alt="Edit" />
      </button>

      {/* Render the ModalChange to enter the new ID */}
      <ModalChange isOpen={changeModalOpen} onClose={() => setChangeModalOpen(false)} onAccept={handleChange} />

      {/* Render the Modal to display messages */}
      <Modal isOpen={modalOpen} onClose={closeModal} title="Message" content={modalContent} />
    </div>
  );
};

export default ChangeButton;