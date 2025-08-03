// Debug helper for x-feed-cleaner
// Paste this in browser console on X.com to see what elements exist

console.log('=== X-FEED-CLEANER DEBUG ===');

console.log('1. SIDEBAR:');
console.log('sidebarColumn:', document.querySelector('[data-testid="sidebarColumn"]'));
console.log('primaryColumn:', document.querySelector('[data-testid="primaryColumn"]'));

console.log('2. TWEETS:');
console.log('tweet articles:', document.querySelectorAll('article[data-testid="tweet"]').length);
console.log('cellInnerDiv:', document.querySelectorAll('[data-testid="cellInnerDiv"]').length);

console.log('3. METRICS:');
console.log('views:', document.querySelectorAll('[data-testid="views"]').length);
console.log('analytics:', document.querySelectorAll('[data-testid="analytics"]').length);

console.log('4. NAVIGATION:');
console.log('grok links:', document.querySelectorAll('a[href*="/i/grok"]').length);
console.log('premium links:', document.querySelectorAll('a[href*="/i/premium"]').length);

console.log('5. TABS:');
const tabs = document.querySelectorAll('[role="tab"]');
console.log('tabs found:', tabs.length);
tabs.forEach((tab, i) => {
  console.log(`Tab ${i}:`, tab.textContent.trim(), 'selected:', tab.getAttribute('aria-selected'));
});

console.log('6. WHO TO FOLLOW:');
console.log('UserCell:', document.querySelectorAll('[data-testid="UserCell"]').length);
console.log('Who to follow sections:', document.querySelectorAll('section').length);

console.log('=== END DEBUG ===');