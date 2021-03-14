import React from 'react';

const InputEmail = (props) => {
  return (
    <div>
      <label htmlFor='email' className='sr-only'>
        Email address
      </label>
      <input
        id='email'
        name='email'
        type='email'
        autoCorrect='off'
        autoFocus={props.autoFocus}
        required
        spellCheck='false'
        autoCapitalize='off'
        placeholder='Email'
        value={props.value}
        autoComplete='off'
        inputMode='email'
        className={`${props.className} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:border-gray-500 focus:ring-4 focus:ring-gray-500 focus:ring-opacity-20 focus:z-10 sm:text-sm`}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default InputEmail;
