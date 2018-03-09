'use strict';

let CARS = {};

function save(car) {
  return new Promise((resolve, reject) => {
    CARS[car.id] = car;
    resolve(car);
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    return CARS[id];
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    resolve(Object.values(CARS));
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    let car = get(id);
    delete CARS[id];
    resolve(car);
  });
}

function removeAll() {
  return new Promise((resolve, reject) => {
    let deletedCars = Object.values(CARS);
    CARS = {};
    resolve(deletedCars);
  });
}

module.exports = {
  save,
  get,
  getAll,
  remove,
  removeAll
};
