import React from 'react';

const InputPassword = (props, attr) => {
  return (
    <div>
      <label htmlFor='password' className='sr-only'>
        Password
      </label>
      <input
        id='password'
        name='password'
        type='password'
        value={props.value}
        placeholder='Password'
        autoComplete='current-password'
        autoFocus={props.autoFocus}
        inputMode='text'
        required
        className={`${props.className} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-b-md focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-10 sm:text-sm`}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default InputPassword;
