import React from 'react';

const ChangeButton: React.FC<{ 
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    editorContent: string
}> = ({inputValue, setInputValue, editorContent}) => {
        const change = async () => {
            if (!inputValue) {
                alert('El ID es requerido');
                return;
            }
            const nuevoId = window.prompt('Ingresa el nuevo ID:');
            if (nuevoId && nuevoId !== inputValue) {
                try {
                    const response = await fetch('/api/change', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: inputValue, newId: nuevoId })
                    });
    
                    if (response.ok) {
                        setInputValue(nuevoId);
                        alert('ID cambiado exitosamente');
                    } else {
                        alert('Error al cambiar el ID');
                    }
                } catch (error) {
                    alert('Error inesperado al cambiar el ID');
                }
            } else if (nuevoId === inputValue) {
                alert('El nuevo ID es el mismo que el actual. No se hizo ningún cambio.');
            }
        };

  return (
    <button onClick={change} title="Editar">
      <img src="/rename.png" alt="Editar" />
    </button>
  );
};

export default ChangeButton;