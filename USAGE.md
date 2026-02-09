# Quick Start Guide

## Setup

1. Install dependencies:
   ```bash
   cd ~/code/src/manzoid/browser-tools
   npm install
   ```

2. Make scripts executable (already done):
   ```bash
   chmod +x *.js
   ```

## Basic Workflow

### 1. Start the browser
```bash
cd ~/code/src/manzoid/browser-tools
./start.js
```

This launches Chrome with remote debugging on port 9222. Leave this running.

### 2. Navigate to a page
In a new terminal:
```bash
./navigate.js https://example.com
```

### 3. Interact with the page
Execute JavaScript in the page context:
```bash
# Get the page title
./evaluate.js "document.title"

# Count all links
./evaluate.js "document.querySelectorAll('a').length"

# Get all heading texts
./evaluate.js "Array.from(document.querySelectorAll('h1,h2,h3')).map(h => h.textContent)"

# Run complex script from file
./evaluate.js --file myscript.js
```

### 4. Take screenshots
```bash
./screenshot.js output.png
./screenshot.js fullpage.png --full-page
```

## Using with Claude Code

Add this directory to your Claude Code session:
```bash
/add-dir ~/code/src/manzoid/browser-tools
```

Then Claude can directly call these tools via Bash, and write custom JavaScript to manipulate pages instead of learning complex MCP APIs.

## Example: Scraping with Authentication

```bash
# Copy your Chrome profile to preserve cookies/auth
./start.js myprofile --copy-profile

# Navigate to authenticated site
./navigate.js https://internal-site.com

# Extract data with JavaScript
./evaluate.js "Array.from(document.querySelectorAll('.data-item')).map(el => ({
  title: el.querySelector('.title')?.textContent,
  value: el.querySelector('.value')?.textContent
}))"
```

## Advantages

- **No MCP bloat**: ~225 tokens of docs vs 13k+
- **Use what you know**: Write JavaScript, not Playwright API
- **Composable**: Pipe outputs, save to files
- **Extensible**: Just add more .js scripts
