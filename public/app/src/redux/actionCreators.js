import * as actions from './actions';

const userSignIn = (user) => ({
  type: actions.USER_LOGIN,
  user,
});

const userSignOut = () => ({
  type: actions.USER_LOGOUT,
});

function gettingUserAuth() {
  return {
    type: actions.GETTING_USER_AUTH,
  };
}

function gettingUserAuthSuccess(user) {
  return {
    type: actions.GETTING_USER_AUTH_SUCCESS,
    user,
  };
}

function gettingUserAuthFailure(errorMessage) {
  return {
    type: actions.GETTING_USER_AUTH_FAILURE,
    errorMessage,
  };
}

function gettingUserAuthStopped() {
  return {
    type: actions.GETTING_USER_AUTH_STOPPED,
  };
}

export {
  userSignIn,
  userSignOut,
  gettingUserAuth,
  gettingUserAuthSuccess,
  gettingUserAuthFailure,
  gettingUserAuthStopped,
};
