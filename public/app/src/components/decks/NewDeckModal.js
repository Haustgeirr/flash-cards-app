import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../input/Input';
import Button from '../input/Button';
import { addNewDeck } from '../../api/decks';
import * as actionCreators from '../../redux/deckActionCreators';

const NewDeckModal = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { close } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isWaiting, setWaiting] = useState(false);

  const onAddDeckSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true);

    dispatch(actionCreators.addingDeck());
    const response = await addNewDeck({ name: title, description });

    if (response.errors) {
      setTitleError(true);
      setErrorMessage(response.errors['name'].message);
      dispatch(actionCreators.addingDeckFailure());
    } else {
      dispatch(actionCreators.addingDeckSuccess(response));
      close();
    }
    setWaiting(false);

    // history.replace(`/decks/${res.id || 'dashboard'}`);
    // history.replace(`/decks/dashboard`);
  };

  return (
    <React.Fragment>
      <div className='px-6 pt-6 pb-4'>
        <div className=''>
          <div className='text-gray-700 flex items-center justify-start'>
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
                d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
              />
            </svg>
            <h1
              className='text-lg leading-6 font-medium text-gray-700 pl-3'
              id='modal-headline'
            >
              Deck Title
            </h1>
          </div>
          <div className='mt-3'>
            <label className='sr-only'>Deck title</label>
            <div className='ml-8'>
              <Input
                id='title'
                name='title'
                autoComplete='off'
                autoFocus
                disabled={isWaiting}
                inputMode='text'
                invalid={titleError}
                placeholder=''
                type='text'
                value={title}
                required
                className={[
                  'input-default rounded-md',
                  titleError ? ' border-red-400' : '',
                ].join('')}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='px-4 py-4 sm:px-6 sm:pb-6'>
        <div className='text-gray-700 flex items-center justify-start'>
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
              d='M4 6h16M4 12h16M4 18h7'
            />
          </svg>
          <h2 className='text-md font-medium text-gray-700 pl-3'>
            Description
          </h2>
        </div>
        <div className='mt-3'>
          <label className='sr-only'>Deck description</label>
          <form onSubmit={onAddDeckSubmit}>
            <div className='ml-8'>
              <textarea
                className='w-full rounded-md border border-gray-300 resize-none focus:border focus:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-20 transition duration-150 ease-out text-sm placeholder-gray-500'
                placeholder='Add a short description ...'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='ml-8 text-sm text-red-500 col-span-1 sm:col-span-2 flex items-stretch'>
              <p className='mt-4 self-center'>{errorMessage}</p>
            </div>
            <div className='mt-4 flex flex-row justify-end'>
              <Button
                className='relative inline-flex justify-center mr-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md  text-gray-900 transition duration-150 ease-out focus:outline-none focus:ring-4 focus:ring-gray-900  disabled:text-gray-300 disabled:cursor-default underline'
                onClick={close}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={!title}>
                Add deck
              </Button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewDeckModal;
