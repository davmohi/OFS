//components/ChangeButton.tsx
import React, { useState } from 'react';
import Modal from '../modals/Modal';

// Define types for the change button props
interface ChargeButtonProps {
  inputValue: string;
  setEditorContent: (content: string) => void;
}

const ChargeButton: React.FC<ChargeButtonProps> = ({ inputValue, setEditorContent }) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null);

  // Function to open the modal with specified title and content
  const openModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to handle the charge button click
  const handleChargeClick = async () => {

    !inputValue
    ?openModal('Warning', 'ID es requerido')
    :(setLoading(true),
    async()=>{
      try {
        const response = await fetch(`/api/script/${inputValue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        !response.ok
        ?openModal('Error', 'Script no encontrado')
        :(console.log("AAAAAAAAAAA"),
          async()=>{
          const data = await response.json();
          openModal('Success', 'Carga exitosa');
          setEditorContent(data.content);
        })()
      } catch (error) {
        console.error('Error mientras carga', error);
      } finally {
        setLoading(false);
      }
    })()
  };

  return (
    <div>
      <button onClick={handleChargeClick} title="Cargar">
        <img src="/cargar.svg" alt="Load" />
      </button>
      {/* Render the Modal component here */}
      {modalOpen && modalTitle && modalContent && (
        <Modal isOpen={modalOpen} onClose={closeModal} title={modalTitle} content={modalContent} />
      )}
    </div>
  );
};

export default ChargeButton;
