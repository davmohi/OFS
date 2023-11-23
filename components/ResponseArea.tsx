/* 
University: Universidad Nacional
School: Escuela de Informatica
Course: Paradigmas de Programación EIF 400
Semester: 2 Year: 2023
Team 02-1pm 
Members:
Luis Lopez Castro id: 402420889
Anderson Mora Aguero id: 115600170
David Morales Hidalgo id: 116300616
Alberto Aguero Herdocia id: 118450651
Project: OneFlowStream (OFS)
*/
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
