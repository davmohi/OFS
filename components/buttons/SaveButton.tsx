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
//components/SaveButton.tsx
import React, { useState } from 'react';
import ModalOverwrite from '../modals/ModalOverwrite'; 
import Modal from '../modals/Modal';

const SaveButton: React.FC<{
  inputValue: string;
  editorContent: string;
  setSaveOnClick: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ inputValue, editorContent, setSaveOnClick }) => {
  // State for confirmation modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  // State for alert modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  // State to store alert message
  const [alertMessage, setAlertMessage] = useState('');

  // Check if a file with the given ID already exists
  const checkFileExists = async () => {
    const response = await fetch(`/api/script/${inputValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  };

  // Check if the file should be overwritten
  const overwriteConfirmation = async () => await checkFileExists();

  // Handle the save button click
  const handleSaveClick = async () => {
    const exists = await overwriteConfirmation();

    !inputValue
    ?(setAlertMessage('El ID es requerido'),
    setShowAlertModal(true))
    :exists
    ?setShowConfirmationModal(true)
    :saveScript()
  };

  // Save the script
  const saveScript = async () => {
    try {
      const response = await fetch(`/api/script/${inputValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editorContent }),
      });

      response.ok
      ?(setSaveOnClick(true),
      setAlertMessage('Script guardado exitosamente'),
      setShowAlertModal(true))
      :response.status === 400
      ?(setAlertMessage('ID y contenido son requeridos'),
      setShowAlertModal(true))
      :(setAlertMessage('Hubo un error inesperado al guardar el script'),
      setShowAlertModal(true));
      
    } catch (error) {
      console.error('Error al guardar', error);
      setAlertMessage('No se pudo guardar el script');
      setShowAlertModal(true);
    }
  };

  // Close the alert modal
  const closeAlertModal = () => {
    setShowAlertModal(false);
  };

  // Handle confirmation modal confirmation
  const handleModalConfirm = () => {
    saveScript();
    setShowConfirmationModal(false);
  };

  // Handle confirmation modal cancellation
  const handleModalCancel = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <button onClick={handleSaveClick} title="Guardar">
        <img src="/guardar.svg" alt="Guardar" draggable="false"/>
      </button>
      {/* Alert modal */}
      <Modal
        isOpen={showAlertModal}
        onClose={closeAlertModal}
        title="Message"
        content={alertMessage}
      />
      {/* Confirmation modal */}
      {showConfirmationModal && (
        <ModalOverwrite
          message="El archivo ya existe. ¿Desea sobreescribirlo?"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </>
  );
};

export default SaveButton;
