// components/EditorArea.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { EditorInfo, EditorInfoContext } from './EditorInfo';
import Compiler from './CompilerButton';
import SaveButton from './SaveButton';    
import ChangeButton from './ChangeButton';
import ClearButton from './ClearButton';
import StopButton from './StopButton';
import ChargeButton from './ChargeButton';

const EditorArea: React.FC<{ setTranspiledCode: (code: string) => void; setResponse: (code: string) => void }> = ({ setTranspiledCode,setResponse }) => {
    const [editorContent, setEditorContent] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [cursorLine, setCursorLine] = useState(1);
    const [isSaved, setIsSaved] = useState(false);
    const [compileRequested, setCompileRequested] = useState(false); //Estado del component CompilerButton 
    const [saveOnClick, setSaveOnClick] = useState(false);//Estado del component SaveButton
    const lineNumbersRef = useRef(null);
    const editorTextareaRef = useRef(null);


    const handleCompileClick = () => {
        setCompileRequested(true);
    };
    const handleCompilationComplete = () => {
        setCompileRequested(false);
    };

    
    

    const charge = async () => {
        if (!inputValue) {
            alert('El ID es requerido');
            return;
        }
        try {
            const response = await fetch(`/api/script/${inputValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                alert('No se pudo encontrar el script')
            }
            else {
                const data = await response.json()
                setEditorContent(data.content)
            }
        } catch (error) {
            console.error("Error al cargar", error);
        }
    };


    
    const updateLineNumbers = () => {
        const lines = editorContent.split('\n').length;
        let lineNumbers = '';
        for (let i = 1; i <= lines; i++) {
            lineNumbers += i + '\n';
        }
        
        return lineNumbers;
    };
    
    const [lineNumbers, setLineNumbers] = useState(updateLineNumbers());

    useEffect(() => {
        setLineNumbers(updateLineNumbers());
        setCursorLine(editorContent.split('\n').length);
    }, [editorContent]);
    
    const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditorContent(e.target.value);
        setIsSaved(false)
    };

    const handleCursorChange = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const cursorPos = (e.target as HTMLTextAreaElement).selectionStart;
        const prevText = editorContent.substring(0, cursorPos);
        setCursorLine(prevText.split('\n').length);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Verificar si la tecla presionada es una flecha hacia arriba o hacia abajo
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // Calcular la nueva posición del cursor y actualizar cursorLine
            const cursorPos = (e.target as HTMLTextAreaElement).selectionStart;
            const prevText = editorContent.substring(0, cursorPos);
            setCursorLine(prevText.split('\n').length);
        }
    };

    const clear = () => {
        setEditorContent(''); // Limpia el contenido del editor
        setInputValue(''); // Limpia el input del ID
        setIsSaved(false);
      };
    // Calcula el número total de líneas y palabras en EA
    const totalLines = editorContent.split('\n').length;
    const totalWords = editorContent.split(/\s+/).filter((word) => word !== '').length;

  // Proporciona los datos al contexto
    const editorInfo = useMemo(() => {
    return {
      id: inputValue,
      cursorLine: cursorLine,
      totalLines: totalLines,
      totalWords: totalWords,
      isSaved: isSaved,
    };
  }, [inputValue, cursorLine, totalLines, totalWords, isSaved]);
    return (
        <div className="editor-container">
            <div className="editor-header">
                <h3 className="editor-title">Área de Edición</h3>
                <input
                    type="text"
                    placeholder="Id del codigo"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="custom-input-placeholder"
                />
                <ClearButton onClear={clear} />
                <ChangeButton inputValue={inputValue} setInputValue={setInputValue} editorContent={editorContent}/>
                <SaveButton inputValue={inputValue} editorContent={editorContent} setSaveOnClick={setIsSaved} />
                <ChargeButton inputValue={inputValue} setEditorContent={setEditorContent} />
                <StopButton setTranspiledCode={setTranspiledCode} setResponse={setResponse}/>
                <button onClick={handleCompileClick} title="Transpilar">
                    <img src="/compile-icon.png" alt="Compile" />
                </button>
                {compileRequested && (
                <Compiler
                    content={editorContent}
                    setTranspiledCode={(code) => {
                        setTranspiledCode(code);
                        handleCompilationComplete();
                    }}
                />
            )}
            
            </div>
            <div className="editor-content">
                <div className="line-numbers">
                    <pre>{lineNumbers}</pre>
                </div>
                <textarea
                    className="editor-textarea"
                    value={editorContent}
                    onChange={handleEditorChange}
                    onClick={handleCursorChange}
                    onKeyUp={handleKeyUp}
                    placeholder="Escribe tu código aquí..."
                />  
            </div>
            <EditorInfoContext.Provider value={editorInfo}>
                <EditorInfo/>
            </EditorInfoContext.Provider>
        </div>
    );
};

export default EditorArea;