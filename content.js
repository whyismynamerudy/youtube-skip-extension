let skipButtonAppearanceTime = null;
let observer = null;

let currentUserId = null;
let currentUserEmail = null;

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

// function handleSkipClick() {
//     if (skipButtonAppearanceTime) {
//         const reactionTime = (Date.now() - skipButtonAppearanceTime) / 1000;
//         console.log(`Reaction time: ${reactionTime.toFixed(3)} seconds`);
//         skipButtonAppearanceTime = null;
//     }
// }

async function handleSkipClick() {
    if (skipButtonAppearanceTime) {
        const reactionTime = (Date.now() - skipButtonAppearanceTime) / 1000;
        console.log(`Reaction time: ${reactionTime.toFixed(3)} seconds`);
        
        // Get current user from storage
        chrome.storage.local.get(['userId', 'userEmail'], async function(result) {
            if (result.userId) {
                try {
                    const response = await fetch('https://ytskip.whyismynamerudy.tech/api/reaction-time', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: result.userId,
                            reactionTime: reactionTime,
                            timestamp: new Date().toISOString()
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to save reaction time');
                    }
                } catch (error) {
                    console.error('Error saving reaction time:', error);
                }
            }
        });
        
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

function observeUserData() {
    const observer = new MutationObserver((mutations) => {
        checkForUserData();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function setupInitialCheck() {
    checkForSkipButton();
    checkForUserData();
    setInterval(checkForSkipButton, 100);
    setInterval(checkForUserData, 1000);
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


// Function to check for user data
function checkForUserData() {
    const userDataDiv = document.querySelector('#youtube-reaction-timer-data');
    if (userDataDiv) {
        const newUserId = userDataDiv.getAttribute('data-user-id');
        const newUserEmail = userDataDiv.getAttribute('data-email');
        
        // Only update if the user has changed
        if (newUserId !== currentUserId || newUserEmail !== currentUserEmail) {
            currentUserId = newUserId;
            currentUserEmail = newUserEmail;
            
            // Store in chrome.storage for persistence
            chrome.storage.local.set({
                userId: currentUserId,
                userEmail: currentUserEmail
            });

            console.log('User data updated:', currentUserId, currentUserEmail);
        }
    }
}

console.log('YouTube Ad Reaction Timer content script loaded');

console.log("Extension ID:", chrome.runtime.id);

// You could use this in your popup.js or content.js like this:
const extensionId = chrome.runtime.id;
const redirectUrl = `chrome-extension://${extensionId}/popup.html`;

setupInitialCheck();
observeDOM();
observeUserData();

// Listen for navigation events
document.addEventListener('yt-navigate-start', resetDetection);

// Additional check for dynamic page changes
setInterval(() => {
    if (!document.querySelector('.ytp-skip-ad-button, .videoAdUiSkipButton')) {
        resetDetection();
    }
}, 5000);

// runtime id: clndmfljgfmllelmkpcldkpiabemnlcd
// client id: 65618186480-2unp9l5lr157atlmsd5h3k4l5l0585fo.apps.googleusercontent.com
