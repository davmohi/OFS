// components/ResponseArea.tsx

import React from 'react';

// ResponseArea component
const ResponseArea: React.FC<{ responseText: string }> = ({ responseText }) =>  (
        <div className="response-container">
            <h3>Área de Respuesta</h3>
            <textarea
                className="response-textarea"
                value={responseText}
                readOnly
                placeholder="Aquí se mostrará la respuesta de la ejecución..."
            />
        </div>
    );

export default ResponseArea;
