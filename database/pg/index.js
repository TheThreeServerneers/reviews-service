const { Client } = require('pg');
const config = require('./connectConfig.js');

const client = new Client(config);
client.connect();

const addReview = async (data) => {
  try {
    const {
      reviewId, productId, userId, title, text, score, date, foundHelpful,
    } = data;
    const query = 'INSERT INTO reviews (review_id, product_id, user_id, title, text, score, date, found_helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [reviewId, productId, userId, title, text, score, date, foundHelpful];
    const res = await client.query(query, values);
    return res.rowCount;
  } catch (err) {
    throw err;
  }
};

const getReview = async (reviewId) => {
  try {
    const query = `
      SELECT 
        r.product_id,
        p.name as product_name,
        u.name as username,
        u.is_verified, 
        r.text as review_text,
        r.score,
        r.found_helpful,
        r.title,
        r.date as review_date
      FROM reviews as r
      INNER JOIN products as p 
        ON r.product_id = p.id
      INNER JOIN users as u
        ON r.user_id = u.id
      WHERE r.review_id = $1
    `;
    const res = await client.query(query, [reviewId]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

const getAllReviews = async (productId) => {
  try {
    const query = `
      SELECT 
        r.id,
        r.product_id,
        p.name as product_name,
        u.name as username,
        u.is_verified, 
        r.text as review_text,
        r.score,
        r.found_helpful,
        r.title,
        r.date as review_date
      FROM reviews as r
      INNER JOIN products as p 
        ON r.product_id = p.id
      INNER JOIN users as u
        ON r.user_id = u.id
      WHERE r.product_id = $1
    `;
    const res = await client.query(query, [productId]);
    return res.rows;
  } catch (err) {
    throw err;
  }
};

const getColumns = (data) => {
  const reviewColumns = {
    productId: 'product_id',
    userId: 'user_id',
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
  return `UPDATE reviews SET ${setClause} WHERE review_id = $${cols.length + 1}`;
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
    const query = 'DELETE FROM reviews WHERE review_id = $1';
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
};
