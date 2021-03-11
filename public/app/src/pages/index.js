import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className='space-y-6'>
      <h1 className='mt-6 text-4xl font-bold text-gray-900'>
        Flash! <span className='text-indigo-500'> Ca-ards!</span>
      </h1>
      <h2 className=' text-gray-900'>For saving every information</h2>
      <div>
        <Link
          className='inline-block px-4 py-2 rounded-lg bg-indigo-500 text-white shadow-lg'
          to='/login'
        >
          Login
        </Link>
        <Link
          className='inline-block px-4 py-2 rounded-lg bg-indigo-500 text-white shadow-lg'
          to='/dashboard'
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
