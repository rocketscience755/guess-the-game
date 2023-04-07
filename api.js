const axios = require('axios');

const BASE_URL = 'https://api.igdb.com/v4';
const CLIENT_ID = '9ve2ogy8f7sbkqqff97mpljlbbsq44';
const CLIENT_SECRET = '7y18om83cs625o518oqughumpqgcfp';

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