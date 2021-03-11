import * as actions from '../actions';

const initialState = {
  user: {},
  isAuthenticated: false,
  isGettingUserAuth: true,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.USER_LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        user,
        isAuthenticated: true,
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
