import React, {Component} from 'react';
import { localGet } from '../../global/storage';
import './MessageList.scss';
import Message from '../message';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.scrollBottom = this.scrollBottom.bind(this);
  }
  componentDidMount() {
    this.scrollBottom();
  }
  componentDidUpdate() {
    this.scrollBottom();
  }
  scrollBottom() {
    const container = this.refs.messagesContainer;
    container.scrollTop = container.scrollHeight;
  }
  render() {
    return (
      <div className='messages'>
        <h1>Conversation with: {this.props.conversationName}</h1>
        <div className='messageContainer' ref="messagesContainer">
          {this.props.messages.map((message, i) => {
            return (
              <Message
                key={i}
                message={message}
                isMe={message.sender === localGet('user').user.user_id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

MessageList.displayName = 'MessageList';
MessageList.propTypes = {
  messages: React.PropTypes.array,
  conversationName: React.PropTypes.string,
};

export default MessageList;
