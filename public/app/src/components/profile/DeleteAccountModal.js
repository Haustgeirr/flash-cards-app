import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Input from '../input/Input';
import Button from '../input/Button';
import { deleteUser } from '../../api/users';

const inputStyles =
  'appearance-none rounded-none relative block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-800 transition duration-150 ease-out hover:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-50 disabled:bg-gray-100 disabled:border-gray-200 sm:text-sm';

const deleteButtonStyle =
  'inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md transition duration-150 ease-out bg-red-400 text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default hover:bg-red-400 hover:text-white focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-20 focus:z-50 ';

const cancelButtonStyle =
  'inline-flex justify-center mr-4 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md transition duration-150 ease-out bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-20 focus:z-50 ';

const DeleteAccountModal = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { close } = props;
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isWaiting, setWaiting] = useState(false);

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true);

    const res = await deleteUser(password);

    if (res.errors) {
      setPasswordError(true);
      setErrorMessage(res.errors['currentPassword'].message);
    }

    history.replace('/account-deleted');

    setWaiting(false);
  };

  return (
    <div>
      <span
        className='hidden sm:inline-block sm:align-middle sm:h-screen'
        aria-hidden='true'
      >
        &#8203;
      </span>
      <div
        className='inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-400 sm:mx-0 sm:h-10 sm:w-10'>
              <svg
                className='h-6 w-6 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            </div>
            <h3
              className='text-lg ml-5 leading-6 font-medium text-gray-900 self-center'
              id='modal-headline'
            >
              Delete account
            </h3>
          </div>
        </div>
        <div className='px-4 py-4 sm:px-6 sm:pb-6'>
          <div className=''>
            <div className=''>
              <p className='text-sm text-gray-600'>
                Are you sure you want to delete your account? All of your data
                will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <div className='mt-6'>
              <form onSubmit={onDeleteSubmit}>
                <label className='block text-sm font-medium text-gray-700'>
                  Confirm your password
                </label>
                <Input
                  id='password'
                  name='password'
                  autoComplete='password'
                  autoFocus
                  disabled={isWaiting}
                  inputMode='text'
                  invalid={passwordError}
                  placeholder=''
                  type='password'
                  value={password}
                  required
                  className={[
                    inputStyles,
                    passwordError ? ' border-red-400' : '',
                  ].join('')}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='text-sm text-red-500 col-span-1 sm:col-span-2 flex items-stretch '>
                  <p className='mt-4 self-center'>{errorMessage}</p>
                </div>
                <div className='mt-4 flex flex-row justify-end'>
                  <Button className={cancelButtonStyle} onClick={close}>
                    Cancel
                  </Button>
                  <Button
                    className={deleteButtonStyle}
                    type='submit'
                    disabled={!password}
                  >
                    Delete account
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
