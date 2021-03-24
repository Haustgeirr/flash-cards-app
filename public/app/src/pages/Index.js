import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const IndexPage = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) setSignedIn(true);
  }, [isAuthenticated, setSignedIn]);

  return (
    <div className='relative overflow-hidden min-h-screen bg-gray-50 px-6'>
      <div className='max-w-7xl mx-auto px-4 py-8 sm:px-8 md:px-12 md:py-12 xl:py-16 xl:mt-8'>
        <Link to='/' className='inline-flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-8 w-8 sm:h-12 sm:w-12'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
            />
          </svg>
          <span className='inline self-center text-lg pl-4 sm:text-xl text-gray-900 font-semibold'>
            Flash Cards!
          </span>
        </Link>
        <div className='mt-6 md:mt-8 md:grid md:grid-cols-3 md:gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='text-left md:col-span-2 lg:col-span-1'>
            <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
              <span className='block bg-clip-text text-transparent bg-gradient-to-br from-gray-400 to-gray-800'>
                Need to remember stuff?
              </span>
              <span className='block'> Flash Cards!</span>
            </h1>
            <p className='text-base text-gray-500 mt-6 sm:mt-8 sm:text-xl sm:max-w-xl xl:mt-12'>
              A minimalistic tool to help you learn faster and improve recall.
              Build your deck. Test yourself. Remember things!
            </p>
            <div
              className={
                (isSignedIn ? 'hidden' : 'sm:flex') +
                ' mt-6 sm:mt-8 sm:justify-start md:mt-10 xl:mt-12'
              }
            >
              <div className='rounded-md'>
                <Link
                  to='/signup'
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10'
                >
                  Sign up for free
                </Link>
              </div>
              <div className='mt-4 sm:mt-0 sm:ml-4'>
                <Link
                  to='/signin'
                  className='w-full flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-800 hover:bg-white md:text-lg md:px-10 md:py-4'
                >
                  Sign in
                </Link>
              </div>
            </div>
            <div
              className={
                (isSignedIn ? 'sm:flex' : 'hidden') +
                ' mt-6 sm:mt-8 sm:justify-start md:mt-10 xl:mt-12'
              }
            >
              <Link
                to='/decks/dashboard'
                className='relative py-4 pr-8 text-xl text-gray-900 font-semibold underline'
              >
                Go to your decks
                <span className='absolute right-0 inset-y-0 flex items-center pl-3'>
                  <svg
                    className='text-gray-900 h-5 w-auto'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={3}
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
