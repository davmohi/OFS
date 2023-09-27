//components/EditorArea.tsx
import React, { useState, useEffect, useMemo, useRef, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { EditorInfo, EditorInfoContext } from './cee/EditorInfo';
import CompileButton from './buttons/CompilerButton';
import SaveButton from './buttons/SaveButton';    
import ChangeButton from './buttons/ChangeButton';
import ClearButton from './buttons/ClearButton';
import StopButton from './buttons/StopButton';
import ChargeButton from './buttons/ChargeButton';
import Autocomplete from './Autocomplete';
import LineNumbers from './cee/LineNumbers';

//Define types for the editor area props
interface EditorAreaProps {
  setTranspiledCode: (code: string) => void;
  setResponse: (code: string) => void;
  setFileName : (code: string) => void;
}

const EditorArea: React.FC<EditorAreaProps> = ({ setTranspiledCode, setResponse, setFileName  }) => {
  const [editorContent, setEditorContent] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [cursorLine, setCursorLine] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [compileRequested, setCompileRequested] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorColumn, setCursorColumn] = useState<number>(1);
  
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Handler to trigger compilation
  const handleCompileClick = () => setCompileRequested(true);

  // Handler for compilation completion
  const handleCompilationComplete = () => setCompileRequested(false);

  // Handler for editor content change
  const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setIsSaved(false);
  };

  // Calculate cursor position and update line and column numbers
  const handleCursorChange = (e: MouseEvent<HTMLTextAreaElement>) => {
    const cursorPos = (e.target as HTMLTextAreaElement).selectionStart;
    const prevText = editorContent.substring(0, cursorPos);
    const currentLine = prevText.split('\n').length;
    const column = cursorLine === 1 ? prevText.length + 1 : prevText.length - prevText.lastIndexOf('\n');
  
    setCursorLine(currentLine);
    setCursorColumn(column);
    setCursorPosition(cursorPos);
  };

  // Handle suggestion selection from autocomplete
  const handleSuggestionSelected = (suggestion: string) => {
    const cursorPos = cursorPosition;
    const beforeCursor = editorContent.substring(0, cursorPos);
    const afterCursor = editorContent.substring(cursorPos);
    const startOfCurrentWord = beforeCursor.lastIndexOf(' ') + 1;
    const beforeWord = beforeCursor.substring(0, startOfCurrentWord);
    const afterWord = afterCursor.indexOf(' ') !== -1 ? afterCursor.substring(afterCursor.indexOf(' ')) : '';
    const newContent = beforeWord + suggestion + (afterWord.startsWith(' ') || afterWord === '' ? afterWord : ' ' + afterWord);

    setEditorContent(newContent);
  };

  // Handle arrow key events for cursor movement
  const handleKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const arrowKeys = ['ArrowUp', 'ArrowDown'];
    const isArrowKey = arrowKeys.includes(e.key);
    const cursorPos = (e.target as HTMLTextAreaElement).selectionStart;
    const prevText = editorContent.substring(0, cursorPos);
    const newCursorLine = isArrowKey ? prevText.split('\n').length : cursorLine;
    setCursorLine(newCursorLine);
  };

  // Adjust line number container height based on textarea height
  useEffect(() => {
    const lineNumbers = lineNumbersRef.current;
    const editorTextarea = editorTextareaRef.current;
  
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
  }, []);

  // Adjust textarea height based on content
  useEffect(() => {
    const handleScroll = () => {
      const textarea = editorTextareaRef.current;

      textarea
      ?(() => {
        console.log("a")
      }
      )()
      :null
    };

    const textarea = editorTextareaRef.current;

    textarea
    ?(textarea.addEventListener('input', handleScroll),
    () => {
      textarea.removeEventListener('input', handleScroll);
    })
    :null
  }, []);

  // Clear editor content and input value
  const clear = () => {
    setEditorContent('');
    setInputValue('');
    setIsSaved(false);
  };

  const totalLines = editorContent.split('\n').length;
  const totalWords = editorContent.split(/\s+/).filter((word) => word !== '').length;

  // Create editor information object
  const editorInfo = useMemo(() => ({
    id: inputValue,
    cursorLine: cursorLine,
    cursorColumn: cursorColumn,
    totalLines: totalLines,
    totalWords: totalWords,
    isSaved: isSaved,
  }), [inputValue, cursorLine, cursorColumn, totalLines, totalWords, isSaved]);

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h3 className="editor-title">Editor Area</h3>
        <input
          type="text"
          placeholder="ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="custom-input-placeholder"
        />
        <ClearButton onClear={clear} />
        <ChangeButton inputValue={inputValue} setInputValue={setInputValue} editorContent={editorContent}/>
        <SaveButton inputValue={inputValue} editorContent={editorContent} setSaveOnClick={setIsSaved} />
        <ChargeButton inputValue={inputValue} setEditorContent={setEditorContent} />
        <StopButton setTranspiledCode={setTranspiledCode} setResponse={setResponse} setFileName={setFileName}/>
        <CompileButton setTranspiledCode={setTranspiledCode} editorContent={editorContent} inputValue={inputValue} setFileName={setFileName}/>
      </div>
      <div className="editor-content">
        <LineNumbers editorContent={editorContent} /> {/* Use the new component here */}
        <textarea
          className="editor-textarea"
          ref={editorTextareaRef}
          value={editorContent}
          onChange={handleEditorChange}
          onKeyUp={handleKeyUp}
          onSelect={handleCursorChange}
          onFocus={() => setTimeout(() => setShowSuggestions(true), 150)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Escribe tu código aquí..."
        />  
      </div>
      <EditorInfoContext.Provider value={editorInfo}>
        <EditorInfo showCursorAndSaveInfo={true} />
      </EditorInfoContext.Provider>
      <Autocomplete inputValue={editorContent} cursorPosition={cursorPosition} onSuggestionSelected={handleSuggestionSelected} showSuggestions={showSuggestions} />
    </div>
  );
};

export default EditorArea;

