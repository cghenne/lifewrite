import React from 'react';
import './UserList.scss';

var UserList = React.createClass({
  render() {
      return (
          <div className='users'>
              <h3> Online Users </h3>
              <ul>
                  {
                      this.props.users.map((user) => {
                          return (
                              <li key={user}>
                                  {user}
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
