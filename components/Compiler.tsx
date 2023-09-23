// Compiler.tsx
import React, { useEffect } from 'react';

const Compiler: React.FC<{ content: string, setTranspiledCode: (code: string) => void }> = ({ content, setTranspiledCode }) => {
    useEffect(() => {
        const compileCode = async () => {
            try {
                const response = await fetch('/api/compile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content })
                });

                const data = response.ok ? await response.json() : null;
                // Convierte el JSON a una cadena
                const stringifiedData = data;
                setTranspiledCode(stringifiedData);

                if (!response.ok) {
                    console.error("Error al compilar");
                }
            } catch (error) {
                console.error("Error al compilar", error);
            }
        };

        compileCode(); // Llama a la función de compilación cuando el componente se monta

    }, [content, setTranspiledCode]);

    return null; // Este componente no renderiza nada, solo realiza la compilación
};

export default Compiler;
