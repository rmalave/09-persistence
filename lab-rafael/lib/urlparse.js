'use strict';

const url = require('url');
const queryString = ('querystring');

module.exports = (req) => {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query); 

  return Promise.resolve(req);
};

