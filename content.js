// x-feed-cleaner: CSS-based X/Twitter cleaner that actually works

class FeedCleaner {
  constructor() {
    this.hasAutoSwitched = false;
    this.styleElement = null;
    this.config = {
      enabled: true,
      hidePromotedTweets: true,
      hideWhoToFollow: true,
      hideTrends: true,
      hideMetrics: true,
      hideAlgorithmicFeed: true,
      cleanSidebar: true,
      hideGrok: true,
      hideSubscriptions: true,

      // Left sidebar navigation
      hideBookmarksNav: false,
      hideJobsNav: false,
      hideCommunitiesNav: false,
      hidePremiumNav: false,
      hideVerifiedOrgsNav: false
    };
    
    this.init();
  }
  
  async init() {
    await this.loadConfig();
    this.injectCSS();
    this.setupObserver();
    
    // Auto-switch to Following tab
    setTimeout(() => {
      this.switchToFollowing();
    }, 1000);
  }
  
  async loadConfig() {
    try {
      const stored = await chrome.storage.local.get(this.config);
      this.config = { ...this.config, ...stored };
    } catch (error) {
      // Use defaults
    }
  }
  
  injectCSS() {
    if (this.styleElement) {
      this.styleElement.remove();
    }
    
    let css = '';
    
    // Hide sidebar completely
    if (this.config.cleanSidebar) {
      css += `
        [data-testid="sidebarColumn"] { display: none !important; }
      `;
    }
    
    // Hide metrics
    if (this.config.hideMetrics) {
      css += `
        [data-testid="views"] { display: none !important; }
        [aria-label*="views"] { display: none !important; }
      `;
    }
    
    // Hide Who to Follow
    if (this.config.hideWhoToFollow) {
      css += `
        [data-testid="sidebarColumn"] [data-testid="whoToFollow"] { display: none !important; }
        [data-testid="sidebarColumn"] [aria-label*="Who to follow"] { display: none !important; }
      `;
    }
    
    // Hide Trends
    if (this.config.hideTrends) {
      css += `
        [data-testid="sidebarColumn"] [data-testid="trends"] { display: none !important; }
        [data-testid="sidebarColumn"] [aria-label*="Trends"] { display: none !important; }
      `;
    }
    
    // Hide Subscriptions
    if (this.config.hideSubscriptions) {
      css += `
        [data-testid="sidebarColumn"] [data-testid="subscriptions"] { display: none !important; }
        [data-testid="sidebarColumn"] [aria-label*="Subscriptions"] { display: none !important; }
      `;
    }
    
    // Hide Grok navigation - comprehensive selectors
    if (this.config.hideGrok) {
      css += `
        /* Direct Grok links */
        a[href*="/i/grok"] { display: none !important; }
        nav a[href*="/i/grok"] { display: none !important; }
        
        /* Grok navigation wrappers */
        [data-testid*="grok"] { display: none !important; }
        [aria-label*="Grok"] { display: none !important; }
        
        /* Navigation items containing Grok links */
        nav div:has(a[href*="/i/grok"]) { display: none !important; }
        nav li:has(a[href*="/i/grok"]) { display: none !important; }
        
        /* Specific navigation patterns */
        [role="link"][href*="/i/grok"] { display: none !important; }
        [role="navigation"] [href*="/i/grok"] { display: none !important; }
      `;
    }
    
    // Hide left sidebar navigation items
    if (this.config.hideBookmarksNav) {
      css += `
        a[href="/i/bookmarks"] { display: none !important; }
        nav a[href="/i/bookmarks"] { display: none !important; }
      `;
    }
    
    if (this.config.hideJobsNav) {
      css += `
        a[href="/jobs"] { display: none !important; }
        nav a[href="/jobs"] { display: none !important; }
      `;
    }
    
    if (this.config.hideCommunitiesNav) {
      css += `
        a[href="/i/communities"] { display: none !important; }
        nav a[href="/i/communities"] { display: none !important; }
        [data-testid="communities"] { display: none !important; }
        [aria-label*="Communities"] { display: none !important; }
        [role="link"][href*="/i/communities"] { display: none !important; }
      `;
    }
    
    if (this.config.hidePremiumNav) {
      css += `
        a[href="/i/premium"] { display: none !important; }
        a[href*="/i/premium"] { display: none !important; }
        nav a[href*="/i/premium"] { display: none !important; }
      `;
    }
    
    if (this.config.hideVerifiedOrgsNav) {
      css += `
        a[href="/i/verified-orgs-signup"] { display: none !important; }
        a[href*="/verified-orgs"] { display: none !important; }
        nav a[href*="/verified-orgs"] { display: none !important; }
      `;
    }
    

    
    if (css) {
      this.styleElement = document.createElement('style');
      this.styleElement.textContent = css;
      document.head.appendChild(this.styleElement);
    }
  }
  
  setupObserver() {
    const observer = new MutationObserver(() => {
      this.hidePromotedTweets();
      this.hideGrokByText();
      this.hideCommunitiesByText();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  hideGrokByText() {
    if (!this.config.hideGrok) return;
    
    // Hide navigation items with "Grok" text
    document.querySelectorAll('nav a, nav div, nav span').forEach(el => {
      if (el.textContent.trim().toLowerCase().includes('grok')) {
        const navItem = el.closest('[role="link"], li, div[role="tab"], a');
        if (navItem) {
          navItem.style.display = 'none';
        }
      }
    });
  }
  
  hideCommunitiesByText() {
    if (!this.config.hideCommunitiesNav) return;
    
    // Hide navigation items with "Communities" text
    document.querySelectorAll('nav a, nav div, nav span, div[role="link"]').forEach(el => {
      if (el.textContent.trim().toLowerCase().includes('communities')) {
        const navItem = el.closest('[role="link"], li, div[role="tab"], a, div[class*="css-"]');
        if (navItem) {
          navItem.style.display = 'none';
        }
      }
    });
  }
  
  switchToFollowing() {
    if (!this.config.hideAlgorithmicFeed || this.hasAutoSwitched) return;
    
    const tabs = document.querySelectorAll('[role="tab"]');
    for (const tab of tabs) {
      if (tab.textContent.toLowerCase().includes('following') && 
          tab.getAttribute('aria-selected') !== 'true' &&
          window.location.href.includes('/home')) {
        tab.click();
        this.hasAutoSwitched = true;
        break;
      }
    }
  }
  
  hidePromotedTweets() {
    if (!this.config.hidePromotedTweets) return;
    
    document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
      const socialContext = tweet.querySelector('[data-testid="socialContext"]');
      if (socialContext && socialContext.textContent.includes('Promoted')) {
        const container = tweet.closest('[data-testid="cellInnerDiv"]');
        if (container) {
          container.style.display = 'none';
        }
      }
    });
  }
  

  
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    chrome.storage.local.set(this.config);
    
    // Re-inject CSS with new settings
    this.injectCSS();
    
    // Reset auto-switch flag if algorithmic feed setting changed
    if (newConfig.hideAlgorithmicFeed !== undefined) {
      this.hasAutoSwitched = false;
    }
  }
}

// Initialize and export for popup communication
let feedCleaner;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    feedCleaner = new FeedCleaner();
    window.feedCleaner = feedCleaner;
  });
} else {
  feedCleaner = new FeedCleaner();
  window.feedCleaner = feedCleaner;
}

// Listen for config updates from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'configUpdate' && window.feedCleaner) {
    window.feedCleaner.updateConfig(message.config);
  }
});