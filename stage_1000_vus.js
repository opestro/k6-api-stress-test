import http from 'k6/http';
import { check, sleep  } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export let options = {
  stages: [
    { duration: '5s', target: 1000 },
  ],
};

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
];
export default function () {
  let userAgent = randomItem(userAgents);

  // Replace 'your_bearer_token' with your actual Bearer token
  let headers = {
    'User-Agent': userAgent,
    // Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2VkMmIxYzc5MDI4ZmQyYjc5MTUzOThjMGJiYzc4MjM1NjM0NTcxNjY2MmNhYjljNjg0ZGNkMGZmMDFlNjQyZmE3ODk4NDAwNzhlMGVhMzkiLCJpYXQiOjE3MjM0NjQ4NTYuODkyMjk0LCJuYmYiOjE3MjM0NjQ4NTYuODkyMjk2LCJleHAiOjE3NTUwMDA4NTYuODg1MDk3LCJzdWIiOiIzNiIsInNjb3BlcyI6W119.c-SILjhKi4fgLquWhjTIgMFxle9XZVqx-5D_Tk25eR36d5KkHySsMdllEcSEKIQpIO0A5Fimwkj1F5l2_IAzmxCXJJAk6Ph2sh-n7OAlH4Li5j4jLvst_lyDX8G5HOoUkjDLsCxya2UhMN4IIv6oQunfE9y27UV0q0X04Gx9z65RbuiOJtu7_wFpHfe7t4UMewpsysMgyd_vTX7jcT1UQXIFIKDcsWua47KdNKJgOUl1cdhMwGIp4k8FN-hwV0bgyzE3_koVvsQyVR9uBPm5PioX6UaqAwW31aXh8KDJcnHn0kPtdBNCDXvA0ZqFWhvY0WxdUZvNvrYJRfPAeeTUcMPZzuaOdWS5ozunfe6Ahq8VJx2n6AUmTMRf_7a47HmUCpMXHGMfCq2vja2XrcUsyPlZXP4rdTDpyqbxUCXRsxn_mCKxA2ZDs-BXOOSEN_GWEPEmRGAP6Y4Q3GiI5Bw_BKAj0VRgteSqTOSlge1_43LHL9UBKOXiowPg0kVobgPdfnZEGjLZAEoBKgHPuwDlHxopXPSjcJxp2BRh7YgM4GkVl_KtbMuGCBJr7KfojPZMLwy3ccnSXkbe6fH1Gu1y3aWzgAoyLSMoWi4-0dIkLKsp_ETcoIEHfj5l4_6E9dsxb8cpAn5T9DW82wxxw4G8WJ68VCfogre0YahKFKg3VOQ',
  };

  let res = http.get('https://mr-mehdi.feeef.store/p/hfjg1pg1g43p6zw16fn8yaxh', { headers: headers });
  check(res, { 'status is 200': (r) => r.status === 200 });
  // Add a small sleep to simulate real user behavior
  sleep(1);
}
