import React from 'react';
import './Header.scss';

const Header = props => {
  const logoutStyle = {
    width: 50,
    height: 33,
    position: 'absolute',
    right: 0,
    paddingTop: 2,
  };

  return (
    <header>
      <div className="logo">
        <a href="#">LifeWrite</a>
      </div>
      <div className="button" onClick={() => props.onLogout()} style={logoutStyle}>
        Logout
      </div>
    </header>
  );
}

Header.displayname = "Header";
Header.propTypes = {
  onLogout: React.PropTypes.func,
};

export default Header;
