# X Feed Cleaner Troubleshooting

## Fixed Issues

### ✅ Popup Initialization Error
**Error**: `[Popup] Failed to initialize: TypeError: Cannot read properties of null (reading 'addEventListener')`

**Fixed**: Added null checks for all DOM elements before binding event listeners.

### ✅ Missing Icon Errors  
**Error**: `Uncaught (in promise) Error: Failed to set icon 'icons/icon16-disabled.png': Failed to fetch`

**Fixed**: 
- Simplified to only essential icon files (16px, 48px, 128px)
- Removed disabled icon variants (not needed)
- Added error handling with graceful degradation
- Clean icon management without complexity

### ✅ Content Script Initialization
**Fixed**: 
- Cleaned up duplicate initialization code
- Added proper error handling for message passing
- Improved DOM ready state detection

## Conflicting Extensions

### ⚠️ Competitor Extension Conflicts

If you see these errors:
```
[XFC] Stopped waiting for X logo path after timeout
[XFC] Stopped waiting for mobile timeline tabs after timeout  
[Twitter Control Panel] Failed to load main script
```

**Solution**: Disable the competitor "Control Panel for Twitter" extension:

1. Go to `chrome://extensions/`
2. Find "Control Panel for Twitter" 
3. Toggle it OFF or click "Remove"
4. Refresh any open X/Twitter tabs
5. The x-feed-cleaner should work without conflicts

### Why This Happens
- Both extensions try to modify the same DOM elements
- Competition for DOM mutations can cause timeouts
- Only one feed cleaner should be active at a time

## Installation Verification

### ✅ Check Extension is Working

1. **Icon appears**: Look for x-feed-cleaner icon in Chrome toolbar
2. **Popup opens**: Click icon to see settings panel  
3. **Feed changes**: Visit X/Twitter and notice cleaner interface
4. **No console errors**: Open DevTools → Console (should be clean)

### ✅ Verify Settings Sync

1. Change a setting in popup
2. Check it applies immediately to open X/Twitter tabs
3. Settings should persist after browser restart

## Common Issues

### Extension Not Loading
- **Check**: Developer mode is enabled in `chrome://extensions/`
- **Check**: Extension shows "Active" status  
- **Fix**: Try reloading the extension

### Settings Not Saving
- **Check**: Chrome storage permission is granted
- **Fix**: Reload extension and try again

### Feed Not Cleaning  
- **Check**: Extension is enabled (toggle in popup)
- **Check**: No conflicting extensions are active
- **Fix**: Refresh the X/Twitter page

## Performance Notes

- Extension uses minimal CPU/memory
- ~250 lines of optimized code vs competitor's 7250+ lines
- RequestAnimationFrame batching prevents lag
- Only processes DOM changes, not continuous polling

## Debug Mode

To enable debugging:

1. Open browser console on X/Twitter
2. Set: `localStorage.debug = 'x-feed-cleaner'`  
3. Refresh page
4. Check console for detailed logs

To disable:
```javascript
delete localStorage.debug
```

## Support

If issues persist after following this guide:
1. Disable all other X/Twitter extensions
2. Clear browser cache for X/Twitter
3. Try incognito mode to test
4. Report issue with browser version and steps to reproduce