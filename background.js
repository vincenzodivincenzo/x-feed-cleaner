// x-feed-cleaner background script - minimal implementation

chrome.runtime.onInstalled.addListener(() => {
  // Set default configuration
  chrome.storage.local.set({
    enabled: true,
    hidePromotedTweets: true,
    hideWhoToFollow: true,
    hideTrends: true,
    hideMetrics: true,
    hideAlgorithmicFeed: true,
    cleanSidebar: true,
    hideGrok: true,
    hideSubscriptions: true,

    // Left navigation
    hideBookmarksNav: false,
    hideJobsNav: false,
    hideCommunitiesNav: false,
    hidePremiumNav: false,
    hideVerifiedOrgsNav: false
  });
  
  // Initialize icon
  updateIcon(true);
});

// Handle icon state updates
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    updateIcon(changes.enabled.newValue);
  }
});

function updateIcon(enabled) {
  const iconPath = {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  };
  
  chrome.action.setIcon({ path: iconPath }).catch(error => {
    console.warn('x-feed-cleaner: Icon update failed:', error);
  });
  
  chrome.action.setTitle({ 
          title: enabled ? "X Feed Cleaner (Active)" : "X Feed Cleaner (Disabled)" 
  });
}

// Initialize icon state
chrome.storage.local.get(['enabled']).then(({ enabled = true }) => {
  updateIcon(enabled);
});