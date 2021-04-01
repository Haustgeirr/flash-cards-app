import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticatedRoute from './router/AuthenticatedRoute';

import './css/allstyles.css';
// import './css/main.css';

const IndexPage = React.lazy(() => import('./pages/Index'));
const SignInPage = React.lazy(() => import('./pages/SignIn'));
const SignUpPage = React.lazy(() => import('./pages/SignUp'));
const SignedOutPage = React.lazy(() => import('./pages/SignedOut'));
const NavigationPage = React.lazy(() => import('./components/navBar/NavBar'));
const NotFoundPage = React.lazy(() => import('./pages/404'));
const AccountDeleted = React.lazy(() => import('./pages/AccountDeleted'));

class App extends React.Component {
  render() {
    return (
      <Suspense
        fallback={
          <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12'>
            <div className='max-w-md w-full text-gray-100'>
              <span className='sr-only'>Flash Cards!</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='h-36 mx-auto w-auto'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                />
              </svg>
            </div>
          </div>
        }
      >
        <Router>
          <Switch>
            <Route path='/' exact component={IndexPage} />
            <Route path='/signin' component={SignInPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/signed-out' component={SignedOutPage} />
            <Route path='/account-deleted' component={AccountDeleted} />
            <AuthenticatedRoute path='/decks' component={NavigationPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default connect()(App);
