//--> polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing Helper Functions and Values
import * as helper from './helper';
import { QUOTE_URL, TIME_URL, IP_URL } from './config';

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

    const ipData = await helper.fetchData(IP_URL);

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

export const netFetch = async () => {
  try {
    const response = await fetch(
      `/.netlify/functions/fetchLocation/fetchLocation.js`
    );

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
