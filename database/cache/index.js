/* eslint consistent-return: 0, no-console: 0 */
const redis = require('redis');
const db = require('../pg');

const client = redis.createClient();
client.on('error', err => console.error(err));

const getAllReviews = (productId, callback) => {
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

const addReview = (data, callback) => {
  const productId = data.product_id;
  db.addReview(data, (err, rowsChanged) => {
    if (err) {
      return callback(err);
    }
    client.del(productId);
    callback(err, rowsChanged);
  });
};

module.exports = {
  getAllReviews,
  addReview,
};
