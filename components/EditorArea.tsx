//compenent/editorarea.tsx

import React, { useState, useEffect, useMemo, useRef, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { EditorInfo, EditorInfoContext } from './EditorInfo';
import CompileButton from './CompilerButton';
import SaveButton from './SaveButton';    
import ChangeButton from './ChangeButton';
import ClearButton from './ClearButton';
import StopButton from './StopButton';
import ChargeButton from './ChargeButton';
import Autocomplete from './Autocomplete';

interface EditorAreaProps {
  setTranspiledCode: (code: string) => void;
  setResponse: (code: string) => void;
}

const EditorArea: React.FC<EditorAreaProps> = ({ setTranspiledCode, setResponse }) => {
  let [editorContent, setEditorContent] = useState<string>('');
  let [inputValue, setInputValue] = useState<string>('');
  let [cursorLine, setCursorLine] = useState<number>(1);
  let [isSaved, setIsSaved] = useState<boolean>(false);
  let [compileRequested, setCompileRequested] = useState<boolean>(false);
  let [cursorPosition, setCursorPosition] = useState<number>(0);
  let [showSuggestions, setShowSuggestions] = useState(false);
  
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCompileClick = () => setCompileRequested(true);
  const handleCompilationComplete = () => setCompileRequested(false);

  const updateLineNumbers = () => {
    const lines = editorContent.split('\n').length;
    return [...Array(lines)].map((_, i) => `${i + 1}\n`).join('');
  };

  let [lineNumbers, setLineNumbers] = useState<string>(updateLineNumbers());

  useEffect(() => {
    setLineNumbers(updateLineNumbers());
    setCursorLine(editorContent.split('\n').length);
  }, [editorContent]);

  const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setIsSaved(false);
  };

  const handleCursorChange = (e: MouseEvent<HTMLTextAreaElement>) => {
    const cursorPos = (e.target as HTMLTextAreaElement).selectionStart;
    const prevText = editorContent.substring(0, cursorPos);
    setCursorLine(prevText.split('\n').length);
    setCursorPosition((e.target as HTMLTextAreaElement).selectionStart);
  };

  const handleSuggestionSelected = (suggestion: string) => {
    const cursorPos = cursorPosition;
    const beforeCursor = editorContent.substring(0, cursorPos);
    const afterCursor = editorContent.substring(cursorPos);

    // Encuentra la posición de inicio de la palabra actual
    const startOfCurrentWord = beforeCursor.lastIndexOf(' ') + 1;
    const beforeWord = beforeCursor.substring(0, startOfCurrentWord);
    const afterWord = afterCursor.substring(afterCursor.indexOf(' '));
    const newContent = beforeWord + suggestion + (afterWord.startsWith(' ') ? afterWord : ' ' + afterWord);

    setEditorContent(newContent);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const arrowKeys = ['ArrowUp', 'ArrowDown'];
    const isArrowKey = arrowKeys.includes(e.key);
    const cursorPos = (e.target as HTMLTextAreaElement).selectionStart;
    const prevText = editorContent.substring(0, cursorPos);
    const newCursorLine = isArrowKey ? prevText.split('\n').length : cursorLine;
    setCursorLine(newCursorLine);
  };

  useEffect(() => {
    const lineNumbers = lineNumbersRef.current;
    const editorTextarea = editorTextareaRef.current;
  
    if (lineNumbers && editorTextarea) {
      const resizeObserver = new ResizeObserver(() => {
        const textareaHeight = editorTextarea.clientHeight;
        lineNumbers.style.height = `${textareaHeight - 10}px`;
      });
  
      resizeObserver.observe(editorTextarea);
  
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const textarea = editorTextareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const linesCount = textarea.value.split('\n').length;
        const lineHeight = 19.15;
        textarea.style.height = `${Math.max(linesCount * lineHeight, 300)}px`;
      }
    };

    const textarea = editorTextareaRef.current;
    if (textarea) {
      textarea.addEventListener('input', handleScroll);

      return () => {
        textarea.removeEventListener('input', handleScroll);
      };
    }
  }, []);

  const clear = () => {
    setEditorContent('');
    setInputValue('');
    setIsSaved(false);
  };

  const totalLines = editorContent.split('\n').length;
  const totalWords = editorContent.split(/\s+/).filter((word) => word !== '').length;

  const editorInfo = useMemo(() => ({
    id: inputValue,
    cursorLine: cursorLine,
    totalLines: totalLines,
    totalWords: totalWords,
    isSaved: isSaved,
  }), [inputValue, cursorLine, totalLines, totalWords, isSaved]);

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h3 className="editor-title">Área de Edición</h3>
        <input
          type="text"
          placeholder="Id del código"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="custom-input-placeholder"
        />
        <ClearButton onClear={clear} />
        <ChangeButton inputValue={inputValue} setInputValue={setInputValue} editorContent={editorContent}/>
        <SaveButton inputValue={inputValue} editorContent={editorContent} setSaveOnClick={setIsSaved} />
        <ChargeButton inputValue={inputValue} setEditorContent={setEditorContent} />
        <StopButton setTranspiledCode={setTranspiledCode} setResponse={setResponse}/>
        <CompileButton setTranspiledCode={setTranspiledCode} editorContent={editorContent} />
      </div>
      <div className="editor-content">
        <div className="line-numbers" ref={lineNumbersRef}>
          <pre>{lineNumbers}</pre>
        </div>
        <textarea
          className="editor-textarea"
          ref={editorTextareaRef}
          value={editorContent}
          onChange={handleEditorChange}
          onKeyUp={handleKeyUp}
          onSelect={handleCursorChange}
          onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          placeholder="Escribe tu código aquí..."
        />  
      </div>
      <EditorInfoContext.Provider value={editorInfo}>
        <EditorInfo/>
      </EditorInfoContext.Provider>
      <Autocomplete inputValue={editorContent} cursorPosition={cursorPosition} onSuggestionSelected={handleSuggestionSelected} showSuggestions={showSuggestions} />
    </div>
  );
};

export default EditorArea;
