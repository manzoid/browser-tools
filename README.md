# Browser Tools

Minimal Puppeteer-based browser automation toolkit for AI coding agents. Inspired by [Mario Zechner's approach](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/).

## Philosophy

Instead of heavy MCP servers, these are simple bash-callable scripts that leverage the agent's existing JavaScript knowledge. Total documentation: ~225 tokens vs 13k+ for MCP equivalents.

## Tools

### start.js [profile] [--copy-profile]

Launches Chrome with remote debugging on port 9222.

```bash
./start.js                    # Use default profile
./start.js work              # Use named profile
./start.js work --copy-profile  # Copy Chrome profile for authenticated sessions
```

### navigate.js <url> [--new-tab]

Navigate to a URL.

```bash
./navigate.js https://example.com
./navigate.js https://example.com --new-tab
```

### evaluate.js "<code>" | --file <path>

Execute JavaScript in the current page context.

```bash
./evaluate.js "document.title"
./evaluate.js "document.querySelectorAll('a').length"
./evaluate.js --file script.js
```

### screenshot.js [output-path] [--full-page]

Capture screenshot of current page.

```bash
./screenshot.js
./screenshot.js output.png
./screenshot.js output.png --full-page
```

## Usage with Claude Code

Add this directory to your session:

```bash
/add-dir ~/code/src/manzoid/browser-tools
```

Then Claude can use these tools by calling the scripts directly via Bash.

## Why This Over MCP?

- **Token efficient**: Minimal docs, agent already knows JavaScript
- **Composable**: Output goes to disk, can be chained
- **Extensible**: Add new tools easily without versioning hell
- **Simple**: Just Node.js scripts, no protocol layer
