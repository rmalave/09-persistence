const fs = require('fs');

let STORAGE_DIR = __dirname + '/savedfiles';

function carIdToFilename(id) {
  return `${STORAGE_DIR}/${id}.json`;
}

function save(car) {
  return new Promise((resolve, reject) => {
    let filename = carIdToFilename(car.id);
    let data = JSON.stringify(car);

    fs.writeFile(filename, data, (err, data) => {
      if (err) {
        throw err;
      }
      resolve(car);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    let filename = carIdToFilename(id);
    fs.readFile(filename, (err, data) => {
      if (err) {
        throw err;
      }
      let car = JSON.parse(data);
      resolve(car);
    });
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    fs.readdir(STORAGE_DIR, (err, files) => {
      if (err) {
        throw err;
      }
      resolve(files);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    get(id)
      .then(car => {
        let filename = carIdToFilename(id);
        fs.unlink(filename, (err) => {
          if (err) {
            throw err;
          }
          resolve(car);
        });
      });
  });
}

function removeAll() {
  return getAll()
    .then(files => {
      let promises = files.map(file => {
        let id = file.split('.json')[0];
        return remove(id);
      });
      return Promise.all(promises);
    });
}

module.exports = { save, removeAll, get, remove, getAll };
