import 'regenerator-runtime/runtime';
import 'core-js/stable';

export const fetchData = async function (url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
