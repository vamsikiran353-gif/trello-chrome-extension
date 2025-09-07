

// Trello API logic and placeholders for future AI integration
// Usage: Set your API key and token in config.js (excluded from git)
import { TRELLO_API_KEY } from '../config.js';

const BASE_URL = 'https://api.trello.com/1';

export const TrelloAPI = {
  async getBoards() {
    const url = `${BASE_URL}/members/me/boards?key=${TRELLO_API_KEY}&token=${localStorage.getItem('trello_token')}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch boards');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  async getLists(boardId) {
    const url = `${BASE_URL}/boards/${boardId}/lists?key=${TRELLO_API_KEY}&token=${localStorage.getItem('trello_token')}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch lists');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  async addCard(listId, cardTitle) {
    const url = `${BASE_URL}/cards?key=${TRELLO_API_KEY}&token=${localStorage.getItem('trello_token')}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cardTitle,
          idList: listId
        })
      });
      if (!res.ok) throw new Error('Failed to add card');
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  // Placeholder for future AI features
  async suggestCardContent(context) {
    // TODO: Integrate AI to suggest card content
    return '';
  }
};
