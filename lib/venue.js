'use strict';

class Venue {
  constructor(id, x, y, points) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.points = points;
  }

  update(val, peak) {
    for (let point of this.points) {
      // Send a 0 - 1 value, always updated via peak sent from data
      point.ping(this, val / peak);
    }
  }
}

module.exports = Venue;
