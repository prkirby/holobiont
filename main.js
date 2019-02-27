'use strict';
require('dotenv').config();
const Grid = require('./lib/grid');

const venues = [
  { id: '2', x: 5, y: 6 }
];

new Grid(12, 13, venues);
