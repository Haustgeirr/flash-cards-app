import * as actions from '../actions';

const initialState = {
  isGettingSessionAuth: true,
  isGettingSessionAuthSuccess: false,
  isGettingSessionAuthFailure: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.GETTING_SESSION_AUTH: {
      return {
        ...state,
        isGettingSessionAuth: true,
        isGettingSessionAuthSuccess: false,
        isGettingSessionAuthFailure: false,
      };
    }
    case actions.GETTING_SESSION_AUTH_SUCCESS: {
      return {
        ...state,
        isGettingSessionAuth: false,
        isGettingSessionAuthSuccess: true,
        isGettingSessionAuthFailure: false,
      };
    }
    case actions.GETTING_SESSION_AUTH_FAILURE: {
      return {
        ...state,
        isGettingSessionAuth: false,
        isGettingSessionAuthSuccess: false,
        isGettingSessionAuthFailure: true,
      };
    }
    case actions.GETTING_SESSION_AUTH_STOPPED: {
      return {
        ...state,
        isGettingSessionAuth: false,
        isGettingSessionAuthSuccess: false,
        isGettingSessionAuthFailure: false,
      };
    }
    default:
      return state;
  }
}
