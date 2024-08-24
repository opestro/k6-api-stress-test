import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { check } from 'k6';

let myTrend = new Trend('vu_peak_times');

export const options = {
    stages: [
        { duration: '5s', target: 20 },  // Ramp up to 20 VUs over 5 seconds
        { duration: '5s', target: 100 }, // Peak to 100 VUs for 5 seconds
        { duration: '5s', target: 500 }, // Peak to 500 VUs for 5 seconds
        { duration: '5s', target: 1000 }, // Peak to 1000 VUs for 5 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],  // 95% of requests should complete below 2s
        'vu_peak_times': ['p(95)<2000'],
    },
};

export default function () {
    const res = http.get('https://da3em.net/api/v1/customer/actions/get_top_shops_and_favorite_shops-action?userId=35');
    
    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // Log the number of VUs at each peak
    console.log(`Current VUs: ${__VU}, Iteration: ${__ITER}`);
    myTrend.add(__VU);

    sleep(1);  // Sleep for 1 second between each request
}
