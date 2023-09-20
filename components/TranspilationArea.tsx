// components/TranspilationArea.tsx
import React from 'react';

interface Props {
    transpiledCode: string;
    setResponse: (response: string) => void;
}

const TranspilationArea: React.FC<Props> = ({ transpiledCode, setResponse }) => {
    
    const handleEvalClick = async () => {
        try {
          const response = await fetch('/eval', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: transpiledCode }),
          });
    
          const data = await response.json();
          setResponse(data.result);
        } catch (error) {
        const dummyResponse = `Probando eval`;
        setResponse(dummyResponse);
          console.error('Error al evaluar el código:', error);
        }
    };
    
    return (
        <div className="transpilation-container">
            <div className="transpilation-header">
                <h3>Área de Transpilación</h3>
                <button onClick={handleEvalClick}>Evaluar</button>
            </div>
            <textarea
                className="transpilation-textarea"
                value={transpiledCode}
                readOnly
                placeholder="Aquí se mostrará el código transpilado..."
            />
        </div>
    );
};

export default TranspilationArea;
