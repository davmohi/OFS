// CompileButton.tsx
import React, { useState } from 'react';

const CompileButton: React.FC<{ setTranspiledCode: (code: string) => void, editorContent: string }> = ({ setTranspiledCode, editorContent }) => {
    const [isCompiling, setIsCompiling] = useState(false);

    const compileCode = async () => {
        setIsCompiling(true);
        try {
            const response = await fetch('/api/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editorContent })
            });

            const data = response.ok ? await response.json() : null;
            // JSON to string
            const stringifiedData = data;
            setTranspiledCode(stringifiedData);

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
