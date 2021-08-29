import 'regenerator-runtime/runtime';
import 'core-js/stable';

export const fetchData = async function (url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const unixtimeConvert = function (unixtime, timeData) {
  const timeStamp = unixtime;

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: timeData.timezone,
    timeZoneName: 'short',
  };

  const time = Intl.DateTimeFormat('en-UK', options)
    .format(timeStamp)
    .split(' ');

  return time;
};
