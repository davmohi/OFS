// components/TranspilationArea.tsx
import React from 'react';

const TranspilationArea: React.FC<{ transpiledCode: string }> = ({ transpiledCode }) => {
    return (
        <div className="transpilation-container">
            <h3>Área de Transpilación</h3>
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
