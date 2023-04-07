Sure, I can definitely help with that. To get started, you'll need to have the following installed:
- Node.js (v10.16.3 or later)
- NPM (v6.9.0 or later)

Here are the basic steps to create a Node.js and Express app:

1. Create a new directory for your project and cd into it:
```
mkdir guess-the-game
cd guess-the-game
```

2. Initialize the Node.js project with the following command:
```
npm init -y
```

3. Install Express:
```
npm install express
```

4. Create a new file called `index.js` in the project directory and add the following code:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

5. Start the server by running the following command:
```
node index.js
```

You should see a message in the console saying that the server is listening on port 3000. If you go to http://localhost:3000 in your browser, you should see a "Hello world!" message.

From here, you can add the functionality to generate a random pixelated image from the IGDB and let users guess the game. You can use APIs provided by IGDB and implement the guessing game logic using JavaScript.

Let me know if you have any questions or need further help!

Sure thing! Here are the remaining steps:

6. Install the `axios` package to make HTTP requests to the IGDB API:
```
npm install axios
```

7. Create a file called `api.js` in the project directory and add the following code to make a request to the IGDB API and get a list of games:
```javascript
const axios = require('axios');

const BASE_URL = 'https://api-v3.igdb.com';
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

const getAccessToken = async () => {
  const response = await axios({
    url: `${BASE_URL}/oauth/token`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${CLIENT_SECRET}`,
    },
    data: {
      grant_type: 'client_credentials',
    },
  });

  return response.data.access_token;
};

const getGames = async () => {
  const accessToken = await getAccessToken();

  const response = await axios({
    url: `${BASE_URL}/games`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
    },
    data: 'fields name,cover.url; where total_rating_count > 20; limit 50;',
  });

  return response.data;
};

module.exports = {
  getGames,
};
```

Make sure to replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with the client ID and secret provided by the IGDB API.

8. Update the `index.js` file to use the `api.js` module and start the game:
```javascript
const express = require('express');
const app = express();
const api = require('./api');

app.use(express.json());
app.use(express.static('public'));

app.get('/api/games', async (req, res) => {
  const games = await api.getGames();
  res.json(games);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

9. Create a `public/index.html` file with the following code to display the game and load the game data:
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Guess the Game</title>
  </head>
  <body>
    <h1>Guess the Game!</h1>
    <div id="game"></div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      const getRandomIndex = (array) => {
        return Math.floor(Math.random() * array.length);
      };

      const createGame = (games) => {
        const game = games[getRandomIndex(games)];
        const image = document.createElement('img');
        image.setAttribute('src', game.cover.url.replace('t_thumb', 't_720p'));
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        const button = document.createElement('button');
        button.textContent = 'Guess';
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const guess = input.value.toLowerCase();
          const name = game.name.toLowerCase();
          if (guess === name) {
            alert('Correct!');
            createGame(games);
          } else {
            alert('Incorrect!');
          }
        });
        form.appendChild(input);
        form.appendChild(button);
        const gameDiv = document.querySelector('#game');
        gameDiv.innerHTML = '';
        gameDiv.appendChild(image);
        gameDiv.appendChild(form);
        input.focus();
      };

      axios.get('/api/games')
        .then((response) => {
          const games = response.data;
          createGame(games);
        });
    </script>
  </body>
</html>
```

This HTML page contains a form where the user can guess the game name, and the `createGame` function generates a random image and game name from the list of games. The `axios` package is used to load the game data from the `/api/games` endpoint.

10. Start the server by running `node index.js` and go to http://localhost:3000 in your browser to play the game!

I hope this helps! Let me know if you have any questions or need further assistance.