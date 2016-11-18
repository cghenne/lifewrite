import React, {Component} from 'react';
import './css/Normalize.scss';
import './App.scss';

import MessageList from './components/messageList';
import UserList from './components/userList';
import Header from './components/header';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          myTitle: 'Wrong title',
          users: ['test'],
          messages: [
            {
              user:'user1',
              text:'text 1'
            }
          ]
        };
    }

    componentDidMount() {
      var io = require('socket.io-client'),
      socket = io.connect('http://localhost:4000');
      // socket.on('connect', function () { console.log("socket connected"); });
      // socket.emit('private message', { user: 'me', msg: 'whazzzup?' });

      // fetch(`http://localhost:4000/api/users`)
      //     .then((results) => results.json())
      //     .then((results) => {
      //         this.setState({
      //             myTitle: results,
      //         });
      //     })
      //     .catch(console.error);
    }

    render() {

        return (
            <div>
              <Header />
              <MessageList messages={this.state.messages}/>
              <UserList users={this.state.users}/>
              <div className="content-wrapper">
                <h1 className='red'>PropTypes title: {this.props.title}</h1>
                <h1 className='red'>API title: {this.state.myTitle}</h1>
              </div>
              <SubComponent />
            </div>
        );
    }
}

App.propTypes = {
  title: React.PropTypes.string,
};

export default App;
