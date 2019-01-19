import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 240,
  duration: '300s',
  rps: 2000,
};

const getProductId = (min, max) => Math.floor(min + Math.random() * (max - min));
const topProductFraction = 0.7;
const productId = (Math.random() <= topProductFraction)
  ? getProductId(1, 1000)
  : getProductId(1000, 10000000);

export default function () {
  const res = http.get(`http://localhost:3001/reviews/all/${productId}`);
  check(res, {
    'status was 200': r => r.status === 200,
  });
}
