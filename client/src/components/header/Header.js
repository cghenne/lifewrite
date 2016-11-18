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
      <div className="status">
        <select>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="away">Away</option>
        </select>
      </div>
  </header>
);

export default Header;
