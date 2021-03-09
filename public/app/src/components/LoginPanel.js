import React from 'react';

import login from '../api/login';

class LoginPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  onLoginSubmit = async (event) => {
    event.preventDefault();

    const response = await login.post('/users/login', {
      email: this.state.email,
      password: this.state.password,
    });

    this.props.onLoginSuccess({
      _id: response.data.user._id,
      token: response.data.token,
    });
  };

  render() {
    return (
      <div className='login-panel'>
        <div className='credentials-container'>
          <form
            className='login-form'
            method='POST'
            onSubmit={this.onLoginSubmit}
          >
            <input
              type='text'
              name='email'
              id='email'
              autoCorrect='off'
              spellCheck='false'
              autoCapitalize='off'
              autoFocus='autofocus'
              placeholder='Enter email'
              value={this.email}
              autoComplete='off'
              inputMode='email'
              onChange={this.onInputChange}
            />
            <input
              type='password'
              name='password'
              value={this.password}
              id='password'
              className='form-field'
              placeholder='Enter password'
              autoComplete='off'
              onChange={this.onInputChange}
            />
            <input type='submit' id='login' value='Log in' />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPanel;
