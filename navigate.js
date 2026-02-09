#!/usr/bin/env node

const puppeteer = require('puppeteer-core');

const args = process.argv.slice(2);
const url = args[0];
const newTab = args.includes('--new-tab');

if (!url) {
  console.error('Usage: navigate.js <url> [--new-tab]');
  process.exit(1);
}

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222'
  });

  let page;

  if (newTab) {
    page = await browser.newPage();
    console.log('Created new tab');
  } else {
    const pages = await browser.pages();
    page = pages[pages.length - 1];
    console.log('Using existing tab');
  }

  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log('Navigation complete');

  await browser.disconnect();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
