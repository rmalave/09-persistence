const uuid = require('uuid/v4');

class Car {
  constructor(make, model, year) {
    this.id = uuid();
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

module.exports = Car;
