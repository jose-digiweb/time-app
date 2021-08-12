import './styles/index.scss';

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
