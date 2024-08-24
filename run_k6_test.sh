#!/bin/bash

# Run the K6 test and capture output in memory
k6 run --out json=summary.json da3em.js

# Generate the DOC report using Python, reading from the JSON file
python3 stats-generator.py < summary.json > da3em_Stress_Test_Report.docx

# Clean up the intermediate JSON file
rm summary.json

# Output the location of the DOC report
echo "Report generated: $(pwd)/da3em_Stress_Test_Report.docx"
