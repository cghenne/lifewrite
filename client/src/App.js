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
import ConversationList from './components/conversationList';
import Header from './components/header';
import LoginPage from './components/loginPage';
import EmptyConversation from './components/emptyConversation';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: localGet('isLoggedIn'),
          users: null,
          fetchingUsers: false,
          fetchingConversations: false,
          messages: localGet('currentConversation') ? [] : null,
          currentConversation: localGet('currentConversation'),
          socket: io.connect(SERVER_URL),
          currentUser: localGet('user'),
          isModalOpen: false,
          conversations: [],
          onlineUsers: null,
        };
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSuccessLogin = this.onSuccessLogin.bind(this);
        this.getListOfUsers = this.getListOfUsers.bind(this);
        this.getListOfConversations = this.getListOfConversations.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onUserClicked = this.onUserClicked.bind(this);
        this.onConversationClicked = this.onConversationClicked.bind(this);
        this.updateConversationList = this.updateConversationList.bind(this);
        this.fetchConversationHistory = this.fetchConversationHistory.bind(this);
    }

    componentDidMount() {
      if (this.state.isLoggedIn) {
        this.state.socket.emit('login', {userId: this.state.currentUser.user.user_id});
        this.getListOfUsers();
      }

      this.state.socket.on('connect', () => {

        this.state.socket.on('receive:message', data => {
          let {messages} = this.state;
          console.log('im loggin new message')
          console.log(data);
          console.log(localGet('currentConversation'))
          if (localGet('currentConversation').conversationId === data.conversationId) {
            messages.push(data.message);
            this.setState({messages: messages});
          } else {
            console.log('sending notification')
            handleUnreadMessage(data, this.state.users)
          }
        });

        this.state.socket.on('update:userlist', data => {
          this.setState({onlineUsers: data.users});
        });

        this.state.socket.on('receive:joinedConversation', data => {
          const currentConversation = this.state.currentConversation;
          currentConversation.conversationId = data.conversationId;
          //console.log('joined data');
          //console.log();
          //if(data.owner === this.state.currentUser.user.user_id) {
            localSet('currentConversation', currentConversation);
            this.fetchConversationHistory(currentConversation.conversationId);
          //}
          this.updateConversationList(currentConversation.conversationId, currentConversation.id);
        });
      });

    }

    fetchConversationHistory(conversationId) {
      const currentConversation = this.state.currentConversation;
      fetch(`${SERVER_URL}/api/conversation/${conversationId}/history/${Date.now()}`)
      .then(results => results.json())
      .then(res => {
        console.log(res);
        this.setState({
          currentConversation,
          messages: res.history,
        });
      });
    }

    updateConversationList(conversationId, userId) {
      var found = false;
      let {conversations} = this.state;
      conversations.map((conversation) => {
        if(conversation.conversation === conversationId) {
          found = true;
        }
      });
      if(!found) {
          var newConversation = {
            user: findUser(userId, this.state.users),
            conversation: conversationId
          }
          conversations.push(newConversation);
          this.setState({
            conversations: conversations,
          });
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
        socket.emit('send:message', {
          message: newMessage,
          conversationId: this.state.currentConversation.conversationId,
        });
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
      }, this.getListOfUsers);
      this.state.socket.emit('login', {userId: user.user.user_id});
    }

    getListOfUsers() {
      this.setState({fetchingUsers: true});
      fetch(`${SERVER_URL}/api/users?token=${this.state.currentUser.lifeworks_token}`)
        .then((results) => results.json())
        .then((results) => {
          this.setState({
            users: results,
            fetchingUsers: false,
          });
          this.getListOfConversations();
        })
        .catch(console.error);
    }

    getListOfConversations() {
      const {socket, currentUser} = this.state;
      this.setState({fetchingConversations: true});
      fetch(`${SERVER_URL}/api/conversation/user/${currentUser.user.user_id}`)
        .then((results) => results.json())
        .then((results) => {
          console.log(results);
          var conversationDetails = results.map((result) => {
            return (
              {
                user: findUser(result.users[0], this.state.users, result.users[1]),
                conversation: result._id
              }
            )
          });
          console.log(conversationDetails);
          this.setState({
            conversations: conversationDetails,
            fetchingConversations: false,
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
        conversations: [],
        fetchingUsers: false,
        fetchingConversations: false,
        messages: null,
        currentConversation: null,
        currentUser: null,
        isModalOpen: false,
        onlineUsers: null,
      });
    }

    onUserClicked(user) {
      const currentConversation = {
        name: user.name,
        id: user.user_id,
        conversationId: null,
      };

      localSet('currentConversation', currentConversation);

      this.setState({
        currentConversation,
        messages: [],
      });
      this.state.socket.emit('join:conversation', {
        targetList: [user.user_id],
      });
    }
    onConversationClicked(conversation) {
      const currentConversation = {
        name: conversation.user.name,
        id: conversation.user.user_id,
        conversationId: null,
      };

      localSet('currentConversation', currentConversation);

      this.setState({
        currentConversation,
        messages: [],
      });
      this.state.socket.emit('join:conversation', {
        targetList: [conversation.user.user_id],
      });
    }

    render() {
      return (
          !this.state.isLoggedIn ?
          <LoginPage onSuccessLogin={this.onSuccessLogin} />
          :
          <div>
            <SplitPane split="horizontal" enableResizing={false} size={50}>
              <div><Header onLogout={this.onLogout}/></div>
              <SplitPane split="vertical" minSize={150} defaultSize={200}>
                <div className="conversations-pane">
                  <ConversationList
                    conversations={this.state.conversations}
                    isFetching={this.state.fetchingConversations}
                    onConversationClicked={this.onConversationClicked}
                  />
                </div>
                <SplitPane split="vertical" minSize={150} defaultSize={200} primary="second">
                  <div style={{height: '100%', backgroundColor: 'white'}}>
                    {this.state.currentConversation ?
                      <div style={{height: '100%'}}>
                        <MessageList
                          messages={this.state.messages}
                          conversation={this.state.currentConversation}
                        />
                        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
                      </div>
                      :
                      <EmptyConversation />
                    }
                  </div>
                  <div className="users-pane">
                    <UserList
                      users={this.state.users}
                      isFetching={this.state.fetchingUsers}
                      onUserClicked={this.onUserClicked}
                      onlineUsers={this.state.onlineUsers}
                      currentUserId={this.state.currentUser.user.user_id}
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

const findUser = (id, users, alternativeId) => {
  let foundUser = {};
  var searchId = id;
  if (!searchId) {
    searchId = alternativeId;
  }
  users.map((user) => {
    if (user.user_id === searchId) {
      foundUser = user;
    }
  });
  return foundUser;
}

const handleUnreadMessage = (data, users) => {
  if (!("Notification" in window)) {
    console.log('this browser does not support notifications')
    return
  }
  const user = findUser(data.sender, users)
  console.log(user)
  let tittle = "Message from: " + user.name
  if (Notification.permission === "granted") {
    let notification = new Notification(tittle, {body: data.message.message});
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        let notification = new Notification(tittle, {body: data.message});
      }
    });
  }
}

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
