import * as actionCreators from '../deckActionCreators';
import { getUserDecks, deleteDeck } from '../../api/decks';

const getUserDecksThunk = () => {
  return async (dispatch) => {
    dispatch(actionCreators.gettingDecks());
    try {
      const response = await getUserDecks();
      dispatch(actionCreators.gettingDecksSuccess(response));
    } catch (error) {
      dispatch(actionCreators.gettingDecksFailure(error.message));
    }
  };
};

const deleteDeckThunk = (deck) => {
  return async (dispatch) => {
    dispatch(actionCreators.deletingDeck());
    try {
      const response = await deleteDeck(deck);
      dispatch(actionCreators.deletingDeckSuccess(response));
    } catch (error) {
      console.log(error);
      dispatch(actionCreators.deletingDeckFailure(error.message));
    }
  };
};

export { getUserDecksThunk, deleteDeckThunk };
