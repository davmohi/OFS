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

    // Function to compile the code
    const compileCode = async () => {
        if (editorContent.trim() === '') {
            setIsContentEmptyModalOpen(true);
            return;
        }

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
    };

    return (
        <div>
            <button onClick={compileCode} title="Compilar">
                <img src="/compile-icon.png" alt="Compile" />
            </button>

            {/* Warning modal if the editor content is empty */}
            <Modal
                isOpen={isContentEmptyModalOpen}
                onClose={() => setIsContentEmptyModalOpen(false)}
                title="Warning"
                content="El contenido del editor está vacío. Por favor ingrese el código antes de compilar."
            />
        </div>
    );
};

export default CompileButton;
