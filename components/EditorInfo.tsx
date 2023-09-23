import React from 'react';

interface EditorInfoProps {
    name: string;
    cursorLine: number;
    totalLines: number;
    totalWords: number;
    isSaved: boolean;
}

const EditorInfo: React.FC<EditorInfoProps> = ({ name, cursorLine, totalLines, totalWords, isSaved }) => {
    return (
        <div className="editor-info">
            <p>Nombre: {name}</p>
            <p>Línea del Cursor: {cursorLine}</p>
            <p>Número Total de Líneas: {totalLines}</p>
            <p>Número Total de Palabras: {totalWords}</p>
            <p>Estado: {isSaved ? 'Guardado' : 'No Guardado'}</p>
        </div>
    );
};

export default EditorInfo;
