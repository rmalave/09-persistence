const file = require('./file-storage');

const Car = require('../models/car');

function seed(storage) {
  return storage.removeAll()
    .then(() => {
      return Promise.all([
        storage.save(new Car('tesla', 'model s', '2015')),
        storage.save(new Car('tesla', 'model x', '2017'))
      ]);
    });
}

module.exports = { file, seed };
