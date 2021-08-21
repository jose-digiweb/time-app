//--> polyfilling
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing CSS
import './styles/index.scss';

//--> Importing Modules
import * as model from './javaScript/model';
import QuoteView from './javaScript/views/quoteView';
import TimeView from './javaScript/views/timeView';

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

const hideBAr = (function (win) {
  var doc = win.document;

  // If there's a hash, or addEventListener is undefined, stop here
  if (!location.hash && win.addEventListener) {
    //scroll to 1
    win.scrollTo(0, 1);
    var scrollTop = 1,
      getScrollTop = function () {
        return (
          win.pageYOffset ||
          (doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop) ||
          doc.body.scrollTop ||
          0
        );
      },
      //reset to 0 on bodyready, if needed
      bodycheck = setInterval(function () {
        if (doc.body) {
          clearInterval(bodycheck);
          scrollTop = getScrollTop();
          win.scrollTo(0, scrollTop === 1 ? 0 : 1);
        }
      }, 15);

    win.addEventListener(
      'load',
      function () {
        setTimeout(function () {
          //at load, if user hasn't scrolled more than 20 or so...
          if (getScrollTop() < 20) {
            //reset to hide addr bar at onload
            win.scrollTo(0, scrollTop === 1 ? 0 : 1);
          }
        }, 0);
      },
      false
    );
  }
})(this);
