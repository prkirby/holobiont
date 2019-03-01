'use strict';
require('dotenv').config();
const Grid = require('./lib/grid');

const venues = [
  { id: '1', x: 8, y: 3 },
  { id: '2', x: 4, y: 1 },
  { id: '3', x: 11, y: 6 },
  { id: '4', x: 1, y: 9 },
  { id: '5', x: 6, y: 7 },
  { id: '6', x: 8, y: 12 },
  { id: '7', x: 1, y: 12 },
  { id: '9', x: 0, y: 3 }
];

new Grid(12, 13, venues);
