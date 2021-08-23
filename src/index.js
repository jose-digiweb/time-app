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
    //--> Render Loading Spinner
    QuoteView.renderSpinner();

    //--> Loading the Quote
    await model.loadQuote();
    const { text, author } = model.state.quote;

    //-->Rendering the Quote
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

    const {
      countryCode,
      dateTime,
      weekDay,
      yearDay,
      timeZone,
      weekNumber,
      country,
    } = model.state.time;

    //-->Rendering the Time Infos
    TimeView.renderTime(dateTime, countryCode, timeZone, country);

    //-->Rendering More Details Infos
    MoreDetailsView.renderMoreDetails(timeZone, weekDay, yearDay, weekNumber);
  } catch (error) {
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
