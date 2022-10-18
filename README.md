# Online E-Ticket Reservation App
### Developed in MERN Stack





Online E-ticket Reservation App is an Web based application in which user can select movie and book reservation of an selected cinema. The technologies used in the WebApplication

- React.js(Front-end Development)
- Node.js(Backend Development)
- Express.js(For implemnetattion of MVC pattern)
- MongoDB(Database)

## Features

- Login and register as a user
- View the List of Upcomming and playing now movies
- View the showTimmings and cinema of the movie 
- Select the seats for reservation 
- Checkout and pay by online payment method/card
- Recieve an online payment
- Modify movies data(Done by Admin)


## Tech

Online Movie Ticket Reservation uses a number of open source projects to work properly:

- [React.js] - HTML enhanced for web apps!
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express.js] - fast node.js network app framework 
- [Mongodb] - the streaming build system
- [stripe] - for online payment method system
- [JEST,react-testing-library]- React Library for testing apps

And of course  itself is open source with a [public repository][dill]
 on GitHub.

## Installation of server

App requires [Node.js](https://nodejs.org/) v10+, React v15  to run.

Install the dependencies and devDependencies and start the server.

```sh
Go to Github repo folder
cd server
npm i
add .env file for enviorment variables
npm run dev
```
## Installation of client
```sh
Go to Github repo folder
cd client
npm i 
add .env file for enviorment variables
npm start
```

## Design pattern 
Application consists of MVC architecture and adds oberver pattern in React by using Redux
Application also implmentes 3-tier architecture
MongoDB: Database
Node.js: Backend
React: Frontend








