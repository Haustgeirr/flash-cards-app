import React from 'react';

import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div>
      Index
      <div>
        <Link to='/signup'>Sign up</Link>
        <Link to='/signin'>Sign in</Link>
      </div>
    </div>
  );
};

export default IndexPage;
