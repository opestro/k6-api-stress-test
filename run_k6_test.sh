#!/bin/bash

# # Run K6 scripts for each stage
k6 run --out json=stage_20_vus_output.json stage_20_vus.js
k6 run --out json=stage_100_vus_output.json stage_100_vus.js
k6 run --out json=stage_500_vus_output.json stage_500_vus.js
# k6 run --out json=stage_1000_vus_output.json stage_1000_vus.js
#k6 run --out json=stage_5000_vus_output.json stage_5000_vus.js

# Generate the report
# python3 stats-generator.py
