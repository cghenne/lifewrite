import React, {Component} from 'react';
import Modal from 'react-modal';
import './css/Normalize.scss';
import './App.scss';
import { localGet, localSet, localRemove } from './global/storage';
const io = require('socket.io-client');
import SplitPane from 'react-split-pane';

import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import UserList from './components/userList';
import Header from './components/header';
import LoginPage from './components/loginPage';
import EmptyConversation from './components/emptyConversation';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: localGet('isLoggedIn'),
          users: null,
          fetchingUser: false,
          messages: localGet('currentConversation') ? [] : null,
          currentConversation: localGet('currentConversation'),
          socket: io.connect('http://localhost:4000'),
          currentUser: localGet('user'),
          isModalOpen: false,
        };
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSuccessLogin = this.onSuccessLogin.bind(this);
        this.getListOfUsers = this.getListOfUsers.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onUserClicked = this.onUserClicked.bind(this);
    }

    componentDidMount() {
      if (this.state.isLoggedIn) {
        this.state.socket.emit('login', {userId: this.state.currentUser.user.user_id});
        this.getListOfUsers();
      }
    }

    handleMessageSubmit(message) {
        const {messages, socket, currentUser} = this.state;
        const newMessage = {
          sender: currentUser.user.user_id,
          date: Date.now(),
          message: message,
        };
        messages.push(newMessage);
        this.setState({messages});
        socket.emit('send:message', newMessage);
    }

    closeModal() {
      this.setState({isModalOpen: false});
    }

    onSuccessLogin(user) {
      this.state.socket.emit('login', {userId: user.user_id});
      localSet('isLoggedIn', true);
      localSet('user', user);
      this.setState({
        isLoggedIn: true,
        currentUser: user,
      }, this.getListOfUsers);
    }

    getListOfUsers() {
      this.setState({fetchingUser: true});
      fetch(`http://localhost:4000/api/users?token=${this.state.currentUser.lifeworks_token}`)
        .then((results) => results.json())
        .then((results) => {
          this.setState({
            users: results,
            fetchingUser: false,
          });
        })
        .catch(console.error);
    }

    onLogout() {
      this.state.socket.emit('logout');
      localRemove('isLoggedIn');
      localRemove('user');
      localRemove('currentConversation');
      this.setState({
        isLoggedIn: null,
        users: null,
        fetchingUser: false,
        messages: null,
        currentConversation: null,
        currentUser: null,
        isModalOpen: false,
      });
    }

    onUserClicked(user) {
      const currentConversation = {
        name: user.name,
        id: user.user_id,
      };

      localSet('currentConversation', currentConversation);

      this.setState({
        currentConversation,
        messages: [],
      });
      this.state.socket.emit('join:conversation', {targetList: [user.user_id]});
    }

    render() {
      return (
          !this.state.isLoggedIn ?
          <LoginPage onSuccessLogin={this.onSuccessLogin} />
          :
          <div>
            <SplitPane split="horizontal" enableResizing={false} size={50}>
              <div><Header onLogout={this.onLogout}/></div>
              <SplitPane split="vertical" minSize={50} defaultSize={100}>
                <div className="conversations-pane">
                  <div onClick={() => this.setState({isModalOpen: true})}>Open Modal</div>
                </div>
                <SplitPane split="vertical" defaultSize={200} primary="second">
                  <div style={{height: '100%', backgroundColor: 'white'}}>
                    {this.state.currentConversation ?
                      <div>
                        <MessageList
                          messages={this.state.messages}
                          conversationName={this.state.currentConversation.name}
                        />
                        <MessageForm
                          onMessageSubmit={this.handleMessageSubmit}
                          user={this.state.user}
                        />
                      </div>
                      :
                      <EmptyConversation />
                    }
                  </div>
                  <div className="users-pane">
                    <UserList
                      users={this.state.users}
                      isFetching={this.state.fetchingUser}
                      onUserClicked={this.onUserClicked}
                    />
                  </div>
                </SplitPane>
              </SplitPane>
            </SplitPane>
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
