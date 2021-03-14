import React from 'react';

const AccountSubmitButton = (props) => {
  return (
    <button
      type='submit'
      className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-800 focus:ring-opacity-20'
    >
      <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
        <svg
          className='h-5 w-5 text-gray-600 group-hover:text-gray-500'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
            clipRule='evenodd'
          />
        </svg>
      </span>
      {props.text}
    </button>
  );
};

export default AccountSubmitButton;
