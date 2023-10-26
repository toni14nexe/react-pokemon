# GitHub repository

https://github.com/toni14nexe/react-pokemon

# Project idea and task description

## Idea

The idea for creating this project stemmed from my ambition and desire to improve my frontend knowledge. Being a developer who primarily works with the Vue.js technology, I decided to refresh and enhance my skills in React. This also allowed me to make a comparison between these two technologies.

## Task description

### Main task

Create the frontend part of the application using React technology. The aim is to develop a multi-page application, utilize a store, and establish a connection to the [Pokemon API](https://pokeapi.co/docs/v2).

- Multi-page application - strive for an good UX/UI; component libraries can be used (I have used [MIU component library](https://mui.com/)), but further customization is recommended
- The application must include a header, navbar, and footer
- One page should be dedicated to guessing the names of Pokemons - only the image of the Pokemon is displayed, and the user must guess the Pokemon name
- Another page should provide a nice display of all Pokemons
- Data is fetched from the [Pokemon API](https://pokeapi.co/docs/v2)

### Adding advanced features - after main task

Enhance the application with advanced features. For this part, I would recommend using some data storage technology (e.g., a database). Personally, I used [JSON server](https://www.npmjs.com/package/json-server) to store data during registration and verify it during login. I have stored the caught Pokemons under each user in an array of objects.

- Implement user registration, login, and logout functionality
- Use cookie for login session
- Allow logged-in users to change their passwords (I have done this on a separate page named `Settings`)
- Create custom components to use props and emits (I have created `Toast message` component)
- Add a page for logged-in users to display their caught Pokemons - Pokemon display should include an image and show specific attributes like HP, defense, attack and speed
- Modify the existing page for displaying all Pokemons - should show all Pokemons, but those caught by the user should display an image and specific Pokemon attributes (as in the previous point) - Pokemon that haven't been caught should not display an image or attributes
- To create the two Pokemon display pages mentioned in the previous two points, you can use the same component with props and emits or you can implement everything on a single page with the option to filter Pokemons
- Sort Pokemons alphabetically
- Implement validation during registration and login (e.g., valid email format, username length, password complexity (length, lower and upper chars, numbers, special chars and length))
- Allow users to mark their caught Pokemons as favorites or remove them from favorites - this should be visually indicated, perhaps with an heart icon

### Most advanced features - after adding advanced features

The goal of adding these advanced features is to encrypt certain data and provide additional security for the user's account through verification and password reset. You can use any encryption method you prefer, but it should be secure. Personally, I used [Crypto JS](https://www.npmjs.com/package/crypto-js). These advanced features will enhance the security and usability of your application.

- Encrypt the password - store the encrypted password in the database and when retrieving it, decrypt it and compare it to the user's input
- Encrypt the cookie, if not already encrypted
- Implement email verification during user registration - users should not be able to log in until they verify their account
- Add `forgot password` option during login - send the user a verification link via email to reset their password (the user will enter a new password on the verification link)

- HELP: I have used [Email JS](https://www.emailjs.com/) for sending `verification` and `reset password` e-mails.

# User story

## Main user story

- User can play a game (guessing Pokemons names based on images)
- User can view a page with all Pokemons

## Advanced user story

- User registration (username, email, password...)
- User logs in
- User can play a game (guessing Pokemons names based on images)
- User can view a page with their Pokemon and their basic stats
- User can view a page with all Pokemons
- User can mark a specific Pokemon as a favorite
- Logged user can change their password

## Most advanced user story

- User registration (username, email, password...)
- User receives a verification email
- User verifies their account by clicking on the link in the email
- User logs in
- User can play a game (guessing Pokemons names based on images)
- User can view a page with their Pokemon and their basic stats
- User can view a page with all Pokemons
- Logged user can change their password

### Forgot password option

- User enters their email address
- User receives an email with a link to reset their password
- By clicking the link in the email, the user gains access to the password reset page
- User correctly enters a new password and confirms it, resulting in a successful password reset

# Technologies and dependences (packages)

## React in Vite with ESLint and Prettier

This project provides React working in Vite with HMR and some ESLint and Prettier rules.

- Useing some native React and Vite dependencies

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## MUI component library

MUI offers a comprehensive suite of free UI tools to help you ship new features faster. Start with Material UI, our fully-loaded component library, or bring your own design system to our production-ready components.

- Used for components, materials, icons and style
- [MUI component library website](https://mui.com/)

## JSON server

Package for front-end developers who need a quick back-end for prototyping and mocking.

- Used for mocking JSON database
- [JSON server website](https://www.npmjs.com/package/json-server)

## React DOM

The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

- Used for router navigation
- [React DOM website](https://legacy.reactjs.org/docs/react-dom.html)

#### React router DOM

The react-router-dom package contains bindings for using React Router in web applications. Please see the Getting Started guide for more information on how to get started with React Router.

- Used for router navigation
- [React Router DOM website](https://reactrouter.com/en/main)

## React Cookie

Cookie management - setting, getting and removing cookies.

- [React Cookie websites](https://www.npmjs.com/package/react-cookie)

## MobX

MobX is a battle-tested library that makes state management simple and scalable by transparently applying functional reactive programming.

- Used as state management
- [MobX website](https://mobx.js.org/)

## Axios

Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic and it can run in the browser and nodejs with the same codebase. On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.

- Used for HTTP requests
- [Axios website](https://axios-http.com/)

## Crypto JS

CryptoJS is a growing collection of standard and secure cryptographic algorithms implemented in JavaScript using best practices and patterns. They are fast, and they have a consistent and simple interface.

- Used for password, verification and reset password security
- [Crypto JS website](https://cryptojs.gitbook.io/)

## Email JS

EmailJS helps to send emails using client-side technologies only. No server is required – just connect EmailJS to one of the supported email services, create an email template, and use one of SDK libraries to trigger an email.

- Used for sending verification and password reset e-mails
- [Email JS website](https://www.emailjs.com/)

# APIs

## Pokemon API v2

`DO NOT FETCH ALL POKEMONS !` - `Fetch only the first 151 Pokemons` - only the first generation

All the Pokemon data you'll ever need in one place, easily accessible through a modern RESTful API.

[Pokemon API](https://pokeapi.co/docs/v2)

### Used routes

- `GET all first 151 Pokemons` - `https://pokeapi.co/api/v2/pokemon?limit=151`
- `GET Pokemon data by Pokemon ID` - `https://pokeapi.co/api/v2/pokemon/<PokemonID>`

## Local JSON server API

Package for front-end developers who need a quick back-end for prototyping and mocking.

- Used for mocking JSON database
- [JSON server website](https://www.npmjs.com/package/json-server)

- JSON server database file - `db.json` - `src/api/db.json`

### Database file

Database is array of `User` objects:

User object:

- `id` - `String` - same as username
- `username` - `String`
- `email` - `String`
- `verified` - `Boolean`
- `password` - `String` - encrypted user password
- `pokemons` - `Array<Pokemon>` - array of `Pokemon` objects

Pokemon object:

- `id` - `Number`
- `name` - `String`
- `image` - `String` - image link
- `hp` - `Number`
- `attack` - `Number`
- `defense` - `Number`
- `speed` - `Number`
- `favorite` - `Boolean`

# Getting started - installation

## Install dependencies

To install all dependencies run `npm install` command in terminal.

## Setup Email JS account

1. Create free Email JS account on [Email JS website](https://www.emailjs.com/).
2. Create Email JS public key.
3. Create Email JS Service.
4. Create Email JS `password reset` e-mail template using `username`, `resetLink` and `replayTo` variables.
5. Create Email JS `verification` e-mail template using `username`, `verificationLink` and `replayTo` variables.

## Setup proces env variables

Setup `process.env` in `vite.config.js` file:

- `EMAILJS_PUBLIC_KEY` - use own Email JS public key
- `EMAILJS_SERVICE_ID` - use own Email JS service id
- `EMAILJS_RESET_TEMPLATE_ID` - use own Email JS `password reset` template id
- `EMAILJS_VERIFY_TEMPLATE_ID` - use own Email JS `verification` template id
- `WEB_APP_LINK` - set your application link - `default: http://localhost:4000`
- `USERS_API_LINK` - set your `JSON server` link - `default: http://localhost:5000`
- `POKEMON_API_LINK` - Pokemon API link - `default: https://pokeapi.co/api/v2`
- `USERS_PASS_KEY` - setup your secret key for creating password - `default: sEcReT_kEy`
- `USERS_TOKEN_PASS_KEY` - setup your token (cookie) secret key - `default: sEcReT_kEy`

# Starting & running application

## Run aplication

- Run application with Vite: `npm run dev` - default on port 4000
- Run JSON server: `npm run server` - default on port 5000

### Other options - optional

- Build application: `npm run build`
- Format application files with ESLint: `npm run lint`
- Run application preview: `npm run preview`

## Test account login

- `username` - `testAccount`
- `password` - `testAccount123*`

More details available at database file: `src/api/db.json`.

## Database - JSON server file

Mocking API with JSON server package.

`db.json` - `src/api/db.json`

### Users in database

Database is array of `User` objects:

User object:

- `id` - `String` - same as username
- `username` - `String`
- `email` - `String`
- `verified` - `Boolean`
- `password` - `String` - encrypted user password
- `pokemons` - `Array<Pokemon>` - array of `Pokemon` objects

Pokemon object:

- `id` - `Number`
- `name` - `String`
- `image` - `String` - image link
- `hp` - `Number`
- `attack` - `Number`
- `defense` - `Number`
- `speed` - `Number`
- `favorite` - `Boolean`
