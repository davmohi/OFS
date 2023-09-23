// components/EditorArea.tsx
import React, { useState, useEffect } from 'react';

const EditorArea: React.FC<{ setTranspiledCode: (code: string) => void }> = ({ setTranspiledCode }) => {
    const [editorContent, setEditorContent] = useState('');
    const [inputValue, setInputValue] = useState('');

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
            } else {
                alert('No se pudo guardar el script');
            }
        } catch (error) {
            console.error("Error al guardar", error);
            alert('No se pudo guardar el script');
        }
    };
    

    const cargar = async () => {
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
    };

    const limpiar = () => {
        setEditorContent(''); // Limpia el contenido del editor
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
                    placeholder="Escribe tu código aquí..."
                />
            </div>
        </div>
    );
};

export default EditorArea;