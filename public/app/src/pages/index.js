import React from 'react';

import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      Index
      <div>
        <Link to='/signup'>Sign up</Link>
        <Link to='/signin'>Sign in</Link>
      </div>
    </div>
  );
};

export default IndexPage;
