const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const api = require('../api/');

router.route('/api/users').get((req, res) => {
  api.lifeworks.getUsers(req)
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

router.route('/api/conversation/:conversationId').put((req, res) => {
  api.conversation.updateConversation(req, res, req.params.conversationId)
});

router.route('/api/conversation/user/:userId').get((req, res) => {
  api.conversation.getConversationListForUser(req, res, req.params.userId)
});

router.route('/api/conversation/:conversationId/history/:timestamp').get((req, res) => {
  api.history.getHistory(req, res, req.params.conversationId, parseInt(req.params.timestamp))
});
module.exports = router
