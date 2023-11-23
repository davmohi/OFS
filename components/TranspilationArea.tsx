// components/Transpilation.tsx

import React, { useState, useEffect, useMemo,useRef } from 'react';
import LineNumbers from './cee/LineNumbers';
import { EditorInfo, EditorInfoContext } from './cee/EditorInfo';
import Modal from './modals/Modal';

//Define types for the props used
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
  const transpilationTextareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

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
  const [disableButton, setDisableButton] = useState<boolean>(true);

  // Adjust line number container height based on textarea height
  useEffect(() => {
    const lineNumbers = lineNumbersRef.current;
    const editorTextarea = transpilationTextareaRef.current;
  
    lineNumbers && editorTextarea
    ?(() =>{
      const resizeObserver = new ResizeObserver(() => {
        const textareaHeight = editorTextarea.clientHeight;
        lineNumbers.style.height = `${textareaHeight - 10}px`;
      });
  
      resizeObserver.observe(editorTextarea);

      return () => {
        resizeObserver.disconnect();
      };
    })()
    :null

    setDisableButton(transpiledCode.trim() === '');
  }, [transpiledCode]);

  // Adjust textarea height based on its content whenever transpiledCode changes
  useEffect(() => {
    const transpilationTextarea = transpilationTextareaRef.current;

    transpilationTextarea 
    ? (() => {
      const adjustTextareaHeight = () => {
        transpilationTextarea.style.height = 'auto'; // Temporalmente ajusta la altura a 'auto' para obtener el scrollHeight correcto
        const linesCount = transpilationTextarea.value.split('\n').length;
        const lineHeight = 19.15; // Asegúrate de ajustar este valor según el lineHeight real de tu textarea
        const extraHeight = 10; // Puedes ajustar este valor según sea necesario
        transpilationTextarea.style.height = `${Math.max(linesCount * lineHeight, 300) + extraHeight}px`;
      };
      
      adjustTextareaHeight(); // Ajusta la altura inicialmente
    })()
    : null;
  }, [transpiledCode]);


  // Function to evaluate the code
  const evaluateCode = async () => {
    const isEmptyTranspiledCode = transpiledCode.trim() === '';

    try {
      isEmptyTranspiledCode ? (() => {
        throw new Error('El contenido del transpilador está vacío. Compile el código antes de evaluar.');
      })() : null;
      
      const response = await fetch('/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: transpiledCode, fileName: fileName }),
      });

      response.ok
      ?(setSuccessMessage('Evaluado exitosamente'),
      setIsSuccessModalOpen(true))
      :(()=>{
        throw new Error('Error al evaluar el código');
      })()
      const data = await response.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      error instanceof Error
      ?(setErrorMessage(`Error al evaluar el código: ${error.message}`),
      setIsErrorModalOpen(true))
      :null
    }
  };

  return (
    <div className="transpilation-container">
      <div className="transpilation-header">
        <h3>Transpilation Area</h3>
        <input type="text" value={fileName} readOnly />
        <button onClick={evaluateCode} title='Evaluar' disabled={disableButton}>
          <img className="disabled-image" src="/compile-icon.png" alt="Compile" draggable="false"/>
        </button>
      </div>
      <div className="transpilation-content">
        <LineNumbers editorContent={transpiledCode} />
        <textarea
          className="transpilation-textarea"
          value={transpiledCode}
          ref = {transpilationTextareaRef}
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