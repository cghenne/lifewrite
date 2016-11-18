/* eslint no-use-before-define:0 */
// const _ = require('lodash');
// const config = require('../config');
// const querystring = require('querystring');

const test = {};

test.getTitle = () => {
  return new Promise((resolve, reject) => {
    resolve('Right title');
  });
};

module.exports = test;
