const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Cors = require('cors');
const controller = require('./controller');

const app = express();

app.use(Cors());
app.use('/static/:productid', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/reviews/all/:productId', controller.getAllReviews);
app.get('/reviews/:reviewId', controller.getReview);
app.post('/reviews', controller.addReview);
app.patch('/reviews/:reviewId', controller.updateReview);
app.delete('/reviews/:reviewId', controller.deleteReview);
app.post('/reviews/helpful/:reviewId', controller.incrementFoundHelpful);

module.exports = app;
