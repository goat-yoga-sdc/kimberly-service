import { sleep, check } from "k6";
import http from "k6/http";

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
  ],
};

export default function main() {
  let res;

  res = http.get("http://localhost:3050/products/suggested");

  // Automatically added sleep
  sleep(1);

  const checkRes = check(res, {
    'status is 200': r => r.status === 200
  });
}