[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19939128&assignment_repo_type=AssignmentRepo)


**News Aggregator API**
Project Overview
This is a RESTful API for a personalized news aggregator. It allows users to register, log in, manage their news preferences, and fetch personalized news articles from an external news API. The project emphasizes robust API development practices, including authentication, input validation, error handling, and caching.

**Features**
This API provides the following functionalities:

User Authentication:

Secure user registration with hashed passwords.

User login with JWT (JSON Web Token) based authentication.

Protected routes requiring a valid JWT token.

User Preferences Management:

Retrieve a logged-in user's personalized news preferences.

Update user preferences (e.g., news categories, languages).

Personalized News Fetching:

Integrates with an external News API (NewsAPI.org) to fetch articles.

Fetches news articles tailored to the logged-in user's preferences.

**Robustness**:

Implements input validation for user registration and preferences.

Comprehensive error handling for invalid inputs, unauthorized access, and external API failures.

Performance & Management (Optional Extensions Implemented):

**Caching Mechanism**: Caches fetched news articles using Redis to reduce external API calls and improve response times.

**Article Management**:

Mark news articles as read.

Mark news articles as favorite.

Retrieve all read articles for a user.

Retrieve all favorite articles for a user.

**Search Functionality**: Search for news articles based on keywords.

**Periodic Cache Updates**: Simulates real-time aggregation by periodically refreshing cached news articles in the background.

**Technologies Used**
Node.js: JavaScript runtime environment.
Express.js: Web application framework for Node.js.
MongoDB: NoSQL database for data storage (via Mongoose).
Mongoose: MongoDB object data modeling (ODM) for Node.js.
Redis: In-memory data store, used for caching.
bcrypt: Library for hashing passwords.
jsonwebtoken (JWT): For implementing token-based authentication.
axios: Promise-based HTTP client for making API requests (e.g., to NewsAPI.org).
dotenv: For loading environment variables from a .env file.
express-validator: Middleware for request input validation.
nodemon: Utility that monitors for changes in your source and automatically restarts your server (for development).
supertest: A library for testing HTTP servers.
tap: A test harness for Node.js.

**Installation**
To set up and run the News Aggregator API locally, follow these steps:

Prerequisites
Node.js: Version 18.0.0 or higher.
npm (Node Package Manager) or yarn.
MongoDB: A running MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas).
Redis: A running Redis instance (local or cloud-hosted).
Git: For cloning the repository.

**Clone the Repository**
git clone <your-repository-url> # Replace with your actual repository URL
cd news-aggregator-api

**Environment Variables**
Create a .env file in the root directory of the project and add the following environment variables. Replace the placeholder values with your actual credentials and configurations.

PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<databaseName>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key # Use a strong, random string
REDIS_URL=redis://localhost:6379 # Or your cloud Redis URL
NEWS_API_KEY=YOUR_NEWSAPI_API_KEY # Get your API key from https://newsapi.org/

**Install Dependencies**
npm install
# OR
yarn install

**Running the Application**
To start the development server:

npm run start
# This uses nodemon to automatically restart the server on code changes.

The API will typically run on http://localhost:3000 (or the PORT specified in your .env file).

**API Endpoint Documentation**
Below is the documentation for the API endpoints, including their methods, paths, and expected behaviors.

1. User Authentication & Management
POST /users/signup
Description: Registers a new user in the system.

Authentication Required: No

Request Body Example:

{
    "name": "Clark Kent",
    "email": "clark@superman.com",
    "password": "Krypt()n8",
    "preferences": ["movies", "comics"]
}

**Validation Rules**:

name: Required, must not be empty.

email: Required, must be a valid email address.

password: Required, must be at least 6 characters long.

preferences: Optional, must be an array.

Response (Success - 200 OK):

If user is newly registered:

{
    "message": "User registered successfully"
}

If user already exists with matching credentials (for testing purposes):

{
    "message": "User already registered"
}

Response (Error - 400 Bad Request):

If validation fails:

{
    "errors": [
        { "msg": "Validation error message", "param": "field_name", "location": "body" }
    ]
}

If user with email already exists (and credentials don't match or for strict production behavior):

{
    "error": "User already exists"
}

Response (Error - 500 Internal Server Error):

{
    "error": "user registration failed"
}

POST /users/login
Description: Authenticates a user and returns a JWT token upon successful login.

Authentication Required: No

Request Body Example:

{
    "email": "clark@superman.com",
    "password": "Krypt()n8"
}

Validation Rules:

email: Required, must be a valid email address.

password: Required, must not be empty.

Response (Success - 200 OK):

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdiMjg5Zjc1MWM2NjJlMmNmYzA2OGIiLCJpYXQiOjE3NTI5Mzg2NTcsImV4cCI6MTc1Mjk0MjI1N30.wLFpRoQpU0sebL4oEIw3bzjU2C9s6I3-bhZJhauqxbQ"
}

Response (Error - 400 Bad Request):

If validation fails:

{
    "errors": [
        { "msg": "Valid email address required", "param": "email", "location": "body" }
    ]
}

Response (Error - 401 Unauthorized):

{
    "error": "Invalid credentials"
}

Response (Error - 500 Internal Server Error):

{
    "error": "Login failed"
}

GET /users/preferences
Description: Retrieves the logged-in user's personalized news preferences.

Authentication Required: Yes (JWT Bearer Token in Authorization header)

Request Example:
GET http://localhost:3000/users/preferences
(with Authorization: Bearer <your_token>)

Response (Success - 200 OK):

{
    "preferences": ["movies", "comics"]
}

Response (Error - 401 Unauthorized):

{
    "error": "wrong token , access denied"
}

or

{
    "error": "Invalid or expired token"
}

Response (Error - 404 Not Found):

{
    "error": "user not found"
}

Response (Error - 500 Internal Server Error):

{
    "error": "could not get preferences"
}

PUT /users/preferences
Description: Updates the logged-in user's news preferences.

Authentication Required: Yes (JWT Bearer Token in Authorization header)

Request Example:
PUT http://localhost:3000/users/preferences
(with Authorization: Bearer <your_token>)

Request Body Example:

{
    "preferences": ["movies", "comics"]
}

Validation Rules:

preferences: Optional, must be an array.

Response (Success - 200 OK):

{
    "preferences": ["movies", "comics"]
}

Response (Error - 401 Unauthorized):

{
    "error": "wrong token , access denied"
}

or

{
    "error": "Invalid or expired token"
}

Response (Error - 404 Not Found):

{
    "error": "user not found"
}

Response (Error - 500 Internal Server Error):

{
    "error": "Server error updating references"
}

2. News Articles
GET /news
Description: Fetches personalized news articles for the logged-in user based on their stored preferences. Articles are cached to improve performance.

Authentication Required: Yes (JWT Bearer Token in Authorization header)

Request Example:
GET http://localhost:3000/news
(with Authorization: Bearer <your_token>)

Response (Success - 200 OK):

{
    "news": [
        {
            "source": { "id": null, "name": "Variety" },
            "author": "Elskes",
            "title": "French Box Office Drops 10% During Lackluster First Half of 2025",
            "description": "After a milestone year in 2024 that saw France solidify its status as Europe’s healthiest theatrical market, the country’s box office dipped 10% during the first half of 2025 in the absence of a massive success. At the midpoint of this year, no movie has pass…",
            "url": "https://variety.com/2025/film/global/french-box-office-drops-first-half-2025-1236464575/",
            "urlToImage": "https://variety.com/wp-content/uploads/2025/07/rcAb0lVdDNBnC0BOCWlAf7D9wd7-1200-1200-675-675-crop-000000.jpg?w=1000&h=563&crop=1",
            "publishedAt": "2025-07-18T16:03:45Z",
            "content": "After a milestone year in 2024 that saw France solidify its status as Europe’s healthiest theatrical market, the country’s box office dipped 10% during the first half of 2025 in the absence of a mass… [+4299 chars]"
        },
        {
            "source": { "id": null, "name": "Gizmodo.com" },
            "author": "Isaiah Colbert",
            "title": "We Almost Lived in a Timeline Where ‘Morbius’ Was Made by ‘Midsommar’ Director Ari Aster",
            "description": "Fans could've gotten a whole different take on Sony's Spider-Man vampire spin-off.",
            "url": "https://gizmodo.com/we-almost-lived-in-a-timeline-where-morbius-was-made-by-midsommar-director-ari-aster-2000631303",
            "urlToImage": "https://gizmodo.com/app/uploads/2025/07/morbius-2-1200x675.jpg",
            "publishedAt": "2025-07-18T16:03:29Z",
            "content": "Marvel’s perpetually delayed Blade movie, which took on new life as the costuming for Ryan Coogler’s Sinners, may never see the light of day. But it’s worth remembering we did already get a vampire m… [+2968 chars]"
        }
        // ... (truncated for brevity, actual response will contain more articles)
    ]
}

Response (Error - 400 Bad Request):

{
    "error": "User preferences are missing or malformed"
}

Response (Error - 401 Unauthorized):

{
    "error": "wrong token , access denied"
}

or

{
    "error": "Invalid or expired token"
}

Response (Error - 404 Not Found):

{
    "error": "User not found"
}

Response (Error - 500 Internal Server Error):

{
    "message": "Could not fetch preferred news articles"
}

Response (Error - 502 Bad Gateway):

{
    "message": "Invalid response from NewsAPI"
}

POST /api/news/:encodedURI/read
Description: Marks a specific news article as "read" for the logged-in user. The article is identified by its URL, which must be URI-encoded.

Authentication Required: Yes (JWT Bearer Token)

URL Parameters:

encodedURI: The URI-encoded URL of the article to mark as read.

Request Example:
POST http://localhost:3000/api/news/https%3A%2F%2Fwww.sueddeutsche.de%2Fleben%2Fdie-erziehungsberechtigten-kolumne-smartphone-kinder-eltern-li.3284750/read
(with Authorization: Bearer <your_token>)

Response (Success - 200 OK):

If article is newly marked as read:

{
    "message": "Article marked as read successfully"
}

If article was already marked as read:

{
    "message": "Article already marked as read"
}

Response (Error - 401 Unauthorized): (Same as above)

Response (Error - 404 Not Found):

{
    "error": "User not found"
}

Response (Error - 500 Internal Server Error):

{
    "error": "Failed to mark article as read"
}

GET /api/news/read/articles
Description: Retrieves all news articles previously marked as "read" by the logged-in user.

Authentication Required: Yes (JWT Bearer Token)

Request Example:
GET http://localhost:3000/api/news/read/articles
(with Authorization: Bearer <your_token>)

Response (Success - 200 OK):

{
    "readArticles": ["https://www.sueddeutsche.de/leben/die-erziehungsberechtigten-kolumne-smartphone-kinder-eltern-li.3284750"]
}

Response (Error - 401 Unauthorized): (Same as above)

Response (Error - 404 Not Found):

{
    "error": "User not found"
}

Response (Error - 500 Internal Server Error):

{
    "error": "Failed to retrieve read articles"
}

POST /api/news/:encodedURI/favorite
Description: Marks a specific news article as "favorite" for the logged-in user. The article is identified by its URL, which must be URI-encoded.

Authentication Required: Yes (JWT Bearer Token)

URL Parameters:

encodedURI: The URI-encoded URL of the article to mark as favorite.

Request Example:
POST http://localhost:3000/api/news/https%3A%2F%2Fwww.sueddeutsche.de%2Fleben%2Fdie-erziehungsberechtigten-kolumne-smartphone-kinder-eltern-li.3284750/favorite
(with Authorization: Bearer <your_token>)

Response (Success - 200 OK):

If article is newly marked as favorite:

{
    "message": "Article marked as favorite successfully"
}

If article was already marked as favorite:

{
    "message": "Article already marked as favorite"
}

Response (Error - 401 Unauthorized): (Same as above)

Response (Error - 404 Not Found):

{
    "error": "User not found"
}

Response (Error - 500 Internal Server Error):

{
    "error": "Failed to mark article as favorite"
}

GET /api/news/favorites (Inferred from requirements)
Description: Retrieves all news articles previously marked as "favorite" by the logged-in user.

Authentication Required: Yes (JWT Bearer Token)

Request Example:
GET http://localhost:3000/api/news/favorite/articles
(with Authorization: Bearer <your_token>)

Response (Success - 200 OK):

{
    "favoriteArticles": ["https://www.sueddeutsche.de/leben/die-erziehungsberechtigten-kolumne-smartphone-kinder-eltern-li.3284750"]
}

Response (Error - 401 Unauthorized): (Same as above)

Response (Error - 404 Not Found):

{
    "error": "User not found"
}

Response (Error - 500 Internal Server Error):

{
    "error": "Failed to retrieve favorite articles"
}

GET /api/news/search/:keyword
Description: Searches for news articles based on a provided keyword.

Authentication Required: Yes (JWT Bearer Token)

URL Parameters:

keyword: The search term for news articles.

Request Example:
GET http://localhost:3000/api/news/search/bitcoin
(with Authorization: Bearer <your_token>)

Response (Success - 200 OK):

{
    "keyword": "bitcoin",
    "results": [
        {
            "source": { "id": "wired", "name": "Wired" },
            "author": "Joel Khalili",
            "title": "A False Start on the Road to an All-American Bitcoin",
            "description": "Donald Trump pledged to cement the US as the bitcoin mining capital of the planet. The president’s sweeping tariffs stand to simultaneously undermine and advance that ambition in one swoop.",
            "url": "https://www.wired.com/story/a-false-start-on-the-road-to-an-all-american-bitcoin/",
            "urlToImage": "https://media.wired.com/photos/68531ba03ca23a58119ac365/191:100/w_1280,c_limit/061825-amercian-bitcoin-false-start.jpg",
            "publishedAt": "2025-06-20T09:30:00Z",
            "content": "Mining firms are also facing heightened competition for limited energy resources in the US, mostly from AI companies flush with venture funding. New projections from the US Department of Energy indic… [+3401 chars]"
        },
        {
            "source": { "id": null, "name": "Gizmodo.com" },
            "author": "Matt Novak",
            "title": "Bitcoin Whales Are Offloading Their Bags on Institutional Investors",
            "description": "The reason the price of Bitcoin has been stuck is pretty clear.",
            "url": "https://gizmodo.com/bitcoin-whales-are-offloading-their-bags-on-institutional-investors-2000623879",
            "urlToImage": "https://gizmodo.com/app/uploads/2025/07/bitcoin-photo-1200x675.jpg",
            "publishedAt": "2025-07-03T18:10:13Z",
            "content": "Bitcoin enthusiasts have been perplexed lately. Why is the price so stagnant, even with all the hype created by guys like President Donald Trump? The White House has largely been seen as enacting a p… [+2900 chars]"
        }
        // ... (truncated for brevity, actual response will contain more articles)
    ]
}

Response (Error - 400 Bad Request):

{
    "error": "Keyword is required for search"
}

Response (Error - 401 Unauthorized): (Same as above)

Response (Error - 500 Internal Server Error):

{
    "message": "Could not fetch search results"
}

Response (Error - 502 Bad Gateway):

{
    "message": "Invalid response from NewsAPI for search"
}

NEWSAPI Usage Details
The API integrates with NewsAPI.org to fetch news articles.

API Key: An API key from NewsAPI.org is required and must be provided as an environment variable (NEWS_API_KEY). This key is sent in the X-Api-Key header for all requests to the NewsAPI.

Endpoint: The primary endpoint used is https://newsapi.org/v2/everything.

Query Parameters:

q: Used for searching keywords (e.g., from user preferences or search queries).

language: Filters articles by language (defaults to 'en' - English).

sortBy: Sorts articles by publishedAt (most recent first).

pageSize: Limits the number of articles returned (currently set to 10).

Rate Limits: Users on the free tier of NewsAPI.org are typically limited to 1,000 requests per day. Please monitor your usage on your NewsAPI dashboard (as shown in the provided image) to avoid hitting this limit.

Image URLs: NewsAPI responses include urlToImage which may sometimes be null if no image is available for an article.

Cache Management (updateAllCaches)
The API implements a caching mechanism using Redis to enhance performance and reduce redundant calls to the external NewsAPI.

The updateAllCaches utility is responsible for periodically refreshing the cached news articles.

Functionality:

It iterates through all registered users in the database.

For each user, it fetches their personalized news preferences.

It then makes a request to the NewsAPI based on these preferences.

The fetched articles are stored in Redis under a specific cache key for that user, with an expiry time (TTL - Time To Live) of 900 seconds (15 minutes). This ensures that subsequent requests for the same user's news are served quickly from the cache.

It also logs cache updates to the console for monitoring.

Triggering:

updateAllCaches() is called once immediately after the application successfully connects to MongoDB.

It is then scheduled to run automatically every 15 minutes (setInterval(() => { ... }, 15 * 60 * 1000)) to keep the cached news relatively fresh.

Cache Key Format: The cache keys for personalized news are typically structured as news:<userId>:<categoriesQuery>:<language>.

Further Information Needed:
This README.md is now quite comprehensive. If you have any other specific details or sections you'd like to add, please let me know!
