//--> polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing Helper Functions and Values
import * as helper from './helper';
import { QUOTE_URL, TIME_URL, IP_URL, NETLIFY_URL } from './config';
import axios from 'axios';

export const state = {
  quote: {
    text: '',
    author: '',
  },
  time: {},
};

export const loadQuote = async () => {
  try {
    const { content, author } = await helper.fetchData(QUOTE_URL);

    state.quote.text = content;
    state.quote.author = author;
  } catch (error) {
    console.log(error);
  }
};

export const loadTime = async () => {
  try {
    const timeData = await helper.fetchData(TIME_URL);

    const { ip } = await helper.fetchData('https://api.ipgeolocation.io/getip');

    const key = process.env.IP_KEY;

    const ipData = await helper.fetchData(`${NETLIFY_URL}?ip=${ip}`);

    console.log(ipData);
    console.log(ip);

    state.time = {
      countryCode: timeData.abbreviation,
      dateTime: timeData.datetime,
      weekDay: timeData.day_of_week,
      yearDay: timeData.day_of_year,
      timeZone: timeData.timezone.split('/'),
      weekNumber: timeData.week_number,
      country: ipData.country_name,
    };
  } catch (error) {
    console.log(error);
  }
};

// export const getIp = async () => {
//   const ipRes = await fetch('https://api.ipgeolocation.io/getip');

//   const { ip } = await ipRes.json();

//   const infoRes = await fetch(
//     `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_KEY}&ip=${ip}`
//   );

//   const infoData = await infoRes.json();

//   console.log(ip);
//   console.log(infoData);
// };
