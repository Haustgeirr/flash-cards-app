import * as actions from '../deckActions';

const initialState = {
  decks: [],
  isGettingDecks: true,
  isAddingDeck: false,
  isDeletingDeck: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.GETTING_DECKS: {
      return {
        ...state,
        isGettingDecks: true,
      };
    }
    case actions.GETTING_DECKS_SUCCESS: {
      return {
        ...state,
        decks: action.decks,
        isGettingDecks: false,
      };
    }
    case actions.GETTING_DECKS_FAILURE: {
      return {
        ...state,
        isGettingDecks: false,
      };
    }
    case actions.ADDING_DECK: {
      return {
        ...state,
        isAddingDeck: true,
      };
    }
    case actions.ADDING_DECK_SUCCESS: {
      return {
        ...state,
        decks: [...state.decks, action.deck],
        isAddingDeck: false,
      };
    }
    case actions.ADDING_DECK_FAILURE: {
      return {
        ...state,
        isAddingDeck: false,
        errors: action.errors,
      };
    }
    case actions.DELETING_DECK: {
      return {
        ...state,
        isDeletingDeck: true,
      };
    }
    case actions.DELETING_DECK_SUCCESS: {
      return {
        ...state,
        decks: action.decks,
        isDeletingDeck: false,
      };
    }
    case actions.DELETING_DECK_FAILURE: {
      return {
        ...state,
        isDeletingDeck: false,
      };
    }
    default:
      return state;
  }
}
