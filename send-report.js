const { exec } = require("child_process");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");
const puppeteer = require("puppeteer");

console.log("🚀 Running Cypress tests...");

exec("npm run test", (testErr, testStdout, testStderr) => {
  if (testErr) {
    console.warn("⚠️ Cypress tests failed, but continuing...");
    console.warn(testStderr);
  } else {
    console.log("✅ Cypress tests completed.");
  }

  console.log("🌐 Deploying report to Netlify...");
  exec(`netlify deploy --auth=${process.env.NETLIFY_PERSONAL_ACCESS_TOKEN} --site=${process.env.NETLIFY_SITE_ID} --prod --dir=cypress/reports/mochawesome --json`, (deployErr, deployStdout, deployStderr) => {
    if (deployErr) {
      console.error("❌ Deployment failed:\n", deployStderr);
      return;
    }

    let reportUrl = "";
    try {
      const output = JSON.parse(deployStdout);
      reportUrl = output.url;
      console.log("✅ Report deployed at:", reportUrl);
    } catch (parseErr) {
      console.error("❌ Failed to parse deploy output:", parseErr);
      return;
    }

    // Async function to extract the pass/fail count and send the email
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
    
      const filePath = `file:${path.resolve(__dirname, "cypress/reports/mochawesome/index.html")}`;
      await page.goto(filePath, { waitUntil: "networkidle0" });
    
      // Extract pass count
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
      const totalTests = parseInt(passed) + parseInt(failed);


      // 📧 Send email with test summary
      console.log("📧 Sending email with test summary...");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mohammed.kaif@iesoftek.com",
          pass: process.env.GMAIL_APP_PASSWORD, // 🔐 Consider using environment variables for security!
        },
      });

      const mailOptions = {
        from: '"Cypress Reporter" <mohammed.kaif@iesoftek.com>',
        to: "gr8kaifzaidi78600@gmail.com",
        subject: "📊 Cypress Test Report",
        html: `
          <p>Hi team,</p>
          <p>The Cypress test run has completed.</p>
          <p>Here is quick summary of the test cases</p>
          <ul>
          <li><strong>Total Test Cases:</strong> ${totalTests}</li>
            <li><strong>✅ Passed:</strong> ${passed}</li>
            <li><strong>❌ Failed:</strong> ${failed}</li>
          </ul>
          <p>You can view the full report here:</p>
          <p><a href="${reportUrl}" target="_blank">${reportUrl}</a></p>
          <p>Regards,<br>Cypress Reporter</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error("❌ Error sending email:", error);
        }
        console.log("✅ Email sent:", info.response);
      });

    })();  // End of async function for extracting data and sending email
  });
});
