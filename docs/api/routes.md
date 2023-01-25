### User related

Each endpoint displays the TeamSpeak users stored on the database which were collected by the bot.
This is authorization protected (Bearer token).

- [All users](users/get.md) : `GET /users/`

### Command related

Each endpoint displays the TeamSpeak commands stored on the database which were added or modified by the bot.
This is authorization protected (Bearer token).

- [All commands](commands/get.md) : `GET /commands/`

### Message related

Each endpoint displays the TeamSpeak messages stored on the database which were collected by the bot.
This is authorization protected (Bearer token).

- [All messages](messages/get.md) : `GET /messages/`

### Client related

Endpoints related to clients registered on the API.
This is currently restricted to one client which will be set in the .env file.

- [Login client](clients/login.md) : `POST /clients/login`
- [Refresh auth token](clients/refresh.md) : `GET /clients/refresh/`
- [Logout client](clients/logout.md) : `DELETE /clients/logout/`
