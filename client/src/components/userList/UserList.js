import React from 'react';
import Select from 'react-select';
import './UserList.scss';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

function logChange(val) {
    console.log("Selected: " + val);
}

var UserList = React.createClass({
  render() {
      return (
          <div className='users'>
              <h3> Online Users </h3>
              <ul>
                <li>
                  <Select
                    name="form-field-name"
                    value="one"
                    options={options}
                    onChange={logChange}
                    />
                </li>
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
