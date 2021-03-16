import React from 'react';

import TextField from './TextField';

const InputEmail = ({ value, onChange, autoFocus, className }) => {
  return (
    <TextField
      name='email'
      type='email'
      placeholder='Email'
      required
      autoComplete='email'
      autoFocus={autoFocus}
      inputMode='email'
      value={value}
      className={className}
      onChange={onChange}
    />
  );
};

export default InputEmail;
