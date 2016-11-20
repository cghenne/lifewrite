import React, {Component} from 'react';

class EmptyConversation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{padding: 10}}>
        <h1 style={{marginTop: 0}}>Let's start talking!</h1>
        <p>Click on someone's name on the right pane to start a conversation</p>
      </div>
    );
  }
}

EmptyConversation.displayName = 'EmptyConversation';

export default EmptyConversation;
