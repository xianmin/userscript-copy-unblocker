# Copy Unblocker

Copy Unblocker is a userscript that automatically removes copy restrictions from web pages, allowing you to freely copy text and content.

## How to Use

1. Install a browser extension:
   - Chrome: [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
2. Install Copy Unblocker script: [Click to Install](https://raw.githubusercontent.com/xianmin/userscript-copy-unblocker/refs/heads/master/copy-unblocker.user.js)
3. Visit supported websites, and the script will automatically remove copy restrictions

## Features

- Automatically removes copy restrictions from web pages
- Enables text selection and right-click context menu
- Removes overlay elements that block content
- Supports keyboard shortcuts (Ctrl+C/Cmd+C)

## Technical Implementation

The script works by:

1. Overriding user-select CSS properties
2. Removing event listeners that block copying
3. Eliminating overlay elements
4. Restoring native browser copy functionality

## Adding Support for New Websites

If you want the script to support new websites, you can:

1. Submit an [Issue](https://github.com/xianmin/userscript-copy-unblocker/issues) on GitHub
2. Or modify the script directly by adding new `@match` rules at the beginning of the code

## Privacy & Security

- Runs entirely client-side
- No data collection
- Open source and transparent

## License

GPLv3 License
