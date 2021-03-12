import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticatedRoute from './router/AuthenticatedRoute';

import './css/main.css';

const IndexPage = React.lazy(() => import('./pages/index'));
const SignInPage = React.lazy(() => import('./pages/signin'));
const DashboardPage = React.lazy(() => import('./pages/dashboard'));

class App extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <Route path='/' exact component={IndexPage} />
            <Route path='/signin' component={SignInPage} />
            <AuthenticatedRoute path='/dashboard' component={DashboardPage} />
            {/* <Route path='/dashboard' component={DashboardPage} /> */}
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default connect()(App);
