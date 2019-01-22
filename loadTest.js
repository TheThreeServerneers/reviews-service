import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100,
  duration: '300s',
  rps: 2000,
};

const topProductFraction = 0.7;
const postDeleteFraction = 0.001;
const randomInt = (min, max) => Math.floor(min + Math.random() * (max - min));
const getProductId = () => (
  (Math.random() <= topProductFraction)
    ? randomInt(2, 1000)
    : randomInt(1000, 10000000)
);

const getAllReviews = productId => http.get(`http://localhost:3001/reviews/all/${productId}`);

const addReview = () => {
  const headers = { 'Content-Type': 'application/json' };
  const body = {
    review_id: 1,
    product_id: 1,
    product_name: 'Test Product',
    user_id: 1,
    username: 'Stephen',
    is_verified: false,
    title: 'Test Title',
    review_text: 'Test Text',
    score: 5,
    review_date: '2019-01-19',
    found_helpful: 3,
  };
  return http.post(
    'http://localhost:3001/reviews/',
    JSON.stringify(body),
    { headers },
  );
};

const deleteReview = (id) => {
  const headers = { 'Content-Type': 'application/json' };
  const body = { product_id: 1 };
  return http.del(
    `http://localhost:3001/reviews/${id}`,
    JSON.stringify(body),
    { headers },
  );
};

const postAndDeleteReview = () => {
  const res = addReview();
  const { id } = JSON.parse(res.body);
  check(res, {
    'status was 201': r => r.status === 201,
  });
  return deleteReview(id);
};

export default function () {
  const res = (Math.random() < postDeleteFraction)
    ? postAndDeleteReview()
    : getAllReviews(getProductId());
  check(res, {
    'status was 200': r => r.status === 200,
  });
}
