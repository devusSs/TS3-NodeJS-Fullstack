### User related

Each endpoint displays the TeamSpeak users stored on the database which were collected by the bot.
This is authorization protected (Bearer token).

- [All users](users/get.md) : `GET /users/`
- [One or multiple users](users/get.md) :
  - One user via their unique id: `GET /users?uid=`
  - Multiple users via their latest nickname: `GET /users?lu=`

### Command related

Each endpoint displays the TeamSpeak commands stored on the database which were added or modified by the bot.
This is authorization protected (Bearer token).

- [All commands](commands/get.md) : `GET /commands/`
- [One or multiple commands](commands/get.md) :
  - One command via it's name: `GET /commands?name=`
  - Multiple commands via their userlevel: `GET /commands?ulevel=`

### Message related

Each endpoint displays the TeamSpeak messages stored on the database which were collected by the bot.
This is authorization protected (Bearer token).

- [All messages](messages/get.md) : `GET /messages/`
- [One or multiple messages](messages/get.md) :
  - Multiple messages via their targetmode: `GET /messages?tm=`
  - Multiple messages via their invoker uid: `GET /messages?uid=`

### Bot related

Only relevant for the bot so it can login and generate JWT tokens for it's own requests.

- [Bot login](bot/login.md) : `POST /bot/login`

### Client related

Endpoints related to clients registered on the API.
This is currently restricted to one client which will be set in the .env file.

- [Login client](clients/login.md) : `POST /clients/login`
- [Refresh auth token](clients/refresh.md) : `GET /clients/refresh/`
- [Logout client](clients/logout.md) : `DELETE /clients/logout/`
