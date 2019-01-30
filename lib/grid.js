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
        this.points.push(new Point(x, y, venues.length));
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
