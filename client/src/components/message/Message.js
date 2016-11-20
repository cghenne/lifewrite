import React, {Component} from 'react';
import './Message.scss';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const d = new Date(this.props.message.date);
    return (
      <div className={`message ${this.props.isMe ? 'me' : 'notMe'}`}>
        <div className="messageDate">{d.toString()}</div>
        <div className="messageContent">
          {this.props.message.message}
        </div>
      </div>
    );
  }
}

Message.displayName = 'Message';
Message.propTypes = {
  message: React.PropTypes.object,
  isMe: React.PropTypes.bool,
}

export default Message;
