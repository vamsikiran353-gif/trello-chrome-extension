# Trello Chrome Extension

This Chrome extension connects to Trello, fetches boards and lists, and allows adding new cards to selected lists. The project is structured for future AI capabilities (e.g., card suggestions, automation).

## Features
- Authenticate with Trello
- Fetch boards and lists
- Add new card to a selected list
- Modular codebase for easy AI integration

## Structure
- `src/` - Source code (background, popup, content scripts, API logic)
- `assets/` - Icons and images
- `.github/` - Copilot instructions

## Setup
1. Get a Trello API key and token
2. Add them to the extension's configuration (see `src/trello.js`)
3. Load the extension in Chrome (Developer mode > Load unpacked)

## Future Plans
- Integrate AI for card suggestions
- Automate Trello actions
