// components/EditorArea.tsx
import React, { useState, useEffect } from 'react';

const EditorArea: React.FC<{ setTranspiledCode: (code: string) => void }> = ({ setTranspiledCode }) => {
    const [editorContent, setEditorContent] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [cursorLine, setCursorLine] = useState(1);
    const [isSaved, setIsSaved] = useState(true);

    const compileCode = async () => {
        try {
            const response = await fetch('/api/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editorContent })
            });

            const data = response.ok ? await response.json() : null;
            //json to string
            const stringifiedData = data
            setTranspiledCode(stringifiedData)

            if (!response.ok) {
                console.error("Error al compilar");
            }
        } catch (error) {
            console.error("Error al compilar", error);
        }
    };

    const guardar = async () => {
        if (!inputValue) {
            alert('El ID es requerido');
            return;
        }
        try {
            // Primero, verifica si el archivo ya existe
            const checkResponse = await fetch(`/api/script/${inputValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editorContent })
            });
            if (response.ok) {
                alert('Script guardado exitosamente');
            } 
            else if (response.status == 400) {
                alert('ID y contenido son requeridos')
            }
            else {
                alert('Hubo un error inesperado al guardar el script');
            }
        } catch (error) {
            console.error("Error al guardar", error);
            alert('No se pudo guardar el script');
        }
    };
    

    const cargar = async () => {
        if (!inputValue) {
            alert('El ID es requerido');
            return;
        }
        try {
            const response = await fetch(`/api/script/${inputValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                alert('No se pudo encontrar el script')
            }
            else {
                const data = await response.json()
                setEditorContent(data.content)
            }
        } catch (error) {
            console.error("Error al cargar", error);
        }
    };

    const editar = async () => {
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
    
    const updateLineNumbers = () => {
        const lines = editorContent.split('\n').length;
        let lineNumbers = '';
        for (let i = 1; i <= lines; i++) {
            lineNumbers += i + '\n';
        }
        return lineNumbers;
    };
    
    const [lineNumbers, setLineNumbers] = useState(updateLineNumbers());

    useEffect(() => {
        setLineNumbers(updateLineNumbers());
    }, [editorContent]);
    
    const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditorContent(e.target.value);
        setIsSaved(false)
    };

    const handleCursorChange = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const cursorPos = (e.target as HTMLTextAreaElement).selectionStart;
        const prevText = editorContent.substring(0, cursorPos);
        setCursorLine(prevText.split('\n').length);
    };

    const limpiar = () => {
        setEditorContent(''); // Limpia el contenido del editor
        setInputValue(''); // Limpia el input del ID
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h3 className="editor-title">Área de Edición</h3>
                <input
                    type="text"
                    placeholder="Id del codigo"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={limpiar} title="Limpiar">
                    <img src="/limpiar.svg" alt="Limpiar" />
                </button>
                <button onClick={editar} title="Editar">
                    <img src="/rename.png" alt="Editar" />
                </button>
                <button onClick={guardar} title="Guardar">
                    <img src="/guardar.svg" alt="Guardar" />
                </button>
                <button onClick={cargar} title="Cargar">
                    <img src="/cargar.svg" alt="Cargar" />
                </button>
                <button onClick={compileCode} title="Transpilar">
                    <img src="/compile-icon.png" alt="Compile" />
                </button>
            </div>
            <div className="editor-content">
                <div className="line-numbers">
                    <pre>{lineNumbers}</pre>
                </div>
                <textarea
                    className="editor-textarea"
                    value={editorContent}
                    onChange={handleEditorChange}
                    onClick={handleCursorChange}
                    placeholder="Escribe tu código aquí..."
                />
            </div>
        </div>
    );
};

export default EditorArea;