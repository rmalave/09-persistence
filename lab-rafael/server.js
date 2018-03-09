'use strict';

const http = require('http');
const bodyParser = require('./lib/bodyparser');
const Router = require('./lib/router');
const storage = require('./lib/storage');

const router = new Router();

router.get('/api/v1/cars', (req, res) => {
  let cars = storage.readAll();
  //for tests
  cars[1].id = '1293rsfwqedfs';
  let response = cars;

  if ('id' in req.url.query) {
    let id = req.url.query.id;
    if (id.length === 0) {
      console.log('400 bad request. Please provide a valid id');
      res.writeHead(400, {'Content-Type': 'text/plain'});
      throw '400 bad request';
    }
    
    cars.forEach(car => {
      if (car.id === id) {
        console.log('Found Car id', car.id);
        response = car;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
        return;
      }
    });

    console.log(`404 car not found id: ${id}`);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write(`404 Not found with id: ${id}`);
    res.end();
    return;
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(response));
  res.end();
});

router.post('/api/v1/cars', (req, res) => {
  bodyParser(req, res)
    .then(body => {
      if (!body.make || !body.model || !body.year) {
        throw '400 bad request';
      }
      let make = body.make;
      let model = body.model;
      let year = body.year;

      storage.create(model, make, year);
      res.end();
    }).catch(err => {
      console.log('Error from post', err);
      res.end();
      return;
    });
});

router.destroy('api/v1/cars', (req, res) => {
  let cars = storage.readAll();
  if ('id' in req.url.query) {
    let id = req.url.query.id;
    console.log('car id', cars[id]);
    cars.forEach((car, index) => {
      if (car.id === id) {
        storage.splice(index, 1);
        console.log(cars);
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end();
      }
    });
  }
});

const server = http.createServer((req, res) => {
  router.tryRoute(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  storage.seed();
  console.log(`Your are now listening on port http://localhost:${PORT}`);
});
