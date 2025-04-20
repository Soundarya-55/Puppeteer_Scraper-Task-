const puppeteer = require("puppeteer");

(async () => {
  const url = process.env.SCRAPE_URL;
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium', // or '/usr/bin/chromium-browser'
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url);

  const title = await page.title();
  const heading = await page.$eval('h1', el => el.textContent);

  const data = { title, heading };
  const fs = require("fs");
  fs.writeFileSync("scraped_data.json", JSON.stringify(data, null, 2));

  await browser.close();
})();
