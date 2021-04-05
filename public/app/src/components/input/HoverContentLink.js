import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HoverContentLink = ({
  to,
  disabled,
  onHoverText,
  children,
  ...props
}) => {
  const [isHovering, setHovering] = useState(false);

  return (
    <Link
      className='absolute right-8 bottom-6 p-2 text-gray-900 border-2 border-solid border-gray-900 rounded-full text-sm font-normal flex items-center justify-end hover:bg-gray-800 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-transform ease-out duration-200'
      to={to}
      disabled={disabled}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      {isHovering && <span className='px-2 font-medium'>{onHoverText}</span>}
      {children}
    </Link>
  );
};

export default HoverContentLink;
