const { Pool } = require('pg');
const config = require('./connectConfig.js');

const pool = new Pool(config);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const poolQuery = (query, values, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err);
    }
    client.query(query, values, (err, res) => {
      if (err) {
        callback(err);
      }
      done();
      callback(null, res);
    });
  });
};

const addReview = (data, callback) => {
  const {
    product_id, username, is_verified, title, review_text, score, review_date, found_helpful
  } = data;
  const query = 'INSERT INTO reviews (product_id, username, is_verified, title, review_text, score, review_date, found_helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
  const values = [product_id, username, is_verified, title, review_text, score, review_date, found_helpful];
  poolQuery(query, values, (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rows[0].id);
  });
};

const getReview = (reviewId, callback) => {
  const query = 'SELECT * FROM reviews WHERE id = $1';
  poolQuery(query, [reviewId], (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rows[0]);
  });
};

const getAllReviews = (productId, callback) => {
  const query = 'SELECT * FROM reviews WHERE product_id = $1';
  poolQuery(query, [productId], (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rows);
  });
};

const constructUpdateQuery = (cols) => {
  const setClause = cols.map((col, index) => `${col} = $${index + 1}`).join(',');
  return `UPDATE reviews SET ${setClause} WHERE id = $${cols.length + 1}`;
};

const updateReview = (data, reviewId, callback) => {
  const query = constructUpdateQuery(Object.keys(data));
  poolQuery(query, [...Object.values(data), reviewId], (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rowCount);
  });
};

const deleteReview = (reviewId, callback) => {
  const query = 'DELETE FROM reviews WHERE id = $1 RETURNING id';
  poolQuery(query, [reviewId], (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rows[0].id);
  });
};

const incrementFoundHelpful = (reviewId, callback) => {
  const query = 'UPDATE reviews SET found_helpful = found_helpful + 1 WHERE id = $1';
  poolQuery(query, [reviewId], (err, res) => {
    if (err) {
      callback(err);
    }
    callback(null, res.rowCount);
  });
};

module.exports = {
  addReview,
  getReview,
  getAllReviews,
  updateReview,
  deleteReview,
  incrementFoundHelpful,
};
