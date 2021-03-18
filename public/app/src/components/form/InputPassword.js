import React from 'react';

import TextField from './TextField';

const InputPassword = ({ value, onChange, autoFocus, className }) => {
  return (
    <TextField
      name='password'
      type='password'
      placeholder='Password'
      required
      autoFocus={autoFocus}
      autoComplete='new-password'
      value={value ? value : ''}
      className={className ? className : ''}
      onChange={onChange ? onChange : () => {}}
    />
  );
};

export default InputPassword;
