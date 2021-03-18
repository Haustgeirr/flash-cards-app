import React from 'react';

import TextField from './TextField';

const InputName = ({ value, onChange, autoFocus, className }) => {
  return (
    <TextField
      name='name'
      placeholder='Your name'
      required
      autoComplete='name'
      autoFocus={autoFocus}
      value={value ? value : ''}
      className={className ? className : ''}
      onChange={onChange ? onChange : () => {}}
    />
  );
};

export default InputName;
