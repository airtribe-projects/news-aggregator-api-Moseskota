// importing all the dependencies

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const User = require('../models/users');
const { ValidateUserRegister, ValidateUserlogin } = require('../validators/userValidators');
const {registerUser, loginUser, getUserpreferences, updateUserpreferences} = require('../controllers/userController');
const { markAsRead, markAsfavorite, getReadArticles, getFavoriteArticles} = require('../controllers/articleController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

// user registration
// parsing and checking the body of the request
// router.post('/register', ValidateUserRegister, registerUser);
router.post('/signup', ValidateUserRegister, registerUser);
router.post('/login', ValidateUserlogin, loginUser);
router.get('/preferences', authenticateToken, getUserpreferences);
router.put('/preferences', authenticateToken, updateUserpreferences);
// router.get('/', authenticateToken, getNews);
// router.get('/news', authenticateToken, getNews);


// // for saving the read and favorite articles
// router.post('/news/:id/read', authenticateToken, markAsRead );
// router.post('news/:id/favorite', authenticateToken, markAsfavorite );








module.exports = router;
 