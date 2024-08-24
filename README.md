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
```
## Running the Test

Each test stage is defined with a different number of VUs. To start all the stages and test, use the following command:

```bash
chmod +x run_k6_test.sh
./run_k6_test.sh
```

### Important 🖐:
Inside each stage's `.js` file, you need to replace the placeholder with your API URL and ensure the correct HTTP method (POST or GET) is specified.

## Generating Reports 📊

After running the test, it will generate a report with simplified data using the `stats-generator.py` script. This script processes the JSON output files from each stage and compiles the results into a Word document.
And the script will create a Word document named `da3em_Stress_Test_Report_Combined.docx` in the root directory of the project, containing the essential metrics for each stage.

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
