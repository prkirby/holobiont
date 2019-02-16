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
      'http://localhost:3000/',
      { reconnection: true }
    );

    this.socket.on('connect', () => {
      console.log('connected!');
    });

    this.socket.on('stop', () => {
      this.running = false;
      console.log('stopped');
    });

    this.socket.on('start', () => {
      this.running = true;
      console.log('started');
    });
  }

  run() {
    setInterval(() => {
      if (this.running) {
        console.log('running');
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
              sum += val;
              if (val > this.venuePeak) {
                this.venuePeak = val;
              }
              const venue = _.find(this.venues, ['id', id]);
              venue.update(val, this.venuePeak);
            }
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
