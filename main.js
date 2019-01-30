'use strict';
const Grid = require('./lib/grid');

const grid = new Grid(3, 3);

const venues = [
  {x: 2, y: 0},
  {x: 0, y: 2}
];

grid.populate(venues);
grid.run();
