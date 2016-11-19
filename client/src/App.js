import React, {Component} from 'react';
import './css/Normalize.scss';
import './App.scss';

import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import UserList from './components/userList';
import Header from './components/header';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          myTitle: 'Wrong title',
          users: [],
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

      fetch(`http://localhost:4000/api/users`)
          .then((results) => results.json())
          .then((results) => {
              this.setState({
                  users: results.body,
              });
          })
          .catch(console.error);
    }

    handleMessageSubmit(message) {
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    }

    render() {

        return (
            <div>
              <Header />
              <UserList users={this.state.users}/>
              <div className="content-wrapper">
                 <MessageList messages={this.state.messages}/>
                 <MessageForm
                    onMessageSubmit={this.handleMessageSubmit}
                    user={this.state.user}
                />
              </div>
            </div>
        );
    }
}

App.propTypes = {
  title: React.PropTypes.string,
};

export default App;
