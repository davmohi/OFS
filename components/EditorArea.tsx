// components/EditorArea.tsx
import React, { useState } from 'react';

const EditorArea: React.FC<{ setTranspiledCode: (code: string) => void }> = ({ setTranspiledCode }) => {
    const [editorContent, setEditorContent] = useState('');

    const handleCompileClick = async () => {
        try {
            const response = await fetch('/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editorContent })
            });
            const data = await response.json();
            setTranspiledCode(data.transpiledContent);
        } catch (error) {
            const timestamp = new Date().toISOString();
            const dummyResponse = `${editorContent}\n\nTimestamp: ${timestamp}`;
            setTranspiledCode(dummyResponse);
            console.error("Error al compilar", error);
        }
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h3 className="editor-title">Área de Edición</h3>
                <button onClick={handleCompileClick} className="compile-button">
                    <img src="/compile-icon.png" alt="Compile" /> {/* Asegúrate de tener un ícono adecuado */}
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
