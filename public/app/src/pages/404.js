import React from 'react';

import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full py-12 px-6 space-y-8'>
        <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          404 Not Found
        </h1>
        <div className='flex items-center justify-center text-sm'>
          <Link to='/' className='underline text-gray-900 hover:text-gray-600'>
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
