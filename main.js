'use strict';
require('dotenv').config();
const Grid = require('./lib/grid');

const venues = [
  { id: '1', x: 2, y: 10 }
];

new Grid(13, 13, venues);
