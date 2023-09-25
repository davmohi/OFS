// components/EditorInfo.tsx

import React, { useContext } from 'react';

interface EditorInfoData {
  id: string;
  cursorLine: number;
  cursorColumn: number;
  totalLines: number;
  totalWords: number;
  isSaved: boolean;
}

interface EditorInfoProps {
  showCursorAndSaveInfo?: boolean;
}

const EditorInfoContext = React.createContext<EditorInfoData | null>(null);

const EditorInfo: React.FC<EditorInfoProps> = ({ showCursorAndSaveInfo = true }) => {
  const editorInfo = useContext(EditorInfoContext);

  return editorInfo ? (
    <div className="editor-info" style={{ display: 'flex' }}>
      <p className='editor-info-p'>ID: {editorInfo.id}</p>
      <p className='editor-info-p'>Líneas: {editorInfo.totalLines}</p>
      <p className='editor-info-p'>Palabras: {editorInfo.totalWords}</p>
      {showCursorAndSaveInfo && (
        <>
          <p className='editor-info-p'>Linea: {editorInfo.cursorLine}</p>
          <p className='editor-info-p'>Columna: {editorInfo.cursorColumn}</p>
          <p className='editor-info-p'>Guardado: {editorInfo.isSaved ? 'Si' : 'No'}</p>
        </>
      )}
    </div>
  ) : null;
};

export { EditorInfo, EditorInfoContext };
