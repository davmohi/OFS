// components/EditorInfo.tsx
import React, { useContext } from 'react';

// Creamos un contexto para los datos del editor
const EditorInfoContext = React.createContext<{
  id: string;
  cursorLine: number;
  totalLines: number;
  totalWords: number;
  isSaved: boolean;
} | null>(null);

// Componente que muestra la información del editor
const EditorInfo: React.FC = () => {
  // Usamos useContext para acceder a los datos del contexto
  const editorInfo = useContext(EditorInfoContext);

  if (!editorInfo) {
    return null;
  }

  return (
    <div className="editor-info" style={{ display: 'flex' }}>
        <p className='editor-info-p'>ID: {editorInfo.id}</p>
        <p className='editor-info-p'>LíneaCursor: {editorInfo.cursorLine}</p>
        <p className='editor-info-p'>TotalLíneas: {editorInfo.totalLines}</p>
        <p className='editor-info-p'>TotalPalabras: {editorInfo.totalWords}</p>
        <p className='editor-info-p'>Guardado: {editorInfo.isSaved ? 'Sí' : 'No'}</p>
    </div>
);



};

export { EditorInfo, EditorInfoContext };
