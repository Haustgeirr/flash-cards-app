import React from 'react';

const NewDeckButton = ({ onClick }) => {
  return (
    <button
      className='w-72 h-48 rounded-lg text-gray-200 border-4 border-dashed border-gray-200 hover:text-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-100'
      onClick={onClick}
      name='Add new deck'
      title='Add new deck'
    >
      <div className='px-8 py-5 h-full flex items-center justify-center'>
        <h1 className='text-lg  font-semibold'>
          <svg
            className='h-12 w-auto m-auto '
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </h1>
      </div>
    </button>
  );
};

export default NewDeckButton;
