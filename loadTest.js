import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100,
  duration: '300s',
  rps: 2000,
};

const getProductId = (min, max) => Math.floor(min + Math.random() * (max - min));
const topProductFraction = 0.7;

export default function () {
  const productId = (Math.random() <= topProductFraction)
    ? getProductId(1, 1000)
    : getProductId(1000, 10000000);
  const res = http.get(`http://localhost:3001/reviews/all/${productId}`);
  check(res, {
    'status was 200 or 201': r => (r.status === 200) || (r.status === 201),
  });
}
