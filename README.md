# Copy Unblocker

Copy Unblocker is a powerful userscript that automatically removes copy restrictions from web pages, enabling you to freely copy text and content from websites that typically prevent copying.

## How to Use

1. Install a user script manager like [Tampermonkey - Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Greasemonkey – Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) in your browser
2. Install the Copy Unblocker script: https://github.com/xianmin/userscript-copy-unblocker/raw/refs/heads/master/copy-unblocker.user.js
3. Visit any webpage where you want to enable copying
4. The script will automatically remove copy restrictions on whitelisted sites

## Features

- Automatically removes copy restrictions from web pages
- Enables text selection and right-click context menu
- Removes overlay elements that block content copying
- URL pattern matching for selective activation
- Customizable whitelist for specific websites
- Keyboard shortcut support (Ctrl+C/Cmd+C)
- Easy-to-use settings interface
- Non-intrusive operation

## Advantages

1. **Universal Compatibility**: Works on most websites without breaking their functionality
2. **Smart Detection**: Intelligently identifies and removes various copy-protection mechanisms
3. **Selective Activation**: Only runs on websites you choose through the whitelist
4. **User-Friendly**: Simple interface for managing settings and adding sites
5. **Resource Efficient**: Minimal impact on page loading and browsing performance


### Managing the Whitelist

You can easily manage which websites the script runs on:

1. Click on the Tampermonkey icon in your browser
2. Select "⚙️ Open Settings" from the menu
3. Add or remove website URLs in the pattern list
4. Each URL should be on a new line
5. Save your changes

### Quick Add to Whitelist

To quickly add the current website to your whitelist:

1. Click on the Tampermonkey icon
2. Select "➕ Add Current Site to Whitelist"
3. The current website will be automatically added and activated

### Features in Detail

- **Text Selection**: Enables natural text selection on websites that prevent it
- **Right-Click Menu**: Restores the context menu functionality
- **Copy Protection Removal**: Bypasses JavaScript-based copy prevention
- **Overlay Removal**: Automatically removes elements that block content copying
- **Keyboard Shortcuts**: Ensures Ctrl+C/Cmd+C work normally
- **Style Override**: Removes CSS-based copy restrictions

## Technical Details

The script works by:

1. Overriding user-select CSS properties
2. Removing event listeners that block copying
3. Eliminating overlay elements
4. Restoring native browser copy functionality
5. Managing a URL pattern-based activation system

## Privacy and Security

- No data collection or tracking
- Works entirely client-side
- No external dependencies except GM_config
- Open source and transparent operation

Enjoy unrestricted copying with Copy Unblocker!
