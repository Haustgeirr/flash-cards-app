import React from 'react';

import LoginPanel from './LoginPanel';
import { getUser } from '../api/user';

class App extends React.Component {
  componentDidMount() {
    getUser();
  }

  onLoginSuccess = (user) => {
    this.setState({ user });
  };

  render() {
    return (
      <div>
        <LoginPanel onLoginSuccess={this.onLoginSuccess} />
      </div>
    );
  }
}

export default App;
