import React from 'react';
import cloudinary from '../../global/cloudinary';
import './UserList.scss';

const UserList = React.createClass({
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
              {this.props.users &&
                this.props.users.map((user, key) => {
                  const image = cloudinary(user.image_profile, 'h_30,w_30,c_fill');
                  return (
                    <li className="online" key={key} onClick={() => this.props.onUserClicked(user)}>
                      <div>
                        <img src={image} className="avatar"/>
                        <div className="user-status" />
                        {user.name}
                      </div>
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

UserList.displayName = "UserList";
UserList.propTypes = {
  onUserClicked: React.PropTypes.func,
};


export default UserList;
