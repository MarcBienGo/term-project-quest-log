
# QuestLog - CPSC 2600 Term Project

[QuestLog](https://term-project-quest-log.onrender.com/) is my term project for the CPSC 2600 - Full-Stack Web Development Course. It features a game review web application built using the MERN Stack.


## Features

- User game reviews with ratings (0-10 in 0.5 increments)
- Game details display
- Responsive design
- Frontend and Backend data validation
- RESTful API

## Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account (for the database connection)

## Installation

To deploy this project, two terminals are required. One for the client and the other for the server. In the first terminal, navigate to the server directory and install the required dependencies for the application's back-end.

```bash
  cd server
  npm install
```

## Environment Variables
Replace the placeholders in `.env` with your actual MongoDB credentials:

```bash
CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.mhqp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT_NUMBER=3000
```

## Deployment

In the second terminal, navigate to the client directory and install the required dependencies for the application's front-end.

```bash
  cd client
  npm install
```

Run the the following command on both the server and client terminal in order to launch both ends of the application.

```bash
  npm start
```

To access the application's actual interface, open a browser and enter localhost/```<PORT_NUMBER>```, where ```PORT_NUMBER``` corresponds to the value indicated in the .env file.

## Documentation

To add a game, click on the Add New Game button on the navigation bar. Doing so would display the "New Game Form" view. All fields in this form are required. Validation is performed upon submission of the form to ensure the user has provided all required data.

Click on the Game Library button on the navigation bar in order to view all games saved in the database. Clicking on a game, opens the "Review Form" view which allows the user to add a rating (1 to 10) and a review for the selected game. Validation is performed upon submission of the form to ensure the user has provided all required data.

Both forms also undergo validation in the backend to ensure that database collection constraints are observed and fulfilled.


## API Reference

#### Create game

```http
  POST /games
```

#### Headers

```http
    Content-Type: application/json
```

#### Body

```http
    {
      "title": "Stray",
      "company": "BlueTwelve Studio",
      "genres": ["Adventure", "Indie"],
      "platforms": ["PS5", "PC"],
      "releaseYear": 2022,
      "ageRating": "E"
    }
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| title | string | **Required.** The official name of the game. |
| company | string | **Required.** Developer or publisher name. |
| genres | string[] | **Required.** Array of game genres. |
| platforms | string[] | **Required.** Supported platforms. |
| releaseYear | number | **Required.** Year of release. |
| ageRating | string | **Required.** ESRB Rating. |

#### Response

```bash
[
  {
      "_id": "64e1a3b8b3f7d92a3f7e8a1d",
      "title": "Stray",
      "company": "BlueTwelve Studio",
      "genres": ["Adventure", "Indie"],
      "platforms": ["PS5", "PC"],
      "releaseYear": 2022,
      "ageRating": "E",
      "createdAt": "2023-08-20T12:00:00.000Z"
    }
]
```

#### Get all games

```http
  GET /games
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | none | Fetch all games in the database |

#### Response

```bash
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Elden Ring",
    "company": "FromSoftware",
    "genres": ["RPG", "Action"],
    "platforms": ["PC", "PS5"],
    "releaseYear": 2022,
    "ageRating": "M"
  }
]
```

#### Get specific game

```http
   GET /games/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. MongoDB ObjectId of the game |

#### Response

```bash
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Elden Ring",
  "company": "FromSoftware",
  "genres": ["RPG", "Action"],
  "platforms": ["PC", "PS5"],
  "releaseYear": 2022,
  "ageRating": "M"
}
```

#### Search Games

```http
  GET /games/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Partial title match (case insensitive) |
| `company`      | `string` | Company match (case insensitive) |
| `genres`      | `string` | Comma-separated genres (e.g., "Arcade,Adventure") |
| `platforms`      | `string` | Comma-separated platforms (e.g., "PC,PS5") |
| `releaseYear`      | `number` | Filter by release year |
| `ageRating`      | `string` | Filter by rating (e.g., "M", "T") |

#### Example Request

```http
  GET /games/search?title=ring&genres=RPG&platforms=PS5
```

#### Response

```bash
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Elden Ring",
    "company": "FromSoftware",
    "genres": ["RPG"],
    "platforms": ["PS5"],
    "releaseYear": 2022,
    "ageRating": "M"
  }
]
```

#### Get reviews for specific game

```http
   GET /reviews/${gameId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gameId`      | `string` | **Required**. MongoDB ObjectId of the game |

#### Response

```bash
{
  "data": [
    {
      "_id": "64e1a3b8b3f7d92a3f7e8a1d",
      "game_id": "507f1f77bcf86cd799439011",
      "user": "GameLover42",
      "comment": "Amazing gameplay and visuals!",
      "score": 9.5,
      "createdAt": "2023-08-20T12:30:45.000Z"
    },
    {
      "_id": "64e1a4c2b3f7d92a3f7e8a1e",
      "game_id": "507f1f77bcf86cd799439011",
      "user": "HardcoreGamer",
      "comment": "Challenging but rewarding experience.",
      "score": 8.0,
      "createdAt": "2023-08-21T09:15:22.000Z"
    }
  ]
}
```


## Tech Stack

**Frontend:**
- React.js
- React Bootstrap

**Backend:**
- Node.js
- Express
- MongoDB


## References

 - [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) - Used in the following files (all are in the src/components directory):
    - Body.js
    - GameList.js
    - Header.js
    - NewGameForm.js
    - ReviewForm.js
 - [README Editor](https://readme.so/editor)
 - [Color Hunt](https://colorhunt.co/)


## Authors

- [@marcbiengo](https://www.github.com/marcbiengo)