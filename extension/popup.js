document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById('content');

  // Check storage for user info and reaction time
  chrome.storage.local.get(['userName', 'latestReactionTime'], function(result) {
    if (result.userName) {
      // User is logged in
      content.innerHTML = `
        <div class="card">
          <div class="stat">
            <span class="stat-label">Current Player</span>
            <span class="stat-value" style="font-size: 16px;">${result.userName}</span>
          </div>
        </div>

        <div class="card">
          <div class="stat">
            <span class="stat-label">Latest Reaction Time</span>
            <span class="stat-value">${result.latestReactionTime ? result.latestReactionTime.toFixed(3) + 's' : 'No skips yet'}</span>
          </div>
        </div>
      `;
    } else {
      // User is not logged in
      content.innerHTML = `
        <div class="not-logged-in">
          Please sign in on <a href="https://ytskip.whyismynamerudy.tech/">the website</a> to track your reaction times. Log into the extension by logging in on <a href="https://ytskip.whyismynamerudy.tech/">the website</a>.
        </div>
      `;
    }
  });
});

// Listen for messages from content script with new reaction times
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'reactionTime') {
    const content = document.getElementById('content');
    // Only update if we have a logged-in view
    if (content.querySelector('.stat-value')) {
      content.querySelector('.stat-value:last-child').textContent = message.time.toFixed(3) + 's';
    }
  }
});