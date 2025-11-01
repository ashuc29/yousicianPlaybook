const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  use: {
    headless: true,
    browserName: 'chromium',
  },
  testDir: 'tests',
});