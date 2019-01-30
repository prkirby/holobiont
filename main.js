'use strict';
const Grid = require('./lib/grid');


const venues = [
  {id: 1, x: 4, y: 4},
  {id: 2, x: 0, y: 0},
  {id: 3, x: 19, y: 9},
  {id: 4, x: 11, y: 4}
];

new Grid(20, 10, venues);
