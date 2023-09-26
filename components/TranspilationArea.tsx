// components/Transpilation.tsx

import React, { useState, useEffect, useMemo } from 'react';
import LineNumbers from './cee/LineNumbers';
import { EditorInfo, EditorInfoContext } from './cee/EditorInfo';
import Modal from './modals/Modal';

interface Props {
  transpiledCode: string;
  setResponse: (response: string) => void;
  fileName: string;
}

const TranspilationArea: React.FC<Props> = ({ transpiledCode, setResponse, fileName }) => {
  // Constants for editor states and data
  const [cursorLine, setCursorLine] = useState<number>(1);
  const [cursorColumn, setCursorColumn] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const totalLines = transpiledCode.split('\n').length;
  const totalWords = transpiledCode.split(/\s+/).filter((word) => word !== '').length;

  const editorInfo = useMemo(() => ({
    id: fileName,
    cursorLine,
    cursorColumn,
    totalLines,
    totalWords,
    isSaved,
  }), [fileName, cursorLine, cursorColumn, totalLines, totalWords, isSaved]);

  // Constants for error and success modals
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Function to evaluate the code
  const evaluateCode = async () => {
    const isEmptyTranspiledCode = transpiledCode.trim() === '';

    try {
      if (isEmptyTranspiledCode) throw new Error('El contenido del transpilador está vacío. Compile el código antes de evaluar.');

      const response = await fetch('/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: transpiledCode }),
      });

      if (response.ok) {
        setSuccessMessage('Eval_Fake read');
        setIsSuccessModalOpen(true);
      } else {
        throw new Error('Error al evaluar el código');
      }

      const data = await response.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Error al evaluar el código: ${error.message}`);
        setIsErrorModalOpen(true);
      }
    }
  };

  return (
    <div className="transpilation-container">
      <div className="transpilation-header">
        <h3>Transpilation Area</h3>
        <input type="text" value={fileName} readOnly />
        <button onClick={evaluateCode} title='Evaluar'>
          <img src="/compile-icon.png" alt="Compile" />
        </button>
      </div>
      <div className="transpilation-content">
        <LineNumbers editorContent={transpiledCode} />
        <textarea
          className="transpilation-textarea"
          value={transpiledCode}
          readOnly
          placeholder="El código transpilado se mostrará aquí..."
        />
      </div>
      <EditorInfoContext.Provider value={editorInfo}>
        <EditorInfo showCursorAndSaveInfo={false} />
      </EditorInfoContext.Provider>
      {isErrorModalOpen && (
        <Modal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          title="Warning"
          content={errorMessage}
        />
      )}
      {isSuccessModalOpen && (
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="Success"
          content={successMessage}
        />
      )}
    </div>
  );
};

export default TranspilationArea;