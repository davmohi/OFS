//components/TranspilationArea.tsx

import React, { useState, useEffect, useMemo } from 'react';
import LineNumbers from './LineNumbers';
import { EditorInfo, EditorInfoContext } from './EditorInfo';

interface Props {
  transpiledCode: string;
  setResponse: (response: string) => void;
  fileName: string;
}

const TranspilationArea: React.FC<Props> = ({ transpiledCode, setResponse, fileName }) => {

  const [cursorLine, setCursorLine] = useState<number>(1);
  const [cursorColumn, setCursorColumn] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  useEffect(() => {
    setCursorLine(transpiledCode.split('\n').length);
  }, [transpiledCode]);

  const totalLines = transpiledCode.split('\n').length;
  const totalWords = transpiledCode.split(/\s+/).filter((word) => word !== '').length;

  const editorInfo = useMemo(() => ({
      id: fileName,
      cursorLine: cursorLine,
      cursorColumn: cursorColumn,
      totalLines: totalLines,
      totalWords: totalWords,
      isSaved: isSaved
    }), [fileName, cursorLine, cursorColumn, totalLines, totalWords, isSaved]);

  const evaluateCode = async () => {
    try {
      const response = await fetch('/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: transpiledCode }),
      });

      const data = await response.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.error('Error al evaluar el código:', error);
    }
  };

  return (
    <div className="transpilation-container">
      <div className="transpilation-header">
        <h3>Área de Transpilación</h3>
        <input type="text" value={fileName} readOnly />
        <button onClick={evaluateCode}>
          <img src="/compile-icon.png" alt="Compile" />
        </button>
      </div>
      <div className="transpilation-content">
        <LineNumbers editorContent={transpiledCode} />
        <textarea
          className="transpilation-textarea"
          value={transpiledCode}
          readOnly
          placeholder="Aquí se mostrará el código transpilado..."
        />
      </div>
      <EditorInfoContext.Provider value={editorInfo}>
        <EditorInfo showCursorAndSaveInfo={false} />
      </EditorInfoContext.Provider>
    </div>
  );
};

export default TranspilationArea;