let skipButtonAppearanceTime = null;

function observeSkipButton() {
  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.type === 'childList') {
        const skipButton = document.querySelector('.ytp-ad-skip-button');
        if (skipButton && !skipButtonAppearanceTime) {
          console.log('Skip button appeared');
          skipButtonAppearanceTime = Date.now();
          skipButton.addEventListener('click', handleSkipClick);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function handleSkipClick() {
  if (skipButtonAppearanceTime) {
    const reactionTime = (Date.now() - skipButtonAppearanceTime) / 1000;
    console.log(`Reaction time: ${reactionTime.toFixed(3)} seconds`);
    skipButtonAppearanceTime = null;
  }
}

console.log('YouTube Ad Reaction Timer content script loaded');
observeSkipButton();