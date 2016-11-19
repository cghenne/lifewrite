import React from 'react';
import './UserList.scss';

var UserList = React.createClass({
  render() {
      return (
          <div className='users'>
              <h3> Online Users </h3>
              <ul>
                  {
                      this.props.users.map((user, key) => {
                          return (
                              <li key={key}>
                                  <a href="#" className="online">{user.first_name} {user.last_name}</a>
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
