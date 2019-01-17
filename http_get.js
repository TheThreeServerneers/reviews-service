import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 240,
  duration: '120s',
};

export default function () {
  const productId = Math.floor(1 + Math.random() * 10000000);
  const res = http.get(`http://localhost:3001/reviews/all/${productId}`);
  check(res, {
    'status was 200': r => r.status === 200,
  });
  sleep(0.2);
}
