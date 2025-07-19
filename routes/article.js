const express = require('express');
const {markAsRead, markAsFavorite, getReadArticles, getFavoriteArticles, searchArticles} = require('../controllers/articleController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();


// for saving the read and favorite articles
router.post('/news/:id/read', authenticateToken, markAsRead);
router.post('/news/:id/favorite', authenticateToken, markAsFavorite);
router.get('/news/read/articles', authenticateToken, getReadArticles);
router.get('/news/favorite/articles', authenticateToken, getFavoriteArticles);
router.get('/news/search/:keyword', authenticateToken, searchArticles);


module.exports = router;