import React, { useContext } from 'react';

interface EditorInfoData {
  id: string;
  cursorLine: number;
  totalLines: number;
  totalWords: number;
  isSaved: boolean;
}

const EditorInfoContext = React.createContext<EditorInfoData | null>(null);

const EditorInfo: React.FC = () => {
  const editorInfo = useContext(EditorInfoContext);

  return editorInfo ? (
    <div className="editor-info" style={{ display: 'flex' }}>
      <p className='editor-info-p'>ID: {editorInfo.id}</p>
      <p className='editor-info-p'>LíneaCursor: {editorInfo.cursorLine}</p>
      <p className='editor-info-p'>TotalLíneas: {editorInfo.totalLines}</p>
      <p className='editor-info-p'>TotalPalabras: {editorInfo.totalWords}</p>
      <p className='editor-info-p'>Guardado: {editorInfo.isSaved ? 'Sí' : 'No'}</p>
    </div>
  ) : null;
};

export { EditorInfo, EditorInfoContext };
