// ...existing code...

// Handles UI logic for Trello authentication, board/list selection, and adding cards
// Placeholder for AI integration
import { TrelloAPI } from './trello.js';

window.addEventListener('DOMContentLoaded', async () => {
  const authBtn = document.getElementById('auth-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const boardsSection = document.getElementById('boards-section');
  const loading = document.getElementById('loading');
  const status = document.getElementById('status');
  const token = localStorage.getItem('trello_token');
  const apiKey = localStorage.getItem('trello_api_key');

  async function showBoards() {
    authBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    boardsSection.style.display = 'block';
    loading.style.display = 'block';
    status.innerText = '';
    try {
      const boards = await TrelloAPI.getBoards(apiKey, token);
      const boardSelect = document.getElementById('board-select');
      boardSelect.innerHTML = '';
      boards.forEach(board => {
        const option = document.createElement('option');
        option.value = board.id;
        option.text = board.name;
        boardSelect.appendChild(option);
      });
      boardSelect.onchange = async () => {
        loading.style.display = 'block';
        const lists = await TrelloAPI.getLists(boardSelect.value, apiKey, token);
        const listSelect = document.getElementById('list-select');
        listSelect.innerHTML = '';
        lists.forEach(list => {
          const option = document.createElement('option');
          option.value = list.id;
          option.text = list.name;
          listSelect.appendChild(option);
        });
        loading.style.display = 'none';
      };
      if (boards.length) {
        boardSelect.onchange();
      }
    } catch (e) {
      status.innerText = 'Error loading boards.';
    }
    loading.style.display = 'none';
  }

  if (token && apiKey) {
    showBoards();
  } else {
    authBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    boardsSection.style.display = 'none';
    loading.style.display = 'none';
    status.innerText = '';
  }

  logoutBtn.onclick = () => {
    localStorage.removeItem('trello_token');
    localStorage.removeItem('trello_api_key');
    authBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    boardsSection.style.display = 'none';
    status.innerText = 'Logged out.';
  };
});
import { TRELLO_API_KEY } from '../config.js';

document.getElementById('auth-btn').onclick = async () => {
  // Request OAuth from background.js
  if (!localStorage.getItem('trello_token')) {

    chrome.runtime.sendMessage({ type: 'trello-auth', apiKey: TRELLO_API_KEY }, async (response) => {
        if (!response || !response.success) {
        document.getElementById('status').innerText = 'Authentication failed.';
        console.error(response?.error);
        return;
        }
        const token = response.token;
        const apiKey = response.apiKey;
        //set token and apiKey in config file for TrelloAPI usage

        localStorage.setItem('trello_token', token);
        localStorage.setItem('trello_api_key', apiKey);
        console.log('Authentication successful');
    });
    }
};

    // Fetch boards and populate dropdown
    const boards = await TrelloAPI.getBoards(TRELLO_API_KEY, localStorage.getItem('trello_token'));
    const boardSelect = document.getElementById('board-select');
    boardSelect.innerHTML = '';
    boards.forEach(board => {
      const option = document.createElement('option');
      option.value = board.id;
      option.text = board.name;
      boardSelect.appendChild(option);
    });

    // When board changes, fetch lists
    boardSelect.onchange = async () => {
      const lists = await TrelloAPI.getLists(boardSelect.value, TRELLO_API_KEY, localStorage.getItem('trello_token'));
      const listSelect = document.getElementById('list-select');
      listSelect.innerHTML = '';
      lists.forEach(list => {
        const option = document.createElement('option');
        option.value = list.id;
        option.text = list.name;
        listSelect.appendChild(option);
      });
    };

    // Trigger lists for first board
    if (boards.length) {
      boardSelect.onchange();
    }

    document.getElementById('boards-section').style.display = 'block';



document.getElementById('add-card-btn').onclick = async () => {
  const boardId = document.getElementById('board-select').value;
  const listId = document.getElementById('list-select').value;
  const cardTitle = document.getElementById('card-title').value;
  if (!boardId || !listId || !cardTitle) {
    document.getElementById('status').innerText = 'Please fill all fields.';
    return;
  }
  try {
    await TrelloAPI.addCard(listId, cardTitle);
    document.getElementById('status').innerText = 'Card added!';
  } catch (e) {
    document.getElementById('status').innerText = 'Error adding card.';
  }
};

// TODO: Populate boards and lists after authentication
// TODO: Implement AI suggestion button logic
