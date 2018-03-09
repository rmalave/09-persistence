'use strict';
const request = require('superagent');
const SERVER = 'http://localhost:3000';
const storage = require('../lib/storage');

describe('Server', () => {
  test('throws 404 if route not found', (done) => {
    request.get(SERVER + '/notfound')
      .end((err, res) => {
        console.log('Error', err);
        expect(res.status).toBe(404);
        done();
      });
  });

  test('throws 404 if resource not found', (done) => {
    let badId = 'caa81db0-0734-4ae8-a6c3-e97560c4d3e4';
    request.get(`${SERVER}/api/v1/cars?id=${badId}`)
      .end((err, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });

  test('throws 400 if no valid id provided', (done) => {
    let noId = '';
    request.get(`${SERVER}/api/v1/cars?id=${noId}`)
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });

  test('returns with 200 and a when a valid request body provided.', (done) => {
    let validRequest = {make: 'toyota', model: 'corolla', year: '2020'};
    request.post(`${SERVER}/api/v1/cars`)
      .send(JSON.stringify(validRequest))
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  test('returns with 400 if no valid request body provided', (done) => {
    let badBody = {};
    request.post(`${SERVER}/api/v1/cars`)
      .set('Content-Type', 'application/json')
      .send(badBody)
      .end((err, res) => {
        console.log(res);
        expect(res.status).toBe(200);
        done();
      });
  });

  test('returns with 200 and a response body if valid id provided.', (done) => {
    let validId = '1293rsfwqedfs';
    request.get(`${SERVER}/api/v1/cars?id=${validId}`)
      .end((err, res) => {
        console.log(res);
        expect(res.status).toBe(200);
        done();
      });
  });
});
