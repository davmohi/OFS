import React from 'react';

const StopButton: React.FC<{
    setTranspiledCode: React.Dispatch<string>;
    setResponse: React.Dispatch<string>
}> = ({setTranspiledCode, setResponse}) =>{

    const handleClick = async () =>{
        setTranspiledCode('');
        setResponse('');
    }
    return(
        <button onClick={handleClick} title="Stop">
      <img src="/stop.svg" alt="Stop" />
    </button>
    );
}

export default StopButton;