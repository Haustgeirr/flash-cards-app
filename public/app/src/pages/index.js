import React from 'react';

import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const IndexPage = () => {
  return (
    <div className='relative overflow-hidden min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-16 xl:px-8 xl:pt-32'>
        <Link to='/' className='inline-flex'>
          <Logo className='h-12 w-12' />
          <span className='inline self-center pl-4 text-xl text-gray-900 font-semibold'>
            Flash Cards!
          </span>
        </Link>

        <div className='mt-16 xl:grid xl:grid-cols-2 xl:gap-24 xl:mt-24'>
          <div className='sm:text-center lg:text-left'>
            <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
              <span className='block bg-clip-text text-transparent bg-gradient-to-br from-gray-400 to-gray-800'>
                Need to remember stuff?
              </span>
              <span className='block'> Flash Cards!</span>
            </h1>
            <p className='mt-12 text-base text-gray-500 sm:mt-16 sm:text-xl sm:max-w-xl sm:mx-auto'>
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className='mt-12 sm:mt-16 sm:flex sm:justify-start'>
              <div className='rounded-md'>
                <Link
                  to='/signup'
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10'
                >
                  Sign up for free
                </Link>
              </div>
              <div className='mt-3 sm:mt-0 sm:ml-3'>
                <Link
                  to='/signin'
                  className='w-full flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-800 hover:bg-white md:py-4 md:text-lg md:px-10'
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
