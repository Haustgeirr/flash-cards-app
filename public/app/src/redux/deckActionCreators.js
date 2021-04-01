import * as actions from './deckActions';

const gettingDecks = () => {
  return {
    type: actions.GETTING_DECKS,
  };
};

const gettingDecksSuccess = (decks) => {
  return {
    type: actions.GETTING_DECKS_SUCCESS,
    decks,
  };
};

const gettingDecksFailure = () => {
  return {
    type: actions.GETTING_DECKS_FAILURE,
  };
};

const deletingDeck = () => {
  return {
    type: actions.DELETING_DECK,
  };
};

const deletingDeckSuccess = (decks) => {
  return {
    type: actions.DELETING_DECK_SUCCESS,
    decks,
  };
};

const deletingDeckFailure = () => {
  return {
    type: actions.DELETING_DECK_FAILURE,
  };
};

const addingDeck = () => {
  return {
    type: actions.ADDING_DECK,
  };
};

const addingDeckSuccess = (deck) => {
  return {
    type: actions.ADDING_DECK_SUCCESS,
    deck,
  };
};

const addingDeckFailure = () => {
  return {
    type: actions.ADDING_DECK_FAILURE,
  };
};

export {
  gettingDecks,
  gettingDecksSuccess,
  gettingDecksFailure,
  deletingDeck,
  deletingDeckSuccess,
  deletingDeckFailure,
  addingDeck,
  addingDeckSuccess,
  addingDeckFailure,
};
