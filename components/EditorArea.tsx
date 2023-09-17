// components/EditorArea.tsx
import React, { useState } from 'react';

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
            await fetch('/api/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editorContent, inputText: inputValue })
            });
        } catch (error) {
            console.error("Error al guardar", error);
        }
    };

    const cargar = async () => {
        try {
            const response = await fetch(`/api/cargar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputText: inputValue })
            });
            const data = await response.text();
            setEditorContent(data);
        } catch (error) {
            console.error("Error al cargar", error);
        }
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
                <button onClick={guardar} className="save-button">
                    <img src="/guardar.svg" alt="Guardar" />
                </button>
                <button onClick={cargar} className="load-button">
                    <img src="/cargar.svg" alt="Cargar" />
                </button>
                <button onClick={compileCode} className="compile-button">
                    <img src="/compile-icon.png" alt="Compile" />
                </button>
            </div>
            <textarea
                className="editor-textarea"
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Escribe tu código aquí..."
            />
        </div>
    );
};

export default EditorArea;