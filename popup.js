// x-feed-cleaner popup script

class PopupController {
  constructor() {
    this.config = {};
    this.elements = {};
    this.init();
  }
  
  async init() {
    try {
      this.bindElements();
      await this.loadConfig();
      this.bindEvents();
      this.updateUI();
    } catch (error) {
      console.error('x-feed-cleaner popup init failed:', error);
    }
  }
  
  bindElements() {
    this.elements = {
      enabled: document.getElementById('enabled'),
      settings: document.getElementById('settings'),
      hidePromotedTweets: document.getElementById('hidePromotedTweets'),
      hideWhoToFollow: document.getElementById('hideWhoToFollow'),
      hideTrends: document.getElementById('hideTrends'),
      hideMetrics: document.getElementById('hideMetrics'),
      hideAlgorithmicFeed: document.getElementById('hideAlgorithmicFeed'),
      cleanSidebar: document.getElementById('cleanSidebar'),
      hideGrok: document.getElementById('hideGrok'),
      hideSubscriptions: document.getElementById('hideSubscriptions'),

      toggleAllFeatures: document.getElementById('toggleAllFeatures'),
      toggleAllText: document.getElementById('toggleAllText'),
      // Left navigation
      hideBookmarksNav: document.getElementById('hideBookmarksNav'),
      hideJobsNav: document.getElementById('hideJobsNav'),
      hideCommunitiesNav: document.getElementById('hideCommunitiesNav'),
      hidePremiumNav: document.getElementById('hidePremiumNav'),
      hideVerifiedOrgsNav: document.getElementById('hideVerifiedOrgsNav')
    };
    
    // Check for missing elements
    Object.keys(this.elements).forEach(key => {
      if (!this.elements[key]) {
        console.warn(`x-feed-cleaner: Element with id '${key}' not found`);
      }
    });
  }
  
  async loadConfig() {
    try {
      this.config = await chrome.storage.local.get({
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
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  }
  
  bindEvents() {
    try {
      // Main toggle
      if (this.elements.enabled) {
        this.elements.enabled.addEventListener('change', (e) => {
          this.updateConfig({ enabled: e.target.checked });
          this.updateUI();
        });
      }
      
      // Toggle all features button
      if (this.elements.toggleAllFeatures) {
        this.elements.toggleAllFeatures.addEventListener('click', () => {
          const featureKeys = [
            'hidePromotedTweets', 'hideWhoToFollow', 'hideTrends', 'hideMetrics',
            'hideAlgorithmicFeed', 'cleanSidebar', 'hideGrok', 'hideSubscriptions',
            'hideBookmarksNav', 'hideJobsNav', 'hideCommunitiesNav',
            'hidePremiumNav', 'hideVerifiedOrgsNav'
          ];
          
          const allOn = featureKeys.every(key => this.config[key]);
          this.toggleAllFeatures(!allOn);
          
          // Update button state immediately
          setTimeout(() => {
            this.updateToggleAllState();
          }, 100);
        });
      }
    
      // Feature toggles
      Object.keys(this.elements).forEach(key => {
        const element = this.elements[key];
        if (key !== 'enabled' && key !== 'settings' && key !== 'showBookmarkSubSetting' && 
            key !== 'toggleAllFeatures' && key !== 'toggleAllText' && element && element.type === 'checkbox') {
          element.addEventListener('change', (e) => {
            this.updateConfig({ [key]: e.target.checked });
            this.updateSubSettings();
            this.updateToggleAllState();
          });
        }
      });
    } catch (error) {
      console.error('x-feed-cleaner bindEvents failed:', error);
    }
  }
  
  updateSubSettings() {
    // No sub-settings currently
  }
  
  toggleAllFeatures(turnOn) {
    const featureKeys = [
      'hidePromotedTweets', 'hideWhoToFollow', 'hideTrends', 'hideMetrics',
      'hideAlgorithmicFeed', 'cleanSidebar', 'hideGrok', 'hideSubscriptions',
      'hideBookmarksNav', 'hideJobsNav', 'hideCommunitiesNav',
      'hidePremiumNav', 'hideVerifiedOrgsNav'
    ];
    
    const updates = {};
    featureKeys.forEach(key => {
      updates[key] = turnOn;
    });
    

    
    this.updateConfig(updates);
    this.updateUI();
  }
  
  updateToggleAllState() {
    const featureKeys = [
      'hidePromotedTweets', 'hideWhoToFollow', 'hideTrends', 'hideMetrics',
      'hideAlgorithmicFeed', 'cleanSidebar', 'hideGrok', 'hideSubscriptions',
      'hideBookmarksNav', 'hideJobsNav', 'hideCommunitiesNav',
      'hidePremiumNav', 'hideVerifiedOrgsNav'
    ];
    
    const allOn = featureKeys.every(key => this.config[key]);
    
    if (this.elements.toggleAllFeatures && this.elements.toggleAllText) {
      if (allOn) {
        this.elements.toggleAllText.textContent = 'Turn off all features';
        this.elements.toggleAllFeatures.classList.add('all-hidden');
      } else {
        this.elements.toggleAllText.textContent = 'Turn on all features';
        this.elements.toggleAllFeatures.classList.remove('all-hidden');
      }
    }
  }
  
  updateUI() {
    try {
      // Update checkbox states (skip toggleAllFeatures as it's now a button)
      Object.keys(this.elements).forEach(key => {
        if (key !== 'toggleAllFeatures' && key !== 'toggleAllText' &&
            this.elements[key] && this.config[key] !== undefined && this.elements[key].type === 'checkbox') {
          this.elements[key].checked = this.config[key];
        }
      });
      
      // Toggle settings visibility (except Extension Control section)
      if (this.elements.settings) {
        const settingGroups = this.elements.settings.querySelectorAll('.setting-group');
        settingGroups.forEach((group, index) => {
          // Skip first group (Extension Control), disable others when extension is off
          if (index > 0) {
            group.classList.toggle('disabled', !this.config.enabled);
          }
        });
      }
      
      // Update sub-settings
      this.updateSubSettings();
      
      // Update toggle all state
      this.updateToggleAllState();
    } catch (error) {
      console.error('x-feed-cleaner updateUI failed:', error);
    }
  }
  
  async updateConfig(changes) {
    this.config = { ...this.config, ...changes };
    
    try {
      await chrome.storage.local.set(this.config);
      
      // Notify content script
      const tabs = await chrome.tabs.query({ 
        url: ['*://twitter.com/*', '*://x.com/*', '*://mobile.twitter.com/*', '*://mobile.x.com/*']
      });
      
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          type: 'configUpdate',
          config: this.config
        }).catch(() => {
          // Tab might not have content script loaded, ignore error silently
        });
      });
      
    } catch (error) {
      console.error('Failed to update config:', error);
    }
  }
}

// Initialize popup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PopupController();
  });
} else {
  new PopupController();
}