import { render } from 'react-dom';
import React from 'react';
import Header from './Header';
import './styles/index.scss';

render(<Header />, document.getElementById('root'));

const obj = {
  ld: 1,
  lb: 2,
  cf: 3,
};

const obj2 = {
  ...obj,
  gd: 4,
};

console.log(obj, obj2);
