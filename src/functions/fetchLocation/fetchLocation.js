const axios = require('axios');

const handler = async () => {
  const key = process.env.IP_KEY;

  const IP_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${key}`;

  try {
    const { data } = await axios.get(IP_URL);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;

    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };