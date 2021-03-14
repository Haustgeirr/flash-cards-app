import * as actions from './actions';

const userLogin = (user) => ({
  type: actions.USER_LOGIN,
  user,
});

const userLogout = () => ({
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
  userLogin,
  userLogout,
  gettingUserAuth,
  gettingUserAuthSuccess,
  gettingUserAuthFailure,
  gettingUserAuthStopped,
};
