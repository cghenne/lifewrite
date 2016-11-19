import React, {Component} from 'react';
import './LoginPage.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: '',
      username: '',
      password: '',
      fetching: false,
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    if (this.state.username === '' || this.state.password === '') {
      this.setState({errorText: 'Please enter your username and password'});
    } else {
      this.setState({errorText: '', fetching: true});
      fetch(`http://localhost:4000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      }).then(results => results.json())
      .then(results => {
        if (results.error) {
          this.setState({errorText: results.error.message, fetching: false});
        } else {
          this.props.onSuccessLogin(results);
        }
      })
      .catch(console.error);
    }
  }

  render() {
    return (
      <div className='login-page'>
        <div className='form'>
          <img src={require('../../images/Lifewrite.png')} className='logo'/>
          <div className='login-form'>
            <input
              type='text'
              placeholder='username'
              onChange={e => this.setState({username: e.target.value})}
            />
            <input
              type='password'
              placeholder='password'
              onChange={e => this.setState({password: e.target.value})}
            />
            <div className='button' onClick={this.submit}>
              {this.state.fetching ?
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div> : 'login'}
            </div>
            <p className='error'>{this.state.errorText}</p>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.displayName = 'LoginPage';
LoginPage.propTypes = {
  onSuccessLogin: React.PropTypes.func,
};

export default LoginPage;
