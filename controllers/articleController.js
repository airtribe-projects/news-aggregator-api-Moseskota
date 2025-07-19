
const User = require('../models/users'); 
const axios = require('axios');



const markAsRead = async (req, res) => {
    try {
        const articleId = decodeURIComponent(req.params.id);

        // Validate article ID
        if (!articleId || typeof articleId !== 'string') {
            return res.status(400).json({ message: 'Invalid article ID' });
        }

        // Refetch full user document using user ID from token
        const user = await User.findById(req.user.userId); // or req.user._id if that's what your JWT stores
        console.log('Decoded user from token:', req.user);


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already marked
        if (user.readArticles.includes(articleId)) {
            return res.status(200).json({ message: 'Article already marked as read' });
        }

        // Save to DB
        user.readArticles.push(articleId);
        await user.save();

        return res.status(200).json({ message: 'Article marked as read successfully' });

    } catch (error) {
        console.error('Error in markAsRead:', error.message);
        return res.status(500).json({ message: 'Server error. Could not mark as read.' });
    }
};


const markAsFavorite = async (req, res) => {
    try {
        const articleId = decodeURIComponent(req.params.id);

        // Validate article ID
        if (!articleId || typeof articleId !== 'string') {
            return res.status(400).json({ message: 'Invalid article ID' });
        }

        // Get full user document
        const user = await User.findById(req.user.userId);
        console.log('Decoded user from token:', req.user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already marked as favorite
        if (user.favoriteArticles.includes(articleId)) {
            return res.status(200).json({ message: 'Article already marked as favorite' });
        }

        // Save to DB
        user.favoriteArticles.push(articleId);
        await user.save();

        return res.status(200).json({ message: 'Article marked as favorite successfully' });

    } catch (error) {
        console.error('Error in markAsFavorite:', error.message);
        return res.status(500).json({ message: 'Server error. Could not mark as favorite.' });
    }
};

const getReadArticles = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the list of read article URLs
        return res.status(200).json({ readArticles: user.readArticles });

    } catch (error) {
        console.error('Error in getReadArticles:', error.message);
        return res.status(500).json({ message: 'Server error. Could not retrieve read articles.' });
    }
};

const getFavoriteArticles = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the list of read article URLs
        return res.status(200).json({ favoriteArticles: user.favoriteArticles });

    } catch (error) {
        console.error('Error in getFavoriteArticles:', error.message);
        return res.status(500).json({ message: 'Server error. Could not retrieve favorite articles.' });
    }
};



const searchArticles = async (req, res) => {
    const keyword = req.params.keyword;

    if (!keyword || keyword.trim().length < 2) {
        return res.status(400).json({ message: 'Keyword must be at least 2 characters' });
    }

    try {
        
        const apiKey = process.env.NEWS_API_KEY;

        // 
        
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&language=en&pageSize=10&apiKey=${apiKey}`
        );

        const articles = response.data.articles;

        return res.status(200).json({ keyword, results: articles });

    } catch (error) {
        console.error('Error fetching search results:', error.message);
        return res.status(500).json({ message: 'Failed to fetch search results' });
    }
};







module.exports = {markAsRead,markAsFavorite, getReadArticles, getFavoriteArticles, searchArticles};








































































































































































































// const hashUrl = require('../utils/hashUrl');
// const Article = require('../models/article');
// const User = require('../models/users');

// const markArticleAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const articleId = req.params.id;
//     const { url, title, description, source, publishedAt } = req.body;

//     if (!articleId) {
//       return res.status(400).json({ message: 'Article ID (from URL path) is required' });
//     }

//     // Check if article already exists in DB
//     let article = await Article.findOne({ articleId });

//     // If it doesn't exist, create it using details from the request body
//     if (!article) {
//       if (!url || !title || !description || !source || !publishedAt) {
//         return res.status(400).json({
//           message: 'Missing required article details to create a new record',
//         });
//       }

//       const generatedId = hashUrl(url);
//       if (generatedId !== articleId) {
//         return res.status(400).json({
//           message: 'Provided article ID does not match the hash of the URL',
//         });
//       }

//       article = new Article({
//         articleId,
//         url,
//         title,
//         description,
//         source,
//         publishedAt,
//       });

//       await article.save();
//     }

//     // Update the user's readArticles list
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!user.readArticles.includes(articleId)) {
//       user.readArticles.push(articleId);
//       await user.save();
//     }

//     return res.status(200).json({ message: 'Article marked as read successfully' });

//   } catch (err) {
//     console.error('Error in markArticleAsRead:', err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { markArticleAsRead };
