/* eslint consistent-return: 0 */
const redis = require('redis');
const db = require('../database/pg');

const client = redis.createClient();
client.on('error', err => console.error(err));

const getAllReviews = (req, res) => {
  const { productId } = req.params;
  client.get(productId, (err, reviewsJSON) => {
    if (err || reviewsJSON === null) {
      db.getAllReviews(productId, (err, reviews) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        client.set(productId, JSON.stringify(reviews));
        res.send(reviews);
      });
    } else {
      res.send(JSON.parse(reviewsJSON));
    }
  });
};

const getReview = (req, res) => {
  db.getReview(req.params.reviewId, (err, review) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    return res.send(review);
  });
};

const addReview = (req, res) => {
  const data = req.body;
  const { product_id } = data;
  db.addReview(data, (err, id) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    // console.log('POST', product_id);
    client.del(product_id);
    return res.status(201).send({ id });
  });
};

const updateReview = (req, res) => {
  const { reviewId } = req.params;
  const { product_id, data } = req.body;
  db.updateReview(data, reviewId, (err, numRowsChanged) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (numRowsChanged === 0) {
      return res.sendStatus(404);
    }
    client.del(product_id);
    return res.sendStatus(200);
  });
};

const deleteReview = (req, res) => {
  const { reviewId } = req.params;
  const { product_id } = req.body;
  db.deleteReview(reviewId, (err, id) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    // console.log('DEL', product_id);
    client.del(product_id);
    return res.status(200).send({ id });
  });
};

const incrementFoundHelpful = (req, res) => {
  const { reviewId } = req.params;
  const { product_id } = req.body;
  db.incrementFoundHelpful(reviewId, (err, numRowsChanged) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (numRowsChanged === 0) {
      return res.sendStatus(404);
    }
    client.del(product_id);
    return res.sendStatus(200);
  });
};

module.exports = {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  incrementFoundHelpful,
};
