import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

const maxResponseTime = new Trend('max_response_time');
const successfulRequests = new Trend('successful_requests');

export const options = {
    stages: [
        { duration: '5s', target: 20 },   // Ramp up to 20 VUs in 5 seconds
        { duration: '5s', target: 100 },  // Ramp up to 100 VUs in 5 seconds
        { duration: '5s', target: 500 },  // Ramp up to 500 VUs in 5 seconds
        { duration: '5s', target: 1000 }, // Ramp up to 1000 VUs in 5 seconds
    ],
};

export default function () {
    const url = 'https://da3em.net/api/v1/customer/actions/get_top_shops_and_favorite_shops-action?userId=35';
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, null, params);

    const isStatus200 = check(response, {
        'status is 200': (r) => r.status === 200,
    });

    maxResponseTime.add(response.timings.duration);
    
    if (isStatus200) {
        successfulRequests.add(1);
    }

    sleep(1); // Ensure requests are spread out
}

export function handleSummary(data) {
    return {
        'summary.json': JSON.stringify(data), // Save results to a JSON file
    };
}
