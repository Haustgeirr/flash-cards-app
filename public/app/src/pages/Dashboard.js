import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DeckCard from '../components/decks/DeckCard';
import NewDeckButton from '../components/decks/NewDeckButton';
import NewDeckModal from '../components/decks/NewDeckModal';
import Modal from '../components/Modal';

import { getUserDecksThunk } from '../redux/operators/decks';

const DashboardPage = () => {
  const decks = useSelector((state) => state.decks.decks);
  const dispatch = useDispatch();

  const modal = useRef(null);

  const openModal = () => {
    modal.current.open();
  };

  useEffect(() => {
    dispatch(getUserDecksThunk());
  }, [dispatch]);

  return (
    <div>
      <div className='bg-gray-50'>
        <header className=''>
          <div className='sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto pb-2 pt-8 sm:pb-6 sm:pt-16 px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Your Decks</h1>
          </div>
        </header>
        <main className='min-h-screen'>
          <div className='sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto py-4 px-6 lg:px-8'>
            <div className='flex flex-col justify-center items-center space-y-8 sm:flex-none sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 md:gap-10 lg:gap-10 xl:gap-6'>
              {decks.map((deck, idx) => {
                return <DeckCard key={idx} deck={deck} />;
              })}
              <NewDeckButton onClick={() => openModal()} />
            </div>
          </div>
        </main>
        <Modal open ref={modal}>
          <NewDeckModal />
        </Modal>
      </div>
    </div>
  );
};

export default DashboardPage;
