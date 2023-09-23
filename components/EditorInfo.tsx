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
        <p style={{ marginRight: '40px',marginTop: '10px',marginLeft:'10px' }}>ID: {editorInfo.id}</p>
        <p style={{ marginRight: '40px', marginTop: '10px'}}>LíneaCursor: {editorInfo.cursorLine}</p>
        <p style={{ marginRight: '40px', marginTop: '10px'}}>TotalLíneas: {editorInfo.totalLines}</p>
        <p style={{ marginRight: '40px',marginTop: '10px' }}>TotalPalabras: {editorInfo.totalWords}</p>
        <p style={{ marginTop: '10px' }}>Guardado: {editorInfo.isSaved ? 'Sí' : 'No'}</p>
    </div>
);



};

export { EditorInfo, EditorInfoContext };
