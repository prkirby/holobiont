'use strict';
const Max = require('max-api');

class Point {
  constructor(x, y, bufferSize) {
    this.x = x;
    this.y = y;
    this.val = 0;
    this.maxDistance = 4.5;
    this.buffer = [];
    this.bufferSize = bufferSize;
  }

  toString() {
    return `[${this.x}, ${this.y}]`;
  }

  ping(venue, val) {
    const dist = Math.sqrt(
      Math.pow(this.x - venue.x, 2) + Math.pow(this.y - venue.y, 2)
    );

    if (dist > this.maxDistance) {
      return;
    }
    const newVal = val * ((this.maxDistance - dist) / this.maxDistance);
    this.calculateVal(newVal);
  }

  calculateVal(newVal) {
    this.buffer.push(newVal);
    if (this.buffer.length >= this.bufferSize) {
      let max = 0;
      for (var i = 0; i < this.buffer.length; i++) {
        if (this.buffer[i] > max) {
          max = this.buffer[i];
        }
      }
      this.val = max;
      this.buffer = [];
      Max.outlet(['p', this.x, this.y, this.val]);
    }
  }
}

module.exports = Point;
