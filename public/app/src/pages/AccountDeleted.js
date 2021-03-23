import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const SignedOutPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full py-12 px-6 space-y-8'>
        <Logo />
        <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Your account has been deleted
        </h1>
        <div className='flex items-center justify-center text-sm'>
          Feeling a bit Chaotic-Neutral?
          <div className='pl-2'>
            <Link
              to='/signup'
              className='underline text-gray-900 hover:text-gray-600'
            >
              Make a new one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedOutPage;
