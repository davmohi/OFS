// CompileButton.tsx
import React, { useState } from 'react';
interface CompileButtonProps {
    setTranspiledCode: (code: string) => void;
    editorContent: string;
    inputValue: string;
    setFileName: (code: string) => void;
}

const CompileButton: React.FC<CompileButtonProps> = ({ setTranspiledCode, editorContent, inputValue, setFileName }) => {
    const [isCompiling, setIsCompiling] = useState(false);

    const compileCode = async () => {
        setIsCompiling(true);
        try {
            const response = await fetch('/api/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editorContent, id:inputValue })
            });

            const data = response.ok ? await response.json() : null;
            // JSON to string
            setFileName(data.filename);
            setTranspiledCode(data.content);

            if (!response.ok) {
                console.error("Error al compilar");
            }
        } catch (error) {
            console.error("Error al compilar", error);
        } finally {
            setIsCompiling(false);
        }
    };

    return (
        <div>
            <button onClick={compileCode} title="Transpilar">
            <img src="/compile-icon.png" alt="Compile" />
            </button>
        </div>
    );
};

export default CompileButton;
