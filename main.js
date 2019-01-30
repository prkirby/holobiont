'use strict';
require('dotenv').config();
const Grid = require('./lib/grid');


const venues = [
  {id: 'e0:cb:bc:8a:3b:70', x: 6, y: 3},
  {id: 'e0:cb:bc:8a:3e:93', x: 0, y: 0},
  {id: 'e0:cb:bc:8a:3e:8e', x: 12, y: 9},
  {id: 'e0:cb:bc:8a:3e:95', x: 17, y: 6}
];

new Grid(20, 10, venues);
