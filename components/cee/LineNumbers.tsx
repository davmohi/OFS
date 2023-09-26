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
