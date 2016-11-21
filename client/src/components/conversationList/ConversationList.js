import React from 'react';
import './ConversationList.scss';

const ConversationList = React.createClass({
  render() {
    const spinner = (
      <div className="spinner blue" style={{marginTop: 'calc(50% - 20px)'}}>
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );

    return (
        <div className='conversations'>
          <h3> Conversations </h3>
          {this.props.isFetching ? spinner :
            <ul>
            {this.props.conversations &&
              this.props.conversations.map((conversation, key) => {
                return (
                  <li className="new" key={key} onClick={() => this.props.onConversationClicked(conversation)}>
                    <div>
                      {conversation.user.name}
                    </div>
                  </li>
                );
              })
            }
            </ul>
          }
        </div>
      );
    }
});

export default ConversationList;
