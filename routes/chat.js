const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getChatHistory,
  getChatSession,
  deleteChatSession,
  createNewChat
} = require('../controllers/chatController');
const auth = require('../middleware/auth');

// All chat routes are protected
router.use(auth);

// Chat routes
router.post('/message', sendMessage);
router.post('/new', createNewChat);
router.get('/history', getChatHistory);
router.get('/session/:sessionId', getChatSession);
router.delete('/session/:sessionId', deleteChatSession);

module.exports = router;
