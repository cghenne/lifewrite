import React from 'react';
import cloudinary from '../../global/cloudinary';
import './UserList.scss';

var UserList = React.createClass({
  render() {
    const spinner = (
      <div className="spinner blue" style={{marginTop: 'calc(50% - 20px)'}}>
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );

    return (
        <div className='users'>
          <h3> Online Users </h3>
          {this.props.isFetching ? spinner :
            <ul>
              {
                this.props.users.map((user, key) => {
                  var image = cloudinary(user.image_profile, 'h_30,w_30,c_fill');
                  return (
                    <li key={key}>
                      <img src={image} className="avatar"/>
                      <a href="#" className="online">{user.name}</a>
                    </li>
                  );
                })
              }
            </ul>
          }
        </div>
      );
    }
});

export default UserList;
