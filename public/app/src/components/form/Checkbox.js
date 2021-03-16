import React from 'react';

const Checkbox = ({ name, label, value, onChange }) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        name={name}
        value={value}
        id={name}
        className='h-4 w-4 text-gray-900 border-gray-300 rounded'
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={name} className='ml-2 block text-sm text-gray-900'>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
