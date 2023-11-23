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
// components/LineNumbers.tsx
import React, { useEffect, useState } from 'react';

// LineNumbers component that displays line numbers for the editor content
interface LineNumbersProps {
  editorContent: string;
}

const LineNumbers: React.FC<LineNumbersProps> = ({ editorContent }) => {
  const [lineNumbers, setLineNumbers] = useState<string>('');

  // Function to update the line numbers based on the editor content
  const updateLineNumbers = () => {
    const lines = editorContent.split('\n').length;
    return [...Array(lines)].map((_, i) => `${i + 1}\n`).join('');
  };

  // Use useEffect to update line numbers when the editor content changes
  useEffect(() => {
    setLineNumbers(updateLineNumbers());
  }, [editorContent]);

  return (
    <div className="line-numbers">
      <pre>{lineNumbers}</pre>
    </div>
  );
};

export default LineNumbers;
