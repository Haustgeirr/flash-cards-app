import React from 'react';

const InputName = (props, attr) => {
  return (
    <div>
      <label htmlFor='name' className='sr-only'>
        Name
      </label>
      <input
        id='name'
        name='name'
        type='text'
        value={props.value}
        placeholder='Your name'
        required={props.required}
        autoCorrect='off'
        inputMode='text'
        autoFocus={props.autoFocus}
        className={`${props.className} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 rounded-t-md focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-20 focus:z-10 sm:text-sm`}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default InputName;
