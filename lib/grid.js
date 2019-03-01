'use strict';
const Point = require('./point');
const Venue = require('./venue');
const Data = require('./data');

class Grid {
  constructor(width, height, venues) {
    this.width = width;
    this.height = height;
    this.venues = [];
    this.points = [];
    this.data;

    for (var x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if ((y % 2 == 0 && x % 2 == 1) || (y % 2 == 1 && x % 2 == 0)) {
          this.points.push(new Point(x, y, 4));
        }
      }
    }

    for (let venue of venues) {
      this.venues.push(new Venue(venue.id, venue.x, venue.y, this.points));
    }

    this.data = new Data(this.venues);

    this.run();
  }

  run() {
    this.data.run();
  }

  pingVenues() {
    for (let venue of this.venues) {
      venue.ping();
    }
  }
}

module.exports = Grid;
