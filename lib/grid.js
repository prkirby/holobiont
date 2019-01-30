'use strict';
const Point = require('./point');
const Venue = require('./venue');

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.venues = [];
        this.points = [];
    }

    // print() {
    //   for (let i = 0; i < this.height; i++) {
    //     let string = '';
    //     for (let j = 0; j < this.width; j++) {
    //       string += ` ${this.points[j][i]}`;
    //     }
    //     console.log(string + '\n');
    //   }
    // }

    populate(venues) {
        for (var x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.points.push(new Point(x, y, venues.length));
            }
        }

        for (let venue of venues) {
            this.venues.push(new Venue(venue.x, venue.y, this.points));
        }
    }

    run() {
        this.pingVenues();
        setInterval(() => {
            this.pingVenues();
        }, 2000);
    }

    pingVenues() {
        for (let venue of this.venues) {
            venue.ping();
        }
    }
}

module.exports = Grid;
