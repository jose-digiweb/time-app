import 'regenerator-runtime/runtime';
import 'core-js/stable';

import './styles/index.scss';

import * as model from './javaScript/model';
import QuoteView from './javaScript/views/quoteView';

export const quoteControl = async () => {
  try {
    //--> Loading the Quotes
    await model.loadQuote();
    const { text, author } = model.state.quote;

    //-->Rendering the Quotes
    QuoteView.renderQuote(text, author);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  QuoteView.handleQuoteGenerate(quoteControl);
};

init();
