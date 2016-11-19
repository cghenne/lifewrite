/* eslint no-use-before-define:0 */
// const _ = require('lodash');
// const config = require('../config');
// const querystring = require('querystring');

const lifeworks = {};

lifeworks.getUsers = req => {
  return fetch('https://api.test.lifeworks.com/user', {
    method: 'GET',
     headers: {
       'Accept': 'application/vnd.wam-api-v1.3+json',
       'Wam-Token': JSON.stringify(req.body.token)
     }
  }).then(response => response.json());
};

lifeworks.login = req => {
  return fetch('https://shim.test.lifeworks.com/authenticate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: JSON.stringify(req.body),
  })
  .then(response => response.json())
  .then(jsonResponse => {
    return {
      lifeworks_token: jsonResponse.meta.user_token,
      user: {
        first_name: jsonResponse.meta.user.first_name,
        last_name: jsonResponse.meta.user.last_name,
        user_id: jsonResponse.meta.user.user_id,
      },
    };
  });
}

module.exports = lifeworks;
