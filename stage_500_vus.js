import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 500 },
  ],
};

export default function () {
  let res = http.post('https://da3em.net/api/v1/customer/actions/get_top_shops_and_favorite_shops-action?userId=35');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
