const { Pool } = require('pg');
const config = require('./connectConfig.js');

const pool = new Pool(config);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const addReview = async (data) => {
  try {
    const {
      reviewId, productId, productName, userId, userName, isVerified, title, text, score, date, foundHelpful,
    } = data;
    const query = 'INSERT INTO reviews (review_id, product_id, product_name, user_id, user_name, is_verified, title, text, score, date, found_helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const values = [reviewId, productId, productName, userId, userName, isVerified, title, text, score, date, foundHelpful];
    const res = await client.query(query, values);
    return res.rowCount;
  } catch (err) {
    throw err;
  }
};

const getReview = async (reviewId) => {
  try {
    const query = 'SELECT * FROM reviews WHERE id = $1';
    const res = await client.query(query, [reviewId]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

const getAllReviews = (productId, callback) => {
  const query = 'SELECT * FROM reviews WHERE product_id = $1';
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(query, [productId], (err, res) => {
      done();
      callback(err, res);
    });
  });
};

const getColumns = (data) => {
  const reviewColumns = {
    productId: 'product_id',
    productName: 'product_name',
    userId: 'user_id',
    userName: 'user_name',
    isVerified: 'is_verified',
    title: 'title',
    text: 'text',
    score: 'score',
    date: 'date',
    foundHelpful: 'found_helpful',
  };

  const subset = {};
  Object.keys(data).forEach((key) => {
    if (reviewColumns.hasOwnProperty(key)) {
      subset[reviewColumns[key]] = data[key];
    }
  });

  return subset;
};

const constructUpdateQuery = (columns) => {
  const cols = Object.keys(columns);
  const setClause = cols.map((col, index) => `${col} = $${index + 1}`).join(',');
  return `UPDATE reviews SET ${setClause} WHERE id = $${cols.length + 1}`;
};

const updateReview = async (data, reviewId) => {
  try {
    const columns = getColumns(data);
    const query = constructUpdateQuery(columns);
    const res = await client.query(query, [...Object.values(columns), reviewId]);
    return res.rowCount;
  } catch (err) {
    throw err;
  }
};

const deleteReview = async (reviewId) => {
  try {
    const query = 'DELETE FROM reviews WHERE id = $1';
    const res = await client.query(query, [reviewId]);
    return res.rowCount;
  } catch (err) {
    throw err;
  }
};

const incrementFoundHelpful = async (reviewId) => {
  try {
    const query = 'UPDATE reviews SET found_helpful = found_helpful + 1 WHERE id = $1';
    const res = await client.query(query, [reviewId]);
    return res.rowCount;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addReview,
  getReview,
  getAllReviews,
  updateReview,
  deleteReview,
  incrementFoundHelpful,
};
