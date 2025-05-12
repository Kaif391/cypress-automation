// const fs = require("fs");
// const cheerio = require("cheerio");
// const path = require("path");

// const htmlPath = path.resolve(__dirname, "cypress/reports/mochawesome/index.html");
// const html = fs.readFileSync(htmlPath, "utf8");
// const $ = cheerio.load(html);
// // console.log($);
// console.log($("body").html().slice(0, 10000,"html"));
// const element = $('div#reports');
// // console.log(element,"eleem");

// // // Match elements with "passes" and "failures" in class name
// // const passedEl = $('[class*="passes"]');
// // const failedEl = $('[class*="failures"]');

// // // Debug print: show what these elements look like
// // console.log("✅ Raw passed element:", passedEl.html());
// // console.log("❌ Raw failed element:", failedEl.html());

// // // Extract numeric values using regex
// // const passed = passedEl.text().match(/\d+/)?.[0] || '0';
// // const failed = failedEl.text().match(/\d+/)?.[0] || '0';

// // console.log(`📊 Extracted Summary → ✅ Passed: ${passed}, ❌ Failed: ${failed}`);

const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = `file:${path.resolve(__dirname, "cypress/reports/mochawesome/index.html")}`;
  await page.goto(filePath, { waitUntil: "networkidle0" });

  const passed = await page.$eval(
    '.quick-summary--passes---3IjYH button',
    el => el.textContent.trim().replace(/\D/g, '')
  );

  // Extract fail count
  const failed = await page.$eval(
    '.quick-summary--failures---14s29 button',
    el => el.textContent.trim().replace(/\D/g, '')
  );
  console.log("Extracted Summary:\n", passed, failed);

  await browser.close();
})();
