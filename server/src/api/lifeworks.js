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
       'Wam-Token': '9iuz86ee4d6bb552c1dca05b69a6a5cfac7b86ee4d6bb552c1dca05b69a6a5cfac7b'
     }
  }).then(response => response.json());
};

lifeworks.login = req => {
  return fetch('https://api.test.lifeworks.com/auth/mobile', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.wam-api-v1.3+json',
    },
    body: req,
  }).then(response => response.json());
}

module.exports = lifeworks;
