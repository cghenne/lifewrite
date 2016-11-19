import React, {Component} from 'react';
import Modal from 'react-modal';
import './css/Normalize.scss';
import './App.scss';
import { localGet, localSet } from './global/storage';

import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import UserList from './components/userList';
import Header from './components/header';
import LoginPage from './components/loginPage';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: localGet('isLoggedIn'),
          myTitle: 'Wrong title',
          users: [],
          messages: [
            {
              user:'user1',
              text:'text 1'
            }
          ],
          socket: null,
          currentUser: localGet('user'), // example on how to use it
          isModalOpen: false,
        };
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSuccessLogin = this.onSuccessLogin.bind(this);
    }

    componentDidMount() {
      var io = require('socket.io-client');
      // socket.on('connect', function () { console.log("socket connected"); })
      // socket.emit('private message', { user: 'me', msg: 'whazzzup?' });

      // @todo add a check if the user is logged in and switch to login component if not
      this.setState({
        socket: io.connect('http://localhost:4000')
      });
      // fetch(`http://localhost:4000/api/users`)
      //     .then((results) => results.json())
      //     .then((results) => {
      //         this.setState({
      //             users: results.body,
      //         });
      //     })
      //     .catch(console.error);
    }

    handleMessageSubmit(message) {
        var {messages, socket} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    }

    closeModal() {
      this.setState({isModalOpen: false});
    }

    onSuccessLogin(user) {
      localSet('isLoggedIn', true);
      localSet('user', user);
      this.setState({
        isLoggedIn: true,
        currentUser: user,
      })
    }

    render() {
        return (
            !this.state.isLoggedIn ?
            <LoginPage onSuccessLogin={this.onSuccessLogin} />
            :
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
              <div onClick={() => this.setState({isModalOpen: true})}>Open Modal</div>
              <Modal
                isOpen={this.state.isModalOpen}
                style={customStyles}
                onRequestClose={this.closeModal}
              >
                <h1>Modal Content</h1>
                <p>Etc.</p>
                <button onClick={this.closeModal}>close</button>
              </Modal>
            </div>
        );
    }
}

App.propTypes = {
  title: React.PropTypes.string,
};

export default App;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
