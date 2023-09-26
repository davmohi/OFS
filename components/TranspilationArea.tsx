//components/TranspilationArea.tsx

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
  // State for cursor position and save status
  const [cursorLine, setCursorLine] = useState<number>(1);
  const [cursorColumn, setCursorColumn] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // Update cursorLine based on transpiledCode changes
  useEffect(() => {
    setCursorLine(transpiledCode.split('\n').length);
  }, [transpiledCode]);

  // Calculate total lines and words
  const totalLines = transpiledCode.split('\n').length;
  const totalWords = transpiledCode.split(/\s+/).filter((word) => word !== '').length;

  // Create editorInfo object to provide context to children components
  const editorInfo = useMemo(() => ({
    id: fileName,
    cursorLine,
    cursorColumn,
    totalLines,
    totalWords,
    isSaved,
  }), [fileName, cursorLine, cursorColumn, totalLines, totalWords, isSaved]);

  // Handle code evaluation
  const evaluateCode = async () => {
    const isEmptyTranspiledCode = transpiledCode.trim() === '';

    try {
      if (isEmptyTranspiledCode) {
        throw new Error('El contenido del transpilador está vacío. Compile el código antes de evaluarlo.');
      }

      // Send a request to evaluate the code
      const response = await fetch('/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: transpiledCode }),
      });

      // Parse and set the response data
      const data = await response.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      if (error instanceof Error) {
        // Handle and display the error using a modal
        setErrorMessage(`Error al evaluar el código: ${error.message}`);
      }
    } finally {
      // Open the error modal
      setIsErrorModalOpen(true);
    }
  };

  // State for error modal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    </div>
  );
};

export default TranspilationArea;