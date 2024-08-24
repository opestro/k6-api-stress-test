import { sleep } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { writeFile } from 'k6/experimental/fs';

export const options = {
  stages: [
    { duration: '1s', target: 20 },   // Ramp-up to 20 VUs
    { duration: '5s', target: 100 },  // Peak at 100 VUs for 5s
    { duration: '5s', target: 500 },  // Ramp-up to 500 VUs for 5s
    { duration: '5s', target: 1000 }, // Final peak at 1000 VUs for 5s
  ],
};

const stageMetrics = new SharedArray('stageMetrics', function () {
  return Array(options.stages.length).fill().map(() => ({
    okRequests: 0,
    maxResponseTime: 0,
  }));
});

function parseDuration(duration) {
  const durationUnits = {
    's': 1000,
    'm': 60000,
    'h': 3600000,
  };

  const unit = duration.slice(-1);
  const time = parseFloat(duration.slice(0, -1));
  
  if (isNaN(time) || !durationUnits[unit]) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  return time * durationUnits[unit];
}

function getCurrentStage(timeElapsed) {
  let accumulator = 0;
  for (let i = 0; i < options.stages.length; i++) {
    accumulator += parseDuration(options.stages[i].duration);
    if (timeElapsed < accumulator) {
      return i;
    }
  }
  return options.stages.length - 1;
}

export default function () {
  const response = http.post('https://da3em.net/api/v1/customer/actions/get_top_shops_and_favorite_shops-action?userId=35');
  
  const currentStage = getCurrentStage(__ITER * 1000 / __VU); // Approximate time elapsed

  if (response.status === 200) {
    stageMetrics[currentStage].okRequests++;
    stageMetrics[currentStage].maxResponseTime = Math.max(stageMetrics[currentStage].maxResponseTime, response.timings.duration);
  }

  sleep(1);
}

export function handleSummary(data) {
  const now = new Date();
  const fileName = `load_test_log_${now.toISOString().replace(/:/g, '-').split('.')[0]}.txt`;

  let logContent = "K6 Load Test Log\n";
  logContent += `Test Start Time: ${now.toISOString()}\n\n`;

  logContent += "Stage Summary:\n";
  options.stages.forEach((stage, index) => {
    logContent += `- Stage ${index + 1} (Target: ${stage.target} VUs):\n`;
    logContent += `  200 OK Requests: ${stageMetrics[index].okRequests || 0}\n`;
    logContent += `  Max Response Time: ${stageMetrics[index].maxResponseTime?.toFixed(2) || 0} ms\n`;
  });

  logContent += "\nOverall Test Metrics:\n";
  logContent += `Total Requests: ${data.metrics.http_reqs.count}\n`;
  logContent += `Failed Requests: ${data.metrics.http_req_failed.count}\n`;
  logContent += `Average Response Time: ${data.metrics.http_req_duration.avg.toFixed(2)} ms\n`;
  logContent += `Median Response Time: ${data.metrics.http_req_duration.med.toFixed(2)} ms\n`;
  logContent += `95th Percentile Response Time: ${data.metrics.http_req_duration['p(95)'].toFixed(2)} ms\n`;
  logContent += `Requests per second: ${data.metrics.http_reqs.rate.toFixed(2)}\n`;

  console.log("\nPer-Stage Metrics:");
  stageMetrics.forEach((metrics, index) => {
    console.log(`Stage ${index + 1} (Target: ${options.stages[index].target} VUs):`);
    console.log(`  200 OK Requests: ${metrics.okRequests || 0}`);
    console.log(`  Max Response Time: ${metrics.maxResponseTime?.toFixed(2) || 0} ms`);
  });

  console.log("\nLoad test completed. Log file created:", fileName);

  // Write log file locally
  writeFile(fileName, logContent);

  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}
