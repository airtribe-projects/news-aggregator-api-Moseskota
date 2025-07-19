const redis = require('redis');
require('dotenv').config();


// creating the redis client and connecting it

const client = redis.createClient({url: process.env.REDIS_URL||'redis://localhost:6379',});

client.on('error',(err) => {
    console.error('Redis client error', err)
});

client.connect();

module.exports = client;