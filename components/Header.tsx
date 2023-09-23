import React from 'react';
import AboutButton from './AboutButton';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <h1 className="header-title">ONE FLOW STREAM</h1>
      <AboutButton />
    </div>
  );
};

export default Header;
