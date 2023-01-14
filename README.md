![ts3.jpg](./docs/ts3.jpg)
(Copyright: https://teamspeak.com)
<br/>
<br/>

# TS3-NodeJS-Fullstack by devusSs

## Project Explaination

This project serves the point of collecting, distributing and showing data collected on your TeamSpeak server so you can always keep track of users, commands (via the Bot) and messages sent on your server.<br/>
Considering not every user may accept or like being tracked across your server the bot automatically sends a message to every connecting client with the link to the terms of use. This page is being hosted on your frontend.

## Project Warning

This project has not been entirely finished yet, for example it's lacking authorization on the API and basically any user with the frontend's url may access the data. Use it with caution or behind ip filtering (dynamic ip filtering via hostnames for example).<br/>
There may also be bugs and unwanted features which cannot be fixed or disabled yet.

## Project Structure

The project consists of three components:

- the Bot which collects data (users, commands and messages) from the TeamSpeak 3 server and adds it to a Postgres database
- the API which distributes data from the Postgres database
- the Client which displays the data via web

Everything has been written in Typescript and should be typesafe, there are however elements which have no valid or any types yet so expect bugs.

## Project Setup

Check the .env.example files in the bot's, api's and client's directory to find out how to setup the project.<br/>
Docker support has not been added yet but will be added in the future so you can start the application with a single command.
For now you may need to use node in every directory. This usually (!) means:

```bash
npm run build && node build/app.ts
```

This may be different for Vite (the frontend) where you need to build the app using `npm run build` and deploy it using [NGINX](https://www.nginx.com/) for example.
<br/>
<br/>

# DISCLAIMER

Read the following disclaimers carefully before using this software:

- This software is NOT (!) INTENDED FOR PRODUCTION USE.
- I am in no way responsible for any damage this software might cause. USE AT YOUR OWN RISK!

## Built With / Frameworks / Credits

- [NodeJS](https://nodejs.org/) - Javascript Runtime
- [Typescript](https://www.typescriptlang.org/) - Types for Javascript
- [ExpressJS](https://expressjs.com/) - API framework for Typescript / Javascript
- [TS3-NodeJS-Library](https://github.com/Multivit4min/TS3-NodeJS-Library) - TeamSpeak 3 Query framework for Typescript / Javascript
- [Vite ReactJS](https://vitejs.dev/guide/) - Vite React JS Frontend
- [React Bootstrap](https://react-bootstrap.github.io/) - Styled Components for React
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - Styled Toasts for React

## Authors

- **Florian Försterling** - [devusSs](https://github.com/devusSs)
