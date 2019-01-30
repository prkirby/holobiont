'use strict';

class Venue {
    constructor(x, y, points) {
        this.x = x;
        this.y = y;
        this.points = points;
    }

    ping() {
        const val = Math.random();
        for (let point of this.points) {
            point.ping(this, val);
        }
    }
}

module.exports = Venue;
