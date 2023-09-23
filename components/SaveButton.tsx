import React from 'react';

const SaveButton: React.FC<{
  inputValue: string;
  editorContent: string;
  setSaveOnClick: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ inputValue, editorContent, setSaveOnClick }) => {
  const showAlert = (message: string) => () => alert(message);

  const checkFileExists = async () => {
    const response = await fetch(`/api/script/${inputValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  };

  const overwriteConfirmation = async () => {
    const exists = await checkFileExists();
    return exists
      ? window.confirm('El archivo ya existe. ¿Desea sobreescribirlo?')
      : true;
  };

  const saveScript = async () => {
    const shouldOverwrite = await overwriteConfirmation();

    return !inputValue
      ? showAlert('El ID es requerido')()
      : !shouldOverwrite
      ? undefined
      : (async () => {
          try {
            const response = await fetch(`/api/script/${inputValue}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ content: editorContent }),
            });

            response.ok
              ? (() => {
                  setSaveOnClick(true);
                  alert('Script guardado exitosamente');
                })()
              : response.status === 400
              ? showAlert('ID y contenido son requeridos')()
              : showAlert('Hubo un error inesperado al guardar el script')();
          } catch (error) {
            console.error('Error al guardar', error);
            showAlert('No se pudo guardar el script')();
          }
        })();
  };

  return (
    <button onClick={saveScript} title="Guardar">
      <img src="/guardar.svg" alt="Guardar" />
    </button>
  );
};

export default SaveButton;
