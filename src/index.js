//--> polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing CSS
import './styles/index.scss';

//--> Importing Modules
import * as model from './javaScript/model';
import QuoteView from './javaScript/views/quoteView';
import TimeView from './javaScript/views/timeView';
import MoreDetailsView from './javaScript/views/moreDetailsView';
import { fullScreenMode } from './javaScript/views/fullscreenMode';

const quoteControl = async () => {
  try {
    //--> Rendering the Loading Spinner
    QuoteView.renderSpinner();

    //--> Loading the Quotes
    await model.loadQuote();
    const { text, author } = model.state.quote;

    //--> Rendering the Quote
    QuoteView.renderQuote(text, author);
  } catch (error) {
    const errorMessage = `
    Something went wrong, we couldn't get the data.
    Please refresh the page or try again later.
    We're very sorry for the inconvenience.
    `;

    window.alert(errorMessage);
    QuoteView.clear();
    console.log(error);
  }
};

const TimeControl = async () => {
  try {
    //--> Rendering the Loading Spinner
    TimeView.renderSpinner();

    //--> Rendering Fullscreen request message
    TimeView.renderMessage();

    //--> Loading the Time Data
    await model.loadTimeData();

    //--> Extracting Data from State
    const {
      countryCode,
      time,
      weekDay,
      yearDay,
      timeZone,
      weekNumber,
      country,
    } = model.state.time;

    //--> Rendering the Background Images Responsively
    TimeView.renderBG(time);

    //-->Rendering the Time Infos
    TimeView.renderTime(time, countryCode, timeZone, country);

    //-->Rendering More Details Infos
    MoreDetailsView.renderMoreDetails(timeZone, weekDay, yearDay, weekNumber);
  } catch (error) {
    const errorMessage = `
    Something went wrong, we couldn't get the data.
    Please refresh the page or try again later.
    We're very sorry for the inconvenience.
    `;

    window.alert(errorMessage);
    QuoteView.clear();
    console.log(error);
  }
};

const init = () => {
  fullScreenMode();
  QuoteView.handleQuoteGenerate(quoteControl);
  MoreDetailsView.handleShowMore();
  MoreDetailsView.handleShowLess();
  TimeControl();
};

init();
