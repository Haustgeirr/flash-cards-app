import * as actions from '../deckActions';

const initialState = {
  decks: [],
  decksById: {},
  isGettingDecks: true,
  isAddingDeck: false,
  isUpdatingDecks: true,
  isDeletingDeck: false,
  errors: {},
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
      let deckObj = {};

      action.decks.forEach(({ id, ...content }) => {
        deckObj[id] = { ...content };
      });

      return {
        ...state,
        decks: action.decks,
        decksById: deckObj,
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
      const { id, ...content } = action.deck;

      return {
        ...state,
        decks: [...state.decks, action.deck],
        decksById: { ...state.decksById, [id]: { ...content } },
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
    case actions.UPDATING_DECK: {
      return {
        ...state,
        errors: {},
        isUpdatingDeck: true,
      };
    }
    case actions.UPDATING_DECK_SUCCESS: {
      const { id, ...content } = action.deck;

      return {
        ...state,
        decks: state.decks.map((deck) => {
          return deck.id === id ? { id, ...content } : deck;
        }),
        decksById: { ...state.decksById, [id]: { ...content } },
        errors: {},
        isUpdatingDeck: false,
      };
    }
    case actions.UPDATING_DECK_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        isUpdatingDeck: false,
      };
    }
    case actions.DELETING_DECK: {
      return {
        ...state,
        errors: {},
        isDeletingDeck: true,
      };
    }
    case actions.DELETING_DECK_SUCCESS: {
      const { [action.deck.id]: value, ...remainingDecks } = state.decksById;

      return {
        ...state,
        decks: state.decks.filter((deck) => deck.id !== action.deck.id),
        decksById: remainingDecks,
        errors: {},
        isDeletingDeck: false,
      };
    }
    case actions.DELETING_DECK_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        isDeletingDeck: false,
      };
    }
    default:
      return state;
  }
}
