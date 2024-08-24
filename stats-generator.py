# generate_report.py
import json
from docx import Document
import sys

# Load K6 output from stdin
data = json.load(sys.stdin)

# Generate summary data
summary_data = [{
    'stage': '20 VUs',  # Adjust this stage info if needed
    'maxTime': data['metrics']['http_req_duration']['max'],
    'success': data['metrics']['successful_requests']['count'],
    'errors': data['metrics']['error_requests']['count'],
}]

# Create a new Word document
doc = Document()
doc.add_heading('K6 Stress Test Report', 0)

# Add a table for the test results
table = doc.add_table(rows=1, cols=4)
hdr_cells = table.rows[0].cells
hdr_cells[0].text = 'Stage'
hdr_cells[1].text = 'Max Response Time (ms)'
hdr_cells[2].text = 'Success Requests'
hdr_cells[3].text = 'Error Requests'

# Populate the table with the data
for result in summary_data:
    row_cells = table.add_row().cells
    row_cells[0].text = result['stage']
    row_cells[1].text = str(result['maxTime'])
    row_cells[2].text = str(result['success'])
    row_cells[3].text = str(result['errors'])

# Save the document to stdout
doc.save(sys.stdout.buffer)
