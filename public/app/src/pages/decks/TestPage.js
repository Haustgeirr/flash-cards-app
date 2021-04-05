import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TestPage = () => {
  const { id } = useParams();
  const deck = useSelector((state) => state.decks.decksById[id]);

  return (
    <div>
      <div className='bg-gray-50'>
        <header className=''>
          <div className='sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto pt-8 sm:pt-16 pb-2 sm:pb-6 lg:pb-8 px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-gray-900 text-center'>
              {deck.name}
            </h1>
          </div>
        </header>
        <main className='min-h-full'></main>
      </div>
    </div>
  );
};

export default TestPage;
