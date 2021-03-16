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
      value={value}
      className={className}
      onChange={onChange}
    />
  );
};

export default InputPassword;
