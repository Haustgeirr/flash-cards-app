import { baseUrl } from './config';

export const getUserDecks = async () => {
  try {
    const response = await baseUrl.get('/decks');

    return response.data;
  } catch (error) {
    return [];
  }
};

export const addNewDeck = async ({ name, description }) => {
  try {
    const response = await baseUrl.post('/decks', {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteDeck = async ({ id }) => {
  try {
    const response = await baseUrl.delete(`/decks/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
