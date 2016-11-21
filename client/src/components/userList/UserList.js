import React, {Component} from 'react';
import cloudinary from '../../global/cloudinary';
import './UserList.scss';

const isOnline = (user, onlineUsers) => {
  let userIsOnline = false;
  onlineUsers.map(id => {
    if (id === user.user_id) {
      userIsOnline = true;
    }
  });

  return userIsOnline;
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({ filter : e.target.value });
  }

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
        <h3>{this.state.filter !== '' ? `Filter for: ${this.state.filter}` : 'Online Users'}</h3>
        {this.props.isFetching ? spinner :
          <ul>
            <input
              type='text'
              placeholder='Enter name'
              onChange={this.changeHandler}
              value={this.state.filter}
            />
            {this.props.users && this.props.users.map((user, key) => {
              // if filter, look for match
              //console.log(user.user_id);
              console.log(this.props.currentUserId);
              if (this.state.filter !== '' && user.name.toUpperCase().indexOf(this.state.filter.toUpperCase()) > -1 && this.props.currentUserId !== user.user_id){
                const image = cloudinary(user.image_profile, 'h_30,w_30,c_fill');
                return (
                  <li className={isOnline(user, this.props.onlineUsers) ? 'online' : 'offline'} key={key} onClick={() => this.props.onUserClicked(user)}>
                    <div>
                      <img src={image} className="avatar"/>
                      <div className="user-status" />
                      {user.name}
                    </div>
                  </li>
                );
                // not filter, only connected
              } else if (this.state.filter === '' && isOnline(user, this.props.onlineUsers) && this.props.currentUserId !== user.user_id) {
                const image = cloudinary(user.image_profile, 'h_30,w_30,c_fill');
                return (
                  <li className={isOnline(user, this.props.onlineUsers) ? 'online' : 'offline'} key={key} onClick={() => this.props.onUserClicked(user)}>
                    <div>
                      <img src={image} className="avatar"/>
                      <div className="user-status" />
                      {user.name}
                    </div>
                  </li>
                );
              }
            })
            }
          </ul>
        }
      </div>
    );
  }
}

UserList.displayName = "UserList";
UserList.propTypes = {
  onUserClicked: React.PropTypes.func,
  users: React.PropTypes.array,
  isFetching: React.PropTypes.bool,
  onlineUsers: React.PropTypes.array,
};


export default UserList;
