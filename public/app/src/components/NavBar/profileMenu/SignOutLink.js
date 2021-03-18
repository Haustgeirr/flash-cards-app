import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../../redux/actionCreators';
import { signout } from '../../../api/users';

const SignOutLink = (props) => {
  const history = useHistory();

  const onSignOutClick = async () => {
    try {
      await signout();
      props.userLogout();
      history.push('/signed-out');
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <button
      className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
      role='menuitem'
      onClick={() => onSignOutClick()}
    >
      Sign out
    </button>
  );
};

export default connect(null, { userLogout: actionCreators.userSignOut })(
  SignOutLink
);
