'use strict';
require('dotenv').config();
const Grid = require('./lib/grid');

const venues = [
  { id: '1', x: 1, y: 10 }
];

new Grid(12, 13, venues);
