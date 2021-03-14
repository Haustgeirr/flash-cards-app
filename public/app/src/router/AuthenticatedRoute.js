import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({ users, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        users.isAuthenticated ? (
          <Component {...props} />
        ) : users.isGettingUserAuth ? (
          <div>Loading...</div>
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(AuthenticatedRoute);
