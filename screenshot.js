#!/usr/bin/env node

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const outputPath = args[0] || path.join(process.cwd(), `screenshot-${Date.now()}.png`);
const fullPage = args.includes('--full-page');

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222'
  });

  const pages = await browser.pages();
  const page = pages[pages.length - 1];

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('Taking screenshot...');
  await page.screenshot({
    path: outputPath,
    fullPage
  });

  console.log(`Screenshot saved to: ${outputPath}`);

  await browser.disconnect();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
