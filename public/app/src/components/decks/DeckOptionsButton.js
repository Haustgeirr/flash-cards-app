import React from 'react';

import Button from '../input/Button';

const DeckOptionsButton = ({ disabled, onClick, children, ...props }) => {
  return (
    <Button
      className='pl-2 pr-4 py-2 text-gray-400 text-sm font-normal flex items-center justify-start hover:bg-gray-800 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400'
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default DeckOptionsButton;
