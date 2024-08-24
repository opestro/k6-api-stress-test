// k6_test.js
import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

const maxResponseTime = new Trend('max_response_time');
const successfulRequests = new Trend('successful_requests');
const errorRequests = new Trend('error_requests');

export const options = {
    stages: [
        { duration: '5s', target: 20 },
        { duration: '5s', target: 100 },
        { duration: '5s', target: 500 },
        { duration: '5s', target: 1000 },
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
    } else {
        errorRequests.add(1);
    }

    sleep(1);
}

export function handleSummary(data) {
    const summaryData = [];
    summaryData.push({
        stage: '20 VUs',
        maxTime: data.metrics.http_req_duration.max,
        success: data.metrics.successful_requests.count,
        errors: data.metrics.error_requests.count,
    });
    return {
        'summary.json': JSON.stringify(data),
        'summary_data.json': JSON.stringify(summaryData),
    };
}
