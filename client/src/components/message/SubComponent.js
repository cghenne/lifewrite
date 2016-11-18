import React from 'react';
import './SubComponent.scss';

var Message = React.createClass({
  render() {
      return (
          <div className="message">
              <strong>{this.props.user}: </strong> 
              <span>{this.props.text}</span>
          </div>
      );
  }
});

export default SubComponent;
