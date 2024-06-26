![ts3.jpg](./docs/ts3.jpg)
(Copyright: https://teamspeak.com)
<br/>
<br/>

# TS3-NodeJS-Fullstack by devusSs

## Project Explaination

This project serves the point of collecting, distributing and showing data collected on your TeamSpeak server so you can always keep track of users, commands (via the Bot) and messages sent on your server.<br/>
Considering not every user may accept or like being tracked across your server the bot automatically sends a message to every connecting client with the link to the terms of use. This page is being hosted on your frontend.

## Project Warning

This project has not been entirely finished yet, it's lacking styles and some components.<br/>
Search for `// TODO:` in the project to see current problems or planned features.<br/>
There may also be bugs and unwanted features which cannot be fixed or disabled yet.<br/>
The frontend also needs A LOT of cleanup and improvements, please do not expect everything to work all the time or everything to be 100% safe and production ready. Check the disclaimer at the bottom for more information.

## Project Structure

The project consists of three components:

- the Bot which collects data (users, commands and messages) from the TeamSpeak 3 server and adds it to a Postgres database
- the API which distributes data from the Postgres database
- the Client which displays the data via web

Everything has been written in Typescript and should be typesafe, there are however elements which have no valid or any types yet so expect bugs. Especially the frontend still needs a lot of work, in design as well as typesafety.

## Project Setup

### Check the [Setup](docs/setup/setup.md) folder for more information.

<br/>

# Regarding dev mode problems

React 18 has more StrictMode limitations which will cause issues for authentication and sending requests against the backend from the frontend.<br/> This only applies for dev mode, everything will work fine when you run `npm run build && npm run preview` in the frontend's directory. Dev mode may be broken for now so please do not expect `npm run dev` to work.

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
