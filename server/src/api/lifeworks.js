/* eslint no-use-before-define:0 */
// 9iuz57185386c9690bc950547ec9e44878fc57185386c9690bc950547ec9e44878fc
const lifeworks = {};

/*
GET /api/users?token
PARAM {
  token: {type:string, required: true},
}
*/
lifeworks.getUsers = req => {
  return fetch('https://api.test.lifeworks.com/user', {
    method: 'GET',
     headers: {
       'Accept': 'application/vnd.wam-api-v1.3+json',
       'Wam-Token': req.query.token
     }
  })
  .then(response => response.json())
  .then(jsonResponse => {
    let updatedResponse = [];

    jsonResponse.body.map((user, index) => {
      updatedResponse.push({
        user_id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        image_profile: user.image_profile.url,
      });
    });

    return updatedResponse;
  });
};

/*
POST /api/login
BODY {
  username: {type:string, required: true},
  password: {type:string, required: true},
}
*/
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
        name: `${jsonResponse.meta.user.first_name} ${jsonResponse.meta.user.last_name}`,
        user_id: jsonResponse.meta.user.user_id,
      },
    };
  });
}

module.exports = lifeworks;
