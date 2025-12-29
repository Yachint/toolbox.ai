# toolbox.ai

A collection of simple, fast, and privacy-friendly mini tools that run entirely in your browser.

## Features

- **No dependencies** — Pure HTML, CSS, and JavaScript
- **Privacy-first** — All tools run locally in your browser
- **Dark/Light mode** — With auto-detection based on system preference
- **Mobile responsive** — Works on all devices
- **Easy to extend** — Just copy and paste to add new tools

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser, or
3. Deploy to GitHub Pages

## Adding a New Tool

1. Create your tool as an HTML file (e.g., `my-tool.html`)
2. Add it to the tools list in `index.html`:

```html
<a href="my-tool.html" class="tool-item">
    <div class="tool-icon">🔧</div>
    <div class="tool-info">
        <div class="tool-name">My Tool Name</div>
        <div class="tool-desc">Brief description of what it does</div>
    </div>
    <span class="tool-arrow">→</span>
</a>
```

## Deployment

This project is designed for GitHub Pages. Simply enable Pages in your repository settings and point it to the main branch.

## License

MIT
