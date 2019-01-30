'use strict';
const Max = require('max-api');

class Point {
    constructor(x, y, bufferSize) {
        this.x = x;
        this.y = y;
        this.val = 0;
        this.maxDistance = 2.5;
        this.buffer = [];
        this.bufferSize = bufferSize;
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }

    ping(venue, val) {
        const dist = Math.sqrt(Math.pow(this.x - venue.x, 2) + Math.pow(this.y - venue.y, 2));

        if (dist > this.maxDistance) {
            return;
        }
        const newVal = val * ((this.maxDistance - dist) / this.maxDistance);
        // console.log(newVal);
        this.calculateVal(newVal);
    }

    calculateVal(newVal) {
        this.buffer.push(newVal);
        if (this.buffer.length >= this.bufferSize) {
            this.val = this.buffer.reduce((cur, sum) => cur + sum) / this.bufferSize;
            this.buffer = [];
            Max.outlet([this.val, this.y, this.x]);
            console.log(`Point ${this.x}, ${this.y} val: ${this.val}`);
        }
    }
}

module.exports = Point;