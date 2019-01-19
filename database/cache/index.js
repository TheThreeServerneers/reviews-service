/* eslint consistent-return: 0, no-console: 0 */
const redis = require('redis');
const db = require('../pg');

const client = redis.createClient();
client.on('error', err => console.error(err));

const cacheReviews = (productId, callback) => {
  client.get(productId, (err, reviewsJSON) => {
    if (err || reviewsJSON === null) {
      db.getAllReviews(productId, (err, reviews) => {
        if (err) {
          callback(err);
        }
        // console.log(`Setting ${productId} in cache`);
        client.set(productId, JSON.stringify(reviews));
        callback(null, reviews);
      });
    } else {
      // console.log(`Getting ${productId} in cache`);
      callback(null, JSON.parse(reviewsJSON));
    }
  });
};

module.exports = {
  cacheReviews,
};
