import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './redux/reducers';
import { getCurrentUser } from './api/users';
import * as actionCreators from './redux/actionCreators';

import App from './App';

const store = configureStore();

getUserLoginStatus(store);

function getUserLoginStatus(store) {
  store.dispatch(getUserProfileThunk(store.dispatch));
}

function getUserProfileThunk() {
  return async (dispatch) => {
    dispatch(actionCreators.gettingUserAuth());
    try {
      const user = await getCurrentUser();

      if (user) {
        dispatch(actionCreators.gettingUserAuthSuccess(user));
      } else {
        dispatch(actionCreators.gettingUserAuthStopped());
      }
    } catch (error) {
      dispatch(actionCreators.gettingUserAuthFailure(error));
    }
  };
}

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
