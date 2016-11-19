const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const api = require('../api/');

router.route('/api/users').get((req, res) => {
  api.lifeworks.getUsers()
  .then((results) => {
    res.json(results);
  })
  .catch(console.error);
});

router.route('/api/login').post((req, res) => {
  api.lifeworks.login(req)
  .then((results) => {
    res.json(results);
  })
  .catch(console.error);
});

router.route('/api/conversation').post((req, res) => {
  api.conversation.createOrFetchConversation(req, res)
});

router.route('/api/conversation/:conversationId').put((req, res) => {
  api.conversation.updateConversation(req, res, req.params.conversationId)
});

module.exports = router
