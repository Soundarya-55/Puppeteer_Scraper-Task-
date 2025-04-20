# Puppeteer_Scraper-Task

This project is a simple full-stack web scraper using Node.js + Puppeteer for scraping and Python Flask to serve the scraped content via an API.

📁 Project Structur
```
puppeteer-flask-scraper/
│
├── node_scraper/
│   ├── scrape.js             # Scrapes data from the target website using Puppeteer
│   ├── package.json          # Node.js dependencies
│
├── python_server/
│   ├── server.py             # Flask API to serve scraped data
│   ├── requirements.txt      # Python dependencies
│
├── Dockerfile                # Multi-stage Dockerfile to build and run the app
