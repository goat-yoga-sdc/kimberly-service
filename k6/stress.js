import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  rps: 10000,
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 400 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 600 },
    { duration: '30s', target: 700 },
    { duration: '30s', target: 800 },
    { duration: '30s', target: 900 },
    { duration: '30s', target: 1000 },
    { duration: '100s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3050'; // make sure this is not production

  const shadesAmount = Math.floor(Math.random() * (9 - 1) + 1);

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/products/suggested`,
      null,
      { tags: { name: 'SuggestedItems' } },
    ],
    [
      'GET',
      `${BASE_URL}/products/quickview`,
      null,
      { tags: { name: 'QuickView' } },
    ],
    [
      'GET',
      `${BASE_URL}/products/shades/${shadesAmount}`,
      null,
      { tags: { name: 'Shades' } },
    ],
  ]);

  sleep(1);
}