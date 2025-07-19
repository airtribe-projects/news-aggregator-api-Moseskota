// app.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const updateAllCaches = require('./utils/cacheUpdate');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/article');
const newsRoutes = require('./routes/news');

// mounting the users 
app.use('/users', userRoutes);

app.use('/news', newsRoutes); // ensure /news endpoint is actually active

app.use('/api', articleRoutes);

// DB connection and cache updates should only be done externally
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Using DB:', mongoose.connection.name);

    updateAllCaches();

    // Run scheduled cache refresh every 15 minutes
    setInterval(() => {
      console.log('[Cache Refresh Started]');
      updateAllCaches();
    }, 15 * 60 * 1000);

  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

module.exports = app;

































// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const updateAllCaches = require('./utils/cacheUpdate');
// const dotenv = require('dotenv');
// dotenv.config();

// const port = process.env.PORT || 3000;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const userRoutes = require('./routes/users');
// const articleRoutes = require('./routes/article');




// // mounting the users 
// app.use('/users', userRoutes);
// app.use('/api', articleRoutes);




// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log('Connected to MongoDB');
//     console.log('Using DB:', mongoose.connection.name);

//     updateAllCaches();

//     setInterval(() => {
//         console.log('[Cache Refresh Started]');
//         updateAllCaches();
//         }, 15 * 60 * 1000); // every 15 minutes


//     app.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     });
// })
// .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
//     process.exit(1); // Exit if DB connection fails
// });


// // app.listen(port, (err) => {
// //     if (err) {
// //         return console.log('Something bad happened', err);
// //     }
// //     console.log(`Server is listening on ${port}`);
// // });



// module.exports = app;

