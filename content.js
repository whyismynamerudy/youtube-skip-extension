let skipButtonAppearanceTime = null;
let observer = null;

function isSkipButtonClickable(skipButton) {
    // Check if the button is enabled and visible
    if (skipButton.offsetParent === null || skipButton.disabled) {
        return false;
    }

    // Check for common countdown patterns
    const text = skipButton.textContent.trim().toLowerCase();
    if (text.includes('skip ad in') || /\d+\s*sec(ond)?s?/.test(text)) {
        return false;
    }

    // Check if the button has the final "Skip Ad" text or is otherwise in a clickable state
    return text.includes('skip') || skipButton.classList.contains('ytp-skip-ad-button-enabled');
}

function handleSkipButtonState(skipButton) {
    if (isSkipButtonClickable(skipButton) && !skipButtonAppearanceTime) {
        console.log('Skip button is now clickable');
        skipButtonAppearanceTime = Date.now();
        skipButton.addEventListener('click', handleSkipClick);
    }
}

function handleSkipClick() {
    if (skipButtonAppearanceTime) {
        const reactionTime = (Date.now() - skipButtonAppearanceTime) / 1000;
        console.log(`Reaction time: ${reactionTime.toFixed(3)} seconds`);
        skipButtonAppearanceTime = null;
    }
}

function checkForSkipButton() {
    const skipButton = document.querySelector('.ytp-skip-ad-button, .videoAdUiSkipButton');
    if (skipButton) {
        handleSkipButtonState(skipButton);
    }
}

function observeDOM() {
    observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'characterData' || mutation.type === 'attributes') {
                const skipButton = document.querySelector('.ytp-skip-ad-button, .videoAdUiSkipButton');
                if (skipButton) {
                    handleSkipButtonState(skipButton);
                    return;
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
    });
}

function setupInitialCheck() {
    checkForSkipButton();
    setInterval(checkForSkipButton, 100); // Check frequently
}

function resetDetection() {
    // console.log('Resetting skip button detection');
    skipButtonAppearanceTime = null;
    if (observer) {
        observer.disconnect();
    }
    setupInitialCheck();
    observeDOM();
}

console.log('YouTube Ad Reaction Timer content script loaded');
setupInitialCheck();
observeDOM();

// Listen for navigation events
document.addEventListener('yt-navigate-start', resetDetection);

// Additional check for dynamic page changes
setInterval(() => {
    if (!document.querySelector('.ytp-skip-ad-button, .videoAdUiSkipButton')) {
        resetDetection();
    }
}, 5000);