'use strict';
const Max = require('max-api');
const Axios = require('axios');
const _ = require('lodash');

class Data {
  constructor(venues) {
    this.venues = venues;
    this.sumPeak = 0;
    this.venuePeak = 0;
    this.url = process.env.FLYBY_URL;
    this.user = process.env.FLYBY_U;
    this.pw = process.env.FLYBY_P;
  }

  run() {
    setInterval(() => {
      Axios.post(this.url, {
        'userName': this.user,
        'password': this.pw
      }, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(({ data }) => {
          let sum = 0;
          for (let {locationId: id, currentCount: val} of data) {
            sum += val;
            if (val > this.venuePeak) {
              this.venuePeak = val;
            }
            const venue = _.find(this.venues, ['id', id]);
            venue.update(val, this.venuePeak);
          }
          this.sendTotal(sum);
        })
        .catch((error) => {
          console.log(error);
        });
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
}

module.exports = Data;
