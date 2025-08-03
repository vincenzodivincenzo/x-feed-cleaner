# X Feed Cleaner v1.0

A clean, distraction-free Chrome extension for X/Twitter that removes unwanted elements without collecting any data.

**Version**: 1.0.0

## Features

### Content Filtering
- **Hide promoted tweets** - Removes sponsored content from your feed
- **Auto-switch to Following tab** - Automatically switches from "For you" to "Following" tab
- **Hide engagement metrics** - Removes view counts and other engagement numbers

### Interface Cleanup
- **Hide right sidebar** - Removes the entire right sidebar for a cleaner layout
- **Hide "Who to follow" suggestions** - Removes user suggestions from sidebar
- **Hide trending topics** - Removes trending section from sidebar
- **Hide Grok navigation** - Removes Grok AI navigation elements
- **Hide Subscriptions** - Removes premium subscription prompts

### Left Navigation Control
- **Hide Bookmarks tab** - Removes bookmarks navigation item
- **Hide Jobs tab** - Removes jobs navigation item
- **Hide Communities tab** - Removes communities navigation item
- **Hide Premium tab** - Removes premium navigation item
- **Hide Verified Orgs tab** - Removes verified organizations navigation

## Installation

### From Source
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/x-feed-cleaner.git
   cd x-feed-cleaner
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the `x-feed-cleaner` folder

5. The extension will appear in your Chrome toolbar

### Usage
1. Navigate to [X.com](https://x.com) or [Twitter.com](https://twitter.com)
2. Click the X Feed Cleaner icon in your toolbar
3. Configure your preferences using the toggles
4. Settings are saved automatically and persist across browser sessions

## 🔧 Configuration

All settings are toggled on/off through the popup interface:

- **Extension Enabled** - Master toggle to enable/disable all features
- **Turn on all features** - Quick button to enable all cleaning features
- **Turn off all features** - Quick button to disable all cleaning features

## 🛠Technical Details

- **Manifest Version**: 3
- **Permissions**: `storage` (for saving preferences)
- **Content Scripts**: Injected on X.com and Twitter.com
- **Background Script**: Manages extension state and icon updates
- **Popup Interface**: Clean, minimal settings panel

## Privacy

- **No data collection** - The extension doesn't collect, store, or transmit any user data
- **Local storage only** - All settings are stored locally in your browser
- **No external requests** - The extension doesn't make any network requests

## Troubleshooting

### Common Issues

1. **Extension not working**
   - Ensure the extension is enabled in `chrome://extensions/`
   - Refresh the X.com page
   - Check that no other extensions are conflicting

2. **Settings not saving**
   - Check browser storage permissions
   - Try disabling and re-enabling the extension

3. **Elements still visible**
   - Some elements may take time to load
   - Try refreshing the page
   - Check if the specific feature is enabled in the popup

### Conflicts with Other Extensions

If you have other X/Twitter-related extensions installed, they may conflict. Try:
- Disabling other extensions temporarily
- Reloading the X Feed Cleaner extension
- Refreshing the X.com page

## Development

### Project Structure
```
x-feed-cleaner/
├── manifest.json          # Extension manifest
├── content.js            # Main content script
├── background.js         # Background service worker
├── popup.html           # Settings popup
├── popup.css            # Popup styling
├── popup.js             # Popup functionality
├── icons/               # Extension icons
└── README.md            # This file
```

### Building
No build process required - this is a pure JavaScript extension.

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with modern Chrome Extension APIs
- Inspired by the need for a cleaner X/Twitter experience
- No external dependencies

---

**Note**: This extension is not affiliated with X Corp. or Twitter Inc.
