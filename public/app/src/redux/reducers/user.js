import * as actions from '../userActions';

const initialState = {
  user: {},
  isAuthenticated: false,
  isGettingUserAuth: true,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.USER_LOGIN: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    }
    case actions.USER_LOGOUT: {
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isGettingUserAuth: false,
      };
    }
    case actions.GETTING_USER_AUTH: {
      return {
        ...state,
        isGettingUserAuth: true,
      };
    }
    case actions.GETTING_USER_AUTH_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        isGettingUserAuth: false,
      };
    }
    case actions.GETTING_USER_AUTH_FAILURE: {
      return {
        ...state,
        isGettingUserAuth: false,
      };
    }
    case actions.GETTING_USER_AUTH_STOPPED: {
      return {
        ...state,
        isGettingUserAuth: false,
      };
    }
    default:
      return state;
  }
}
