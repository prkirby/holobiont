'use strict';
const Max = require('max-api');
const Axios = require('axios');
const _ = require('lodash');
const io = require('socket.io-client');

class Data {
  constructor(venues) {
    this.venues = venues;
    this.sumPeak = 0;
    this.venuePeak = 0;
    this.url = process.env.FLYBY_URL;
    this.user = process.env.FLYBY_U;
    this.pw = process.env.FLYBY_P;
    this.running = true;

    this.socket = io.connect(
      'http://holobiont.uwldev.com:30000',
      { reconnection: true }
    );

    this.socket.on('connect', () => {
      console.log('connected!');
    });

    this.socket.on('stop', () => {
      console.log('stopped');
      Max.outlet('stop');
    });

    this.socket.on('start', () => {
      console.log('started');
      Max.outlet('start');
    });

    this.socket.on('reset', () => {
      console.log('reset');
      Max.outlet('reset');
      this.venuePeak = 0;
      this.sumPeak = 0;
    });
  }

  run() {
    setInterval(() => {
      if (this.running) {
        Axios.post(
          this.url,
          {
            userName: this.user,
            password: this.pw
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }
        )
          .then(({ data }) => {
            let sum = 0;
            for (let { locationId: id, currentCount: val } of data) {
              // Find the venue
              const venue = _.find(this.venues, ['id', id]);

              if (venue) {
                // update it
                venue.update(val, this.venuePeak);

                // Set a global venue peak
                if (val > this.venuePeak) {
                  this.venuePeak = val;
                }

                sum += val;
              }
            }

            // Send the total
            this.sendTotal(sum);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.reset();
      }
    }, 2000);
  }

  sendTotal(sum) {
    if (sum > this.sumPeak) {
      this.sumPeak = sum;
    }

    // Constantly re-evaluate what the 'biggest' number is;
    const value = sum / this.sumPeak;
    Max.outlet(['s', value]);
  }

  reset() {
    console.log('trying to reset');
    this.venuePeak = 0;
    for (let venue of this.venues) {
      venue.update(1, 2);
    }
  }
}

module.exports = Data;
