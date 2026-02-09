#!/usr/bin/env node

const puppeteer = require('puppeteer-core');
const fs = require('fs');

const args = process.argv.slice(2);
let code = args[0];

if (!code) {
  console.error('Usage: evaluate.js "<javascript-code>" or evaluate.js --file <path>');
  process.exit(1);
}

// Support reading code from file
if (code === '--file') {
  const filePath = args[1];
  if (!filePath) {
    console.error('--file requires a path argument');
    process.exit(1);
  }
  code = fs.readFileSync(filePath, 'utf8');
}

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222'
  });

  const pages = await browser.pages();
  const page = pages[pages.length - 1];

  console.log('Evaluating JavaScript...');
  const result = await page.evaluate(code);

  if (result !== undefined) {
    console.log('Result:', JSON.stringify(result, null, 2));
  }

  await browser.disconnect();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
