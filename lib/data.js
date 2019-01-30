'use strict';
const Max = require('max-api');

class Data {
    constructor(venues) {
        this.venues = venues;
        this.peak = 0;
    }

    run() {
        setInterval(() => {
            let sum = 0;

            for (let venue of this.venues) {
                const val = Math.random();
                venue.update(val);
                sum += val;
            }

            this.sendTotal(sum);
        }, 2000);
    }

    sendTotal(sum) {
        if (sum > this.peak) {
            this.peak = sum;
        }

        // Constantly re-evaluate what the 'biggest' number is;
        const value = sum / this.peak;
        Max.outlet(['s', value]);
    }
}

module.exports = Data;
