import React, {Component} from 'react';

class EmptyConversation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {};

    return (
      <div style={style}>
        <h1>Let's start talking!</h1>
        <p>Click on someone's name on the right pane to start a conversation</p>
      </div>
    );
  }
}

EmptyConversation.displayName = 'EmptyConversation';

export default EmptyConversation;
