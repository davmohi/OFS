//components/CompilerButton.tsx

import React, { useState } from 'react';
import Modal from '../modals/Modal';

// Define types for the compile button props
interface CompileButtonProps {
    setTranspiledCode: (code: string) => void;
    editorContent: string;
    inputValue: string;
    setFileName: (code: string) => void;
}

const CompileButton: React.FC<CompileButtonProps> = ({ setTranspiledCode, editorContent, inputValue, setFileName }) => {
    const [isCompiling, setIsCompiling] = useState(false);
    const [isContentEmptyModalOpen, setIsContentEmptyModalOpen] = useState(false);
    const [isInputValueEmptyModalOpen, setIsInputValueEmptyModalOpen] = useState(false);
    const [errorTraspilation, setErrorTraspilation] = useState(false);
    const [errorMessageTraspilation, setWrrorMessageTraspilation] = useState('');
    // Function to show a modal with a message
    const showModal = (message: string) => {
        setIsContentEmptyModalOpen(true);
        setTimeout(() => setIsContentEmptyModalOpen(false), 3000);
    };

    // Function to handle compilation errors and show a modal
    const handleCompilationError = (message: string) => {
        setIsInputValueEmptyModalOpen(true);
        showModal(message);
    };

    // Function to compile the code
    const compileCode = async () => {
        const isEditorContentEmpty = editorContent.trim() === '';
        const isInputValueEmpty = inputValue.trim() === '';
        isEditorContentEmpty
        ?handleCompilationError("The editor content is empty. Please enter code before compiling.")
        :(setIsCompiling(true),
        async () => {
            try {
                const response = await fetch('/api/compile', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ content: editorContent, id: isInputValueEmpty ? "undefined" : inputValue })
                });
              
                const data = await response.json();
              
                if (data.error) {
                  console.error(`Compilation error: ${data.error}`);
                  setErrorTraspilation(true);
                  setWrrorMessageTraspilation(data.error);
                } else {
                  setFileName(data?.filename || '');
                  setTranspiledCode(data?.content || '');
                }
              } catch (error) {
                console.error('Network error:', error);
                setErrorTraspilation(true);

              } finally {
                setIsCompiling(false);
            }
        })()
    };

    return (
        <div>
            <button onClick={compileCode} title="Compile">
                <img src="/compile-icon.png" alt="Compile" draggable="false"/>
            </button>

            <Modal
                isOpen={isInputValueEmptyModalOpen || isContentEmptyModalOpen}
                onClose={() => {
                    setIsInputValueEmptyModalOpen(false);
                    setIsContentEmptyModalOpen(false);
                }}
                title="Warning"
                content="El contenido del editor está vacio. Ingrese el código y una identificación antes de compilar."
            />
            <Modal
                isOpen={errorTraspilation}
                onClose={() => {
                    setErrorTraspilation(false);
                }}
                title="Warning"
                content={`Error: ${errorMessageTraspilation}.`}
            />
        </div>
    );
};

export default CompileButton;