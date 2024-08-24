import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Trend } from 'k6/metrics';

const maxResponseTimeTrend = new Trend('max_response_time');
const max200Requests = 200;  // Max number of 200 OK requests to consider

let stageMaxResponseTimes = [];
let successfulRequests = 0;

export const options = {
    stages: [
        { duration: '5s', target: 20 },  // Ramp up to 20 VUs over 5 seconds
        { duration: '5s', target: 100 }, // Peak to 100 VUs for 5 seconds
        { duration: '5s', target: 500 }, // Peak to 500 VUs for 5 seconds
        { duration: '5s', target: 1000 }, // Peak to 1000 VUs for 5 seconds
    ],
};

export default function () {
    if (successfulRequests < max200Requests) {
        const res = http.post('https://da3em.net/api/v1/customer/actions/get_top_shops_and_favorite_shops-action?userId=35');

        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        if (res.status === 200) {
            successfulRequests++;
            maxResponseTimeTrend.add(res.timings.duration);

            // Store the max response time for the current stage
            stageMaxResponseTimes.push(res.timings.duration);

            // Log the current max response time for this stage
            console.log(`VU: ${__VU}, Iteration: ${__ITER}, Stage Max Response Time: ${Math.max(...stageMaxResponseTimes)}ms`);
        }

        sleep(1);  // Sleep for 1 second between each request
    }
}

export function handleSummary(data) {
    console.log('Max response times for each stage:');
    console.log(`Overall Max Response Time: ${Math.max(...stageMaxResponseTimes)}ms`);
    return {};
}