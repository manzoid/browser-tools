# Browser Tools

Minimal Puppeteer-based browser automation toolkit for AI coding agents. Inspired by [Mario Zechner's approach](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/).

## Installation

```bash
# Install globally
npm install -g @manzoid2/browser-tools

# Or use directly with npx
npx @manzoid2/browser-tools <command>
```

## Quick Start

```bash
# Start browser
browser-start

# Navigate to a page
browser-navigate https://example.com

# Execute JavaScript
browser-evaluate "document.title"

# Take screenshot
browser-screenshot test.png
```

## Philosophy

Instead of heavy MCP servers, these are simple bash-callable scripts that leverage the agent's existing JavaScript knowledge. Total documentation: ~225 tokens vs 13k+ for MCP equivalents.

## Tools

### browser-start [profile] [--copy-profile]

Launches Chrome with remote debugging on port 9222.

```bash
browser-start                    # Use default profile
browser-start work              # Use named profile
browser-start work --copy-profile  # Copy Chrome profile for authenticated sessions
```

### browser-navigate <url> [--new-tab]

Navigate to a URL.

```bash
browser-navigate https://example.com
browser-navigate https://example.com --new-tab
```

### browser-evaluate "<code>" | --file <path>

Execute JavaScript in the current page context.

```bash
browser-evaluate "document.title"
browser-evaluate "document.querySelectorAll('a').length"
browser-evaluate --file script.js
```

### browser-screenshot [output-path] [--full-page]

Capture screenshot of current page.

```bash
browser-screenshot
browser-screenshot output.png
browser-screenshot output.png --full-page
```

## Usage with Claude Code

Once installed globally, Claude can use these tools directly via Bash without needing to add any directories.

## Why This Over MCP?

- **Token efficient**: Minimal docs, agent already knows JavaScript
- **Composable**: Output goes to disk, can be chained
- **Extensible**: Add new tools easily without versioning hell
- **Simple**: Just Node.js scripts, no protocol layer
