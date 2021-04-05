import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import * as actionCreators from '../../redux/deckActionCreators';
import { updateDeck } from '../../api/decks';

const hoverPath = (
  <svg
    className='h-5 w-5 text-gray-500'
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
);

const waitingPath = (
  <svg
    className='animate-spin h-4 w-4 text-gray-800'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
);

const successPath = (
  <svg
    className='h-5 w-5 text-gray-800'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5 13l4 4L19 7'
    />
  </svg>
);

const errorPath = (
  <svg
    className='h-5 w-5 text-gray-800'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    />
  </svg>
);

const EditDeckInput = ({ className, name: inputName, ...props }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const value = useSelector((state) => state.decks.decksById[id][inputName]);

  const [isWaiting, setWaiting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [isHover, setHover] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnBlur = (update) => {
    onUpdateSubmit({ [inputName]: update });
  };

  const resetToInitialValue = () => {
    inputRef.current.value = value;
    setInputValue(value);
    inputRef.current.blur();
  };

  const onUpdateSubmit = async (update) => {
    if (update[Object.keys(update)[0]] === value) return;

    setError(false);
    setSuccess(false);
    setWaiting(true);

    dispatch(actionCreators.updatingDeck());
    updateDeck(id, update).then((response) => {
      if (response.errors) {
        dispatch(actionCreators.updatingDeckFailure());
        setErrorMessage(response.errors[inputName]['message']);
        setError(true);
      } else {
        dispatch(actionCreators.updatingDeckSuccess(response));
        setSuccess(true);
        setError(false);
        setErrorMessage('');
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      }
      setWaiting(false);
    });
  };

  const RenderStatusIcon = () => {
    if (isWaiting) {
      return waitingPath;
    } else if (isError) {
      return errorPath;
    } else if (isSuccess) {
      return successPath;
    } else if (isHover) {
      return hoverPath;
    } else {
      return '';
    }
  };

  return (
    <React.Fragment>
      <div className='sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto pb-2 flex items-center justify-center'>
        <div className='h-14 w-14 pr-5'></div>
        <label className='sr-only'>Deck Title</label>
        <TextareaAutosize
          {...props}
          autoComplete='off'
          disabled={isWaiting}
          inputMode='text'
          aria-invalid={isError}
          placeholder={inputValue}
          type='text'
          ref={inputRef}
          value={inputValue}
          className={`${className} w-96 text-gray-900 text-center placeholder-gray-900 bg-gray-50 rounded-md  hover:border-gray-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 resize-none overflow-hidden cursor-pointer ${
            isError ? ' border-gray-800 border-2' : 'border-gray-200'
          }`}
          onChange={(e) => setInputValue(e.target.value)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onBlur={(e) => handleOnBlur(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.target.blur();
            }
            if (e.key === 'Escape') {
              resetToInitialValue();
              e.target.blur();
            }
          }}
        />
        <div className='h-14 w-14 pl-5 flex items-center'>
          {<RenderStatusIcon />}
        </div>
      </div>
      <div className='text-xs text-gray-500 text-center'>{errorMessage}</div>
    </React.Fragment>
  );
};

export default EditDeckInput;
