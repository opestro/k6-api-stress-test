# K6 Stress Test Suite 🚀

This repository contains a K6 stress test suite designed to evaluate the performance of your API under various load conditions. The suite includes stress tests for five stages with different Virtual User (VUs) counts: 20 VUs, 100 VUs, 500 VUs, 1000 VUs, and 5000 VUs. Additionally, the repository includes a `stats-generator.py` script that generates simplified reports from the test results.

## Table of Contents
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [Generating Reports](#generating-reports)
- [Requirements](#requirements)
- [Contact](#contact)

## Getting Started

To get started with the K6 stress tests, clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/k6-stress-tests.git
cd k6-stress-tests

## Running the Tests

Each test stage is defined with a different number of VUs. To run a specific test stage, use the following command:

```bash
k6 run stage_X_vus_test.js
```

Replace `X` with the number of VUs you want to test (e.g., 20, 100, 500, 1000, or 5000).

## Generating Reports

After running the tests, you can generate a report with simplified data using the `stats-generator.py` script. This script processes the JSON output files from each stage and compiles the results into a Word document.

To generate the report, run:

```bash
python3 stats-generator.py
```

The script will create a Word document named `da3em_Stress_Test_Report_Combined.docx` in the root directory of the project, containing the essential metrics for each stage.

## Requirements

- [K6](https://k6.io/) - Load testing tool
- [Python 3.x](https://www.python.org/downloads/)
- [python-docx](https://pypi.org/project/python-docx/) - Python library for creating Word documents

You can install the necessary Python libraries using pip:

```bash
pip install python-docx
```

## Contact

If you have any questions, suggestions, or collaboration ideas, feel free to reach out:

📧 **Email**: [mehdi.h@nestgit.com](mailto:mehdi.h@nestgit.com)

Happy testing! 🎉
```
