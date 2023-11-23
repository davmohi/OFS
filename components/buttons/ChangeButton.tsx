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

    newId && newId !== inputValue
    ?(async()=>{
      try {
        const response = await fetch('/api/change', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: inputValue, newId }),
        });

        response.ok
        ?(setInputValue(newId),
        setModalContent('ID cambiada exitosamente'),
        setModalOpen(true))
        :(setModalContent('Error al cambiar la ID'),
        setModalOpen(true));

      } catch (error) {
        setModalContent('Error inesperado al cambiar ID');
        setModalOpen(true);
      }
    })()
    :(
      setModalContent('El nuevo ID es el mismo que el actual. No se hicieron cambios.'),
      setModalOpen(true));
  };

  //Function to close the modal 
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to handle the change button click
  const change = async () => {
    !inputValue
    ?(setModalContent('ID es requerido'),
    setModalOpen(true))
    :setChangeModalOpen(true);

  };

  return (
    <div>
      <button onClick={change} title="Editar ID">
        <img src="/rename.png" alt="Edit" draggable="false"/>
      </button>

      {/* Render the ModalChange to enter the new ID */}
      <ModalChange isOpen={changeModalOpen} onClose={() => setChangeModalOpen(false)} onAccept={handleChange} />

      {/* Render the Modal to display messages */}
      <Modal isOpen={modalOpen} onClose={closeModal} title="Message" content={modalContent} />
    </div>
  );
};

export default ChangeButton;