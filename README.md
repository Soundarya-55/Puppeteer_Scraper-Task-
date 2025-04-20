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

```
## Step 1 : Write the Scraper Code (Node.js + Puppeteer)
### The package.json allows:
1. Install Puppeteer (and other dependencies) using npm install.
2. Run the scraper script with npm start, which is easier than typing node scrape.js each time.
3. Maintain and manage dependencies (like Puppeteer) in a structured way.

## The scrape.js allows:
**1. Automates Data Collection:** Puppeteer interacts with websites in a browser-like environment, simulating a real user browsing. It can extract data from websites that may require JavaScript to render the content.
**2. Flexibility:** By passing a URL as an environment variable or command-line argument, you can scrape any site without modifying the code each time.
**3. Efficiency:** This script runs in a headless browser, meaning it doesn't open a visible window and runs faster than using a full browser, which is ideal for automated scraping.
**4. Data Persistence:** After scraping, the data is saved as a JSON file, which can be accessed later or served by another service (like the Flask app you’re setting up).

## Step 2 : Write the Flask Hosting Code
### The server.py allows:
1. Reads the scraped_data.json file (produced by scrape.js)
2. Exposes an API endpoint (usually /) to return that data as a JSON response
3. Can be run inside a Docker container and exposed on port 5000
### requirements.txt :
It's a simple text file that lists all the Python dependencies your app needs to run.
When Docker or any developer sets up the project, Python reads this file and installs all the required packages.
```
flask==2.3.2
```
### Step 3: Create the Multi-Stage Dockerfile
We use a multi-stage Docker build to keep the final image lightweight and clean.
**Multi-Stage?**
1. Keeps the final image small and clean (no Node.js in the final image)
2. Allows you to scrape once during build and serve using Flask in runtime
3. Better security and separation of concerns

### Step 4: Build the Docker Image
```
docker build --build-arg SCRAPE_URL=https://example.com -t scraper-flask-app .
```
### Step 5: Run the Container
```
docker run -p 5000:5000 scraper-flask-app
```
![Screenshot 2025-04-20 103848](https://github.com/user-attachments/assets/e1ddfdd7-70c9-4ba4-a35d-43a6aa70f89c)

### Step 6: Access Output
```
http://localhost:5000
```
```json
{
  "heading": "Example Domain",
  "title": "Example Domain"
}
```
![Screenshot 2025-04-20 103809](https://github.com/user-attachments/assets/8477313a-26d8-4146-a7a1-bc2d7bb2e79b)

