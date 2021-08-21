//--> polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing CSS
import './styles/index.scss';

//--> Importing Modules
import * as model from './javaScript/model';
import QuoteView from './javaScript/views/quoteView';
import TimeView from './javaScript/views/timeView';

document.documentElement.requestFullscreen();

const quoteControl = async () => {
  try {
    //--> Render Loading Spinner
    QuoteView.renderSpinner();

    //--> Loading the Quotes
    await model.loadQuote();
    const { text, author } = model.state.quote;

    //-->Rendering the Quotes
    QuoteView.renderQuote(text, author);
  } catch (error) {
    console.log(error);
  }
};

const TimeControl = async () => {
  try {
    //--> Render Loading Spinner
    TimeView.renderSpinner();

    //--> Loading the Time Data
    await model.loadTime();

    const { countryCode, dateTime, weekDay, yearDay, timeZone, weekNumber } =
      model.state.time;

    //-->Rendering the Time Infos
    TimeView.renderTime(dateTime, countryCode, timeZone);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  QuoteView.handleQuoteGenerate(quoteControl);
  TimeControl();
};

init();
