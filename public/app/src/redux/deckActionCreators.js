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

const updatingDeck = () => {
  return {
    type: actions.UPDATING_DECK,
  };
};

const updatingDeckSuccess = (deck) => {
  return {
    type: actions.UPDATING_DECK_SUCCESS,
    deck,
  };
};

const updatingDeckFailure = (errors) => {
  return {
    type: actions.UPDATING_DECK_FAILURE,
    errors,
  };
};

const deletingDeck = () => {
  return {
    type: actions.DELETING_DECK,
  };
};

const deletingDeckSuccess = (deck) => {
  return {
    type: actions.DELETING_DECK_SUCCESS,
    deck,
  };
};

const deletingDeckFailure = () => {
  return {
    type: actions.DELETING_DECK_FAILURE,
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
  updatingDeck,
  updatingDeckSuccess,
  updatingDeckFailure,
};
