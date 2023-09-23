import React from 'react';

const ChangeButton: React.FC<{ 
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    editorContent: string
}> = ({inputValue, setInputValue}) => {
        const change = async () => {
            !inputValue
            ? alert('El ID es requerido')
            : (() => {
                const nuevoId = window.prompt('Ingresa el nuevo ID:');

                nuevoId && nuevoId !== inputValue
                ?(async () => {
                    try {
                        const response = await fetch('/api/change', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: inputValue, newId: nuevoId })
                        });
        
                        response.ok
                        ?(setInputValue(nuevoId),
                        alert('ID cambiado exitosamente'))
                        : alert('Error al cambiar el ID');
                    } catch (error) {
                        alert('Error inesperado al cambiar el ID');
                    }
                })():nuevoId === inputValue
                ?alert('El nuevo ID es el mismo que el actual. No se hizo ningún cambio.')
                :null;
            })()
        };

  return (
    <button onClick={change} title="Editar">
      <img src="/rename.png" alt="Editar" />
    </button>
  );
};

export default ChangeButton;