// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // Node event listeners (optional)
//     },
//     baseUrl: 'https://example.com', // optional
//   },
//   viewportWidth: 1800,
//   viewportHeight: 720,
// });

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://portal-nuxt3.qa.wholesale-express.com/',
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    env: {
      email: 'qatradex@gmail.com', // Default username
      password: '1234567', // Avoid committing sensitive data!
      apiUrl: 'https://portal-nuxt3.qa.wholesale-express.com/', // Example API base,
      pin:"1234"
      // Add other env-specific things
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      json: true,
      reportDir: 'cypress/reports/mochawesome' // ✅ Add this
    }
    
  },
  viewportWidth: 1800,
  viewportHeight: 720,
});
