// SaveButton.tsx
import React, { useState } from 'react';

const SaveButton: React.FC<{
  inputValue: string;
  editorContent: string;
  setSaveOnClick: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ inputValue, editorContent, setSaveOnClick }) => {
  const handleSave = async () => {
    if (!inputValue) {
      alert('El ID es requerido');
      return;
    }
    try {
      // Primero, verifica si el archivo ya existe
      const checkResponse = await fetch(`/api/script/${inputValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Si el archivo ya existe
      if (checkResponse.ok) {
        const overwrite = window.confirm('El archivo ya existe. ¿Desea sobreescribirlo?');
        if (!overwrite) {
          return; // Si el usuario selecciona "No", termina la función
        }
      }

      // Realiza la solicitud POST para guardar o sobrescribir el archivo
      const response = await fetch(`/api/script/${inputValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editorContent }),
      });
      if (response.ok) {
        setSaveOnClick(true);
        alert('Script guardado exitosamente');
      } else if (response.status === 400) {
        alert('ID y contenido son requeridos');
      } else {
        alert('Hubo un error inesperado al guardar el script');
      }
    } catch (error) {
      console.error('Error al guardar', error);
      alert('No se pudo guardar el script');
    }
  };

  return (
    <button onClick={handleSave} title="Guardar">
      <img src="/guardar.svg" alt="Guardar" />
    </button>
  );
};

export default SaveButton;