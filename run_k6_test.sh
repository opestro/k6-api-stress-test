#!/bin/bash

# Run the K6 test and capture output in memory
k6 run --out json=summary.json k6_test.js

# Generate the DOC report using Python, reading from the JSON file
python3 generate_report.py < summary.json > K6_Stress_Test_Report.docx

# Clean up the intermediate JSON file
rm summary.json

# Output the location of the DOC report
echo "Report generated: $(pwd)/K6_Stress_Test_Report.docx"
