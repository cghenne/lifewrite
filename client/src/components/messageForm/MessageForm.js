import React, {Component} from 'react';
import './MessageForm.scss';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onMessageSubmit(this.state.text);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    this.setState({ text : e.target.value });
  }

  render() {
    return(
      <div className='messageForm'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Write your message here...'
            onChange={this.changeHandler}
            value={this.state.text}
          />
          <div className='button' onClick={this.handleSubmit}>Submit</div>
        </form>
      </div>
    );
  }
}

MessageForm.displayName = "MessageForm";
MessageForm.propTypes = {
  onMessageSubmit: React.PropTypes.func,
  user: React.PropTypes.object,
};


export default MessageForm;
