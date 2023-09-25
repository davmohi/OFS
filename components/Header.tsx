import React from 'react';
import AboutButton from './AboutButton';
import Link from 'next/link';

const Header: React.FC<{changeWindow: () => void }> = ({changeWindow}) => {
  const handleClick = () =>{
    changeWindow();
  }
  return (
    <div className="header-container">
      <h1 className="header-title">ONE FLOW STREAM</h1>
      <button onClick={handleClick} className="btn-otros">
      Otros Productos
      </button>
      <AboutButton />
    </div>
  );
};

export default Header;
