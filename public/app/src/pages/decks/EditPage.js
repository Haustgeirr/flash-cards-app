import React from 'react';
import { Link } from 'react-router-dom';

import EditDeckInput from '../../components/decks/EditDeckInput';

const EditPage = () => {
  return (
    <div>
      <div className='bg-gray-50'>
        <header className='max-w-7xl mx-auto pt-8 md:pt-14 pb-6 px-6 lg:px-8 md:grid md:grid-cols-5'>
          <div className='text-center pb-4 md:py-4 md:text-left'>
            <Link
              className='relative underline text-gray-800 hover:text-gray-600 pl-6'
              to='/decks'
            >
              <span className='absolute left-0 inset-y-0 flex items-center'>
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              Back to decks
            </Link>
          </div>
          <div className='col-span-3'>
            <EditDeckInput
              id='deck-title'
              name='name'
              className='text-3xl font-bold'
            />
            <EditDeckInput
              id='deck-description'
              name='description'
              className='text-lg'
            />
          </div>
        </header>
        <main className='min-h-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900 text-center'>
            Cards
          </h1>
          <div className='px-4 py-6 sm:px-0'>
            <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditPage;
