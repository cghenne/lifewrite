import React from 'react';
import logo from '../../images/Lifewrite.png';
import './Header.scss';

const Header = () => (
  <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="App-name">
        LifeWrite
      </div>
  </header>
);

export default Header;
