import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticatedRoute from './router/AuthenticatedRoute';

import './css/main.css';

const IndexPage = React.lazy(() => import('./pages/Index'));
const SignInPage = React.lazy(() => import('./pages/SignIn'));
const SignUpPage = React.lazy(() => import('./pages/SignUp'));
const SignedOutPage = React.lazy(() => import('./pages/SignedOut'));
const DashboardPage = React.lazy(() => import('./pages/Dashboard'));

class App extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <Route path='/' exact component={IndexPage} />
            <Route path='/signin' component={SignInPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/signed-out' component={SignedOutPage} />
            <AuthenticatedRoute path='/dashboard' component={DashboardPage} />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default connect()(App);