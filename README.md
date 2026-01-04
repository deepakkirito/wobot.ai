# Getting Started with the project - Wobot.ai

After cloning the project, run the following commands:

```bash
npm install
npm start
```

## Known Issues

The Status Change api not working even though payload is right

Payload: {
"id" : 1,
"status" : "Inactive"
}

Response received: {
"status": 404,
"message": "Sorry can't find that!"
}

## Technologies Used

This Project uses these technologies:

- React
- Redux
- Redux Toolkit
- Redux Persist
- Tailwind CSS
- Redux Toolkit Query

## Features

- Search Cameras
- Filter Cameras by Location and Status
- Remove Cameras
- Restore Cameras

## How it works

Cameras are fetched from the backend using redux toolkit query.

Removed cameras are stored in redux store which is persisted in local storage and is available even after refreshing the page.
