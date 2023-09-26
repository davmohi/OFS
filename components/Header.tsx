//components/Header.tsx
import React from 'react';
import AboutButton from './buttons/AboutButton';

// Header component that displays the application's header
const Header: React.FC<{ changeWindow: () => void }> = ({ changeWindow }) => {
  // Function to handle the button click and change the window
  const handleClick = () => {
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