import { getCurrentUser } from '../../api/users';
import * as actionCreators from '../userActionCreators';

export default function getUserProfileThunk() {
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
