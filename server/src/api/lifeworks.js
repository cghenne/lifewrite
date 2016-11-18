/* eslint no-use-before-define:0 */
// const _ = require('lodash');
// const config = require('../config');
// const querystring = require('querystring');

const lifeworks = {};

lifeworks.getUsers = () => {
  return fetch('https://api.test.lifeworks.com/user', {
    method: 'GET',
     headers: {
       'Accept': 'application/vnd.wam-api-v1.3+json',
       'Wam-Token': '9iuz5e740ed151473bf61350d236b33ecd735e740ed151473bf61350d236b33ecd73'
     }
  }).then(response => response.json());
};

module.exports = lifeworks;
