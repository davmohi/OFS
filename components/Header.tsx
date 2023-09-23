import React from 'react';
import AboutButton from './AboutButton';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <h1 className="header-title">ONE FLOW STREAM</h1>
      <button className="btn-otros">
        <Link href="/other">Otros Productos</Link>
      </button>
      <AboutButton />
    </div>
  );
};

export default Header;
