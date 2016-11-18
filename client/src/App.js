import React, {Component} from 'react';
import './App.scss';

import SubComponent from './components/subComponent';
import UserList from './components/userList';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          myTitle: 'Wrong title',
          users: ['test'],
        };
    }

    componentDidMount() {
      fetch(`http://localhost:4000/api/test`)
          .then((results) => results.json())
          .then((results) => {
              this.setState({
                  myTitle: results,
              });
          })
          .catch(console.error);
    }

    render() {

        return (
            <div>
              <h1 className='red'>PropTypes title: {this.props.title}</h1>
              <h1 className='red'>API title: {this.state.myTitle}</h1>
              <SubComponent />
              <UserList users={this.state.users}/>
            </div>
        );
    }
}

App.propTypes = {
  title: React.PropTypes.string,
};

export default App;
