'use strict';

class Venue {
    constructor(id, x, y, points) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.points = points;
        this.peak = 0;
    }

    update(val) {
        if (val > this.peak) {
            this.peak = val;
        }
        for (let point of this.points) {
            // Send a 0 - 1 value, always updated via peak
            // COMBAK: This should probably be based per all venues, not just one? 
            point.ping(this, val / this.peak);
        }
    }
}

module.exports = Venue;
