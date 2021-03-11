import React from 'react';
import { Link } from 'react-router-dom';

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default DashboardPage;
