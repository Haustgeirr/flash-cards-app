import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full py-12 px-6 space-y-8'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          You have been signed out
        </h2>
        <div className='flex items-center justify-center text-sm'>
          Forgotten something?
          <div className='pl-2'>
            <Link
              to='/signin'
              className='underline text-gray-600 hover:text-gray-500'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedOutPage;
