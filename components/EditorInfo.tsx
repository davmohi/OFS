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
      <p className='editor-info-p'>TotalLíneas: {editorInfo.totalLines}</p>
      <p className='editor-info-p'>TotalPalabras: {editorInfo.totalWords}</p>
      {showCursorAndSaveInfo && (
        <>
          <p className='editor-info-p'>Linea del cursor: {editorInfo.cursorLine}</p>
          <p className='editor-info-p'>Columna del cursor: {editorInfo.cursorColumn}</p>
          <p className='editor-info-p'>Estado de guardado: {editorInfo.isSaved ? 'Guardado' : 'No guardado'}</p>
        </>
      )}
    </div>
  ) : null;
};

export { EditorInfo, EditorInfoContext };
