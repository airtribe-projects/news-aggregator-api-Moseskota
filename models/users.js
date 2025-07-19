const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    preferences: {
        type: [String],
        default: []
    },
    readArticles: [{ type: String }],
    favoriteArticles: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
