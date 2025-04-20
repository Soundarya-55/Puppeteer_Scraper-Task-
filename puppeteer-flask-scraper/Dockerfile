# ---------- Scraper Stage ----------
    FROM node:18-slim AS scraper

    # Install Chromium and dependencies
    RUN apt-get update && apt-get install -y \
        chromium \
        fonts-liberation \
        && apt-get clean && rm -rf /var/lib/apt/lists/*
    
    ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
    
    WORKDIR /app
    COPY node_scraper/package.json ./
    RUN npm install
    COPY node_scraper/scrape.js ./
    
    # Default scrape URL (can be overridden at build/run time)
    ARG SCRAPE_URL=https://example.com
    ENV SCRAPE_URL=$SCRAPE_URL

    RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

    RUN which chromium || which chromium-browser || echo "Chromium not found"

    ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
 
    RUN node scrape.js
    
    # ---------- Server Stage ----------
    FROM python:3.10-slim
    
    WORKDIR /app
    
    # Copy Flask server and scraped data
    COPY python_server/requirements.txt ./
    RUN pip install --no-cache-dir -r requirements.txt
    
    COPY python_server/server.py ./
    COPY --from=scraper /app/scraped_data.json ./
    
    EXPOSE 5000
    
    CMD ["python", "server.py"]
    