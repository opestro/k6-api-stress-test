import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 5000 },
  ],
};

export default function () {
  let res = http.post('https://yourdomainname.com/api');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
