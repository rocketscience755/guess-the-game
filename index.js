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