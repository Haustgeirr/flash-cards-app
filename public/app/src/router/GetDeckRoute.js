import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDecksThunk } from '../redux/operators/decks';

const GetDeckRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const decksLength = useSelector((state) => state.decks.decks.length);
  const isGettingDecks = useSelector((state) => state.decks.isGettingDecks);

  useEffect(() => {
    if (decksLength === 0) dispatch(getUserDecksThunk());
  }, [dispatch, decksLength]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isGettingDecks ? <div>Loading...</div> : <Component {...props} />
      }
    />
  );
};

export default GetDeckRoute;
