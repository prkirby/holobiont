'use strict';
require('dotenv').config();
const Grid = require('./lib/grid');

const venues = [
  { id: '9', x: 4, y: 1 }
];

new Grid(12, 13, venues);
