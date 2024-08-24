# 📊 K6 Stress Test Report Generator

This repository contains a Python script, `stats-generator.py`, designed to generate a simplified DOCX report from the JSON output files of K6 stress tests. The report consolidates key metrics, making it easy for non-developers to understand the results of your performance testing.

## 🚀 Features
- **Extract Metrics**: Automatically extracts maximum response time, successful requests, and error requests from K6 JSON files.
- **Generate DOCX Report**: Creates a well-formatted Word document summarizing the stress test results for different stages.
- **Customizable**: Easily add or modify the test stages and output JSON files.

## 🛠️ Setup & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/da3em-k6-api-stress-test.git
cd da3em-k6-api-stress-test


### 2. Install Required Dependencies
Make sure you have Python installed. Then, install the necessary packages:
```bash
pip install python-docx
```

### 3. Prepare Your JSON Files
Ensure that your K6 output JSON files are correctly named and placed in the same directory as the script. By default, the script expects the following files:
- `stage_20_vus_output.json`
- `stage_100_vus_output.json`
- `stage_500_vus_output.json`
- `stage_1000_vus_output.json`

### 4. Run the Script
Execute the script to generate the report:
```bash
python3 stats-generator.py
```
This will create a `da3em_Stress_Test_Report_Combined.docx` file in the same directory.

### 5. Customize (Optional)
You can customize the stages or the JSON file names by modifying the `stages` list in the script:
```python
stages = [
    ('20 VUs', 'stage_20_vus_output.json'),
    ('100 VUs', 'stage_100_vus_output.json'),
    ('500 VUs', 'stage_500_vus_output.json'),
    ('1000 VUs', 'stage_1000_vus_output.json')
]
```

## ❓ Questions or Collaborations
Feel free to reach out for any questions or collaboration opportunities at 📧 mehdi.h@nestgit.com. I'm happy to help or work together on exciting projects!

---

Thank you for using this tool! Your feedback is always welcome to improve it further.
```
