// utils/cacheUpdater.js
const axios = require('axios');
const redisClient = require('../utils/redisclient');

const popularKeywords = ['bitcoin', 'AI', 'India', 'technology', 'sports'];

async function updateCacheForKeyword(keyword) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(url);

    if (response.data && response.data.articles) {
      const cacheKey = `news:search:${keyword}`;
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(response.data.articles));
      console.log(`[Cache Updated] ${keyword}`);
    }
  } catch (error) {
    console.error(`[Cache Update Failed] ${keyword}`, error.message);
  }
}

async function updateAllCaches() {
  for (const keyword of popularKeywords) {
    await updateCacheForKeyword(keyword);
  }
}

module.exports = updateAllCaches;
