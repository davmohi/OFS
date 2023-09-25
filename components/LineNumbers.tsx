// components/LineNumbers.tsx
import React, { useEffect, useState } from 'react';

interface LineNumbersProps {
  editorContent: string;
}

const LineNumbers: React.FC<LineNumbersProps> = ({ editorContent }) => {
  const [lineNumbers, setLineNumbers] = useState<string>('');

  const updateLineNumbers = () => {
    const lines = editorContent.split('\n').length;
    return [...Array(lines)].map((_, i) => `${i + 1}\n`).join('');
  };

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
