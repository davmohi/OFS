//components/CompilerButton.tsx

import React, { useState } from 'react';
import Modal from '../modals/Modal';

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

        if (isEditorContentEmpty) {
            handleCompilationError("The editor content is empty. Please enter code before compiling.");
        } else if (isInputValueEmpty) {
            handleCompilationError("The ID field is empty. Please enter an ID before compiling.");
        } else {
            setIsCompiling(true);
            try {
                const response = await fetch('/api/compile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: editorContent, id: inputValue })
                });

                const data = response.ok ? await response.json() : null;

                setFileName(data?.filename || ''); 
                setTranspiledCode(data?.content || '');

                if (!response.ok) {
                    console.error("Compilation error");
                }
            } catch (error) {
                console.error("Compilation error", error);
            } finally {
                setIsCompiling(false);
            }
        }
    };

    return (
        <div>
            <button onClick={compileCode} title="Compile">
                <img src="/compile-icon.png" alt="Compile" />
            </button>

            <Modal
                isOpen={isInputValueEmptyModalOpen || isContentEmptyModalOpen}
                onClose={() => {
                    setIsInputValueEmptyModalOpen(false);
                    setIsContentEmptyModalOpen(false);
                }}
                title="Warning"
                content="El contenido del editor o el ID están vacíos. Ingrese el código y una identificación antes de compilar."
            />
        </div>
    );
};

export default CompileButton;