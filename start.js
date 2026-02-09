#!/usr/bin/env node

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const profileName = args[0] || 'default';
const copyProfile = args.includes('--copy-profile');

// Find Chrome executable
function findChrome() {
  const paths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ];

  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }

  throw new Error('Chrome/Chromium not found');
}

async function main() {
  const userDataDir = path.join(process.env.HOME, '.browser-tools', 'profiles', profileName);

  // Create profile directory if it doesn't exist
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  // Copy profile if requested
  if (copyProfile) {
    const defaultProfile = path.join(process.env.HOME, 'Library/Application Support/Google/Chrome/Default');
    if (fs.existsSync(defaultProfile)) {
      console.log(`Copying profile from ${defaultProfile}...`);
      execSync(`rsync -av --exclude="Service Worker" --exclude="Code Cache" "${defaultProfile}/" "${userDataDir}/"`);
    }
  }

  const chromePath = findChrome();

  console.log(`Starting Chrome with profile: ${profileName}`);
  console.log(`User data dir: ${userDataDir}`);
  console.log(`Remote debugging on port 9222`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: false,
    userDataDir,
    args: [
      '--remote-debugging-port=9222',
      '--no-first-run',
      '--no-default-browser-check',
    ]
  });

  console.log('Browser started successfully');
  console.log('WebSocket endpoint:', browser.wsEndpoint());

  // Keep process alive
  await new Promise(() => {});
}

main().catch(console.error);
