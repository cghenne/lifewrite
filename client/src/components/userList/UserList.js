import React from 'react';
import cloudinary from '../../global/cloudinary';
import './UserList.scss';

var UserList = React.createClass({
  render() {
      return (
          <div className='users'>
            <h3> Online Users </h3>
            <ul>
              {
                this.props.users.map((user, key) => {
                  var image = cloudinary(user.image_profile, 'h_40,w_40,c_fill');
                  return (
                    <li key={key}>
                      <img src={image} />
                      <a href="#" className="online">{user.name}</a>
                    </li>
                  );
                      })
                  }
              </ul>
          </div>
      );
  }
});

export default UserList;
