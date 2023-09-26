//components/EditorInfo.tsx
import React, { useContext } from 'react';

// Define the data structure for editor information
interface EditorInfoData {
  id: string;
  cursorLine: number;
  cursorColumn: number;
  totalLines: number;
  totalWords: number;
  isSaved: boolean;
}

// Define the props for the EditorInfo component
interface EditorInfoProps {
  showCursorAndSaveInfo?: boolean;
}

// Create a context to provide editor information to child components
const EditorInfoContext = React.createContext<EditorInfoData | null>(null);

// EditorInfo component that displays information about the editor
const EditorInfo: React.FC<EditorInfoProps> = ({ showCursorAndSaveInfo = true }) => {
  // Access editor information from the context
  const editorInfo = useContext(EditorInfoContext);

  return editorInfo ? (
    <div className="editor-info" style={{ display: 'flex' }}>
      <p className='editor-info-p'>ID: {editorInfo.id}</p>
      <p className='editor-info-p'>Linea: {editorInfo.totalLines}</p>
      <p className='editor-info-p'>Palabras: {editorInfo.totalWords}</p>
      {showCursorAndSaveInfo && (
        <>
          <p className='editor-info-p'>Cursor: {editorInfo.cursorLine}</p>
          <p className='editor-info-p'>Columna: {editorInfo.cursorColumn}</p>
          <p className='editor-info-p'>Guardado: {editorInfo.isSaved ? 'Si' : 'No'}</p>
        </>
      )}
    </div>
  ) : null;
};

export { EditorInfo, EditorInfoContext };
