# Building and running the app(s)

NOTE: Running the apps requires the setup step as well! Make sure the .env files are setup properly or the app will not work.

## Bot

Head to the bot's directory and build and run the app using `npm run build && npm run start`.

## API

Head to the api's directory and build and run the app using `npm run build && npm run start`.

## Frontend

Head to the clients's directory and build the app using `npm run build`.
Host the frontend via a web server (like [NGINX](https://www.nginx.com/)) or a web hoster of your choice.

# Setup

## Bot

The bot needs environment variables to work properly or even start.

- [Example .env file](../../bot/.env.example)

## API

The api needs environment variabled to work properly or even start.

- [Example .env file](../../api/.env.example)

## Client

The frontend needs environment variabled to work properly or even start.

- [Example .env file](../../client/.env.example)

NOTE: BASE_URL equals the API url or domain

## Networking

The API as well as the client expect `https://` urls in production and will not (!) work with `http://` or even `localhost` requests. Make sure to host the API on an `https://` server. [NGINX docs](http://nginx.org/en/docs/http/configuring_https_servers.html)
