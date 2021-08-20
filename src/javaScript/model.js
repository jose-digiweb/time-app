import 'regenerator-runtime/runtime';
import 'core-js/stable';

import * as helper from './helper';
import { QUOTE_URL } from './config';

export const state = {
  quote: {
    text: '',
    author: '',
  },
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

const init = () => {};

init();
