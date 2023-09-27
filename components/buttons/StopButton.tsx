//components/StopButton.tsx
import React from 'react';

interface StopButtonProps {
  setTranspiledCode: React.Dispatch<string>;
  setResponse: React.Dispatch<string>;
  setFileName:(code: string) => void;
}

const StopButton: React.FC<StopButtonProps> = ({ setTranspiledCode, setResponse, setFileName }) => {
  const handleStopClick = () => {
    setTranspiledCode('');
    setResponse('');
    setFileName('');
  };

  return (
    <button onClick={handleStopClick} title="Detener">
      <img src="/stop.svg" alt="Stop" style={{ height: '16px' }} />
    </button>
  );
};

export default StopButton;