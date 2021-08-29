//--> polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing Dependencies
import axios from 'axios';

//--> Importing Helper Functions and Values
import * as helper from './helper';
import { QUOTE_URL, TIME_URL, IP_URL, NETLIFY_URL } from './config';

export const state = {
  quote: {
    text: '',
    author: '',
  },
  time: {},
};

export const loadData = async () => {
  try {
    //--> Fetching User's IP Address
    const {
      data: { ip },
    } = await axios.get(IP_URL);

    //--> Fetching All Data
    const data = await axios.all([
      axios.get(QUOTE_URL, { timeout: 5000 }),
      axios.get(`${TIME_URL}/ip/${ip}`, { timeout: 10000 }),
      axios.get(`${NETLIFY_URL}?ip=${ip}`, { timeout: 10000 }),
    ]);

    //--> Saving Quotes in State
    const {
      data: { author, content },
    } = data[0];

    state.quote = {
      text: content,
      author: author,
    };

    //--> Saving User's Time Data in State
    const { data: timeData } = data[1];
    const { data: ipData } = data[2];

    const [currentTime, zone] = helper.unixtimeConvert(
      timeData.unixtime,
      timeData
    );

    state.time = {
      countryCode: zone,
      time: currentTime,
      weekDay: timeData.day_of_week,
      yearDay: timeData.day_of_year,
      timeZone: timeData.timezone.split('/'),
      weekNumber: timeData.week_number,
      country: ipData.country_name,
    };
  } catch (error) {
    if (error.response) {
      const { status, statusText, data } = error.response;

      const errorMessage = `
      Status: ${status} - ${statusText ? statusText : 'Not Found'};
      Error: ${data.statusMessage || data.message || data.statusText}.

      Please refresh the page or try again later.
      We're very sorry for the inconvenience.      
      `;

      window.alert(errorMessage);
      console.log(error.response);
    } else if (error.request) {
      const requestMessage = `
      The request is taking too long. 
      Please check your network connection and refresh the page
      or try again later.

      We're very sorry for the inconvenience.
      `;

      window.alert(requestMessage);
      console.log(error.request);
    }
  }
};
