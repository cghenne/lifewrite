import React from 'react';
import logo from '../../images/Lifewrite.png';
import './Header.scss';

const Header = () => (
  <header>
      <div className="logo">
        <a href="#">LifeWrite</a>
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
