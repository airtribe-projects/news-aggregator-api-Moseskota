const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

// GET /news - fetch personalized news for the authenticated user
router.get('/', authenticateToken, getNews);

module.exports = router;
