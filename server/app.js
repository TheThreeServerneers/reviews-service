const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Cors = require('cors');
const db = require('../database/pg');

const app = express();

app.use(Cors());
app.use('/:productid', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/reviews/all/:productId', async (req, res) => {
  try {
    const reviews = await db.getAllReviews(req.params.productId);
    return res.send(reviews);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

app.post('/reviews/helpful/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updatedReviewCount = await db.incrementFoundHelpful(reviewId);
    if (updatedReviewCount === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = app;
