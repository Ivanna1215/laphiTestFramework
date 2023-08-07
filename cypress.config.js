const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.laphil.com/events/performances",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    requestTimeout: 60000,
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
  },
});
