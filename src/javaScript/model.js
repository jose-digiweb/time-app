//--> polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

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
    const { ip } = await helper.fetchData(IP_URL);

    const timeData = await helper.fetchData(`${TIME_URL}/ip/${ip}`);

    const ipData = await helper.fetchData(`${NETLIFY_URL}?ip=${ip}`);

    const timeStamp = timeData.unixtime;

    const language = ipData.languages.split(',')[0];

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: timeData.timezone,
      timeZoneName: 'short',
    };

    const time = Intl.DateTimeFormat(`${language}`, options)
      .format(timeStamp)
      .split(' ');

    state.time = {
      countryCode: time[1],
      time: time[0],
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
