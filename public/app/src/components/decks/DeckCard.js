import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../input/Button';
import HoverContentLink from '../input/HoverContentLink';
import DeckOptionsButton from './DeckOptionsButton';
import DeckOptionsLink from './DeckOptionsLink';

import { deleteDeckThunk } from '../../redux/operators/decks';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const DeckCard = (props) => {
  const { deck } = props;
  const cardRef = useRef(null);
  const dispatch = useDispatch();
  const [isShowingBack, setShowingBack] = useOnClickOutside(cardRef, false);

  const onDeleteClick = () => {
    dispatch(deleteDeckThunk(deck));
  };

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        className='relative h-48 w-72 transform transition-transform duration-500'
        style={{
          transform: `rotateY(${isShowingBack ? 180 : 0}deg)`,
          transformStyle: 'preserve-3d',
        }}
        ref={cardRef}
      >
        <div
          className={
            'absolute top-0 left-0 h-full w-full flex flex-col shadow rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-800 z-10'
          }
          style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden' }}
        >
          <div className='pl-8 pr-12 pt-6 flex-none'>
            <h1 className='text-md text-gray-900 font-semibold line-clamp-1'>
              {deck.name}
            </h1>
            <Button
              className='absolute right-4 top-4 h-8 w-8 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-800 z-20'
              disabled={isShowingBack}
              name='Show deck options'
              title='Show deck options'
              onClick={() => {
                setShowingBack(!isShowingBack);
              }}
            >
              <svg
                className='h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                />
              </svg>
            </Button>
          </div>
          <div className='px-8 flex-grow'>
            <p className='mt-2 text-sm text-gray-500 leading-snug line-clamp-3'>
              {deck.description}
            </p>
          </div>
          <div className='px-8 pb-6 flex-none'>
            <div className='py-2 flex flex-row items-center justify-start'>
              <div className='flex items-center justify-start text-gray-700 text-sm font-normal'>
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
                <span className='pl-2'>80%</span>
              </div>
            </div>
            <HoverContentLink
              to={`/decks/${deck.id}/test`}
              disabled={isShowingBack}
              onHoverText='Start test'
              tabIndex={isShowingBack ? '-1' : ''}
            >
              <svg
                className='h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                />
              </svg>
            </HoverContentLink>
          </div>
        </div>
        <div
          className={
            'absolute top-0 left-0 h-48 w-full shadow rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 -rotate-180transition-transform ease-out duration-150 text-white'
          }
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className='relative pl-8 pr-12 pt-6'>
            <h1 className='text-md text-white font-semibold line-clamp-1'>
              {deck.name}
            </h1>
            <Button
              className='absolute h-8 w-8 right-4 top-4 rounded-full text-white hover:bg-gray-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-700'
              onClick={() => {
                setShowingBack(!isShowingBack);
              }}
              disabled={!isShowingBack}
              name='Hide deck options'
              title='Hide deck options'
            >
              <svg
                className='h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Button>
          </div>
          <div className='px-8 py-3 flex flex-col space-y-1 '>
            <DeckOptionsLink
              disabled={!isShowingBack}
              to={`/decks/${deck.id}/edit`}
            >
              <svg
                className='h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                />
              </svg>
              <span className='pl-3'>Edit</span>
            </DeckOptionsLink>
            <DeckOptionsButton
              disabled={!isShowingBack}
              onClick={() => onDeleteClick()}
            >
              <svg
                className='h-5 w-auto'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
              <span className='pl-3'>Delete</span>
            </DeckOptionsButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
