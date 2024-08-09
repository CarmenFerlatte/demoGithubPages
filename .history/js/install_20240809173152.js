let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

// CODELAB: Add event listener for beforeinstallprompt event

window.addEventListener('beforeinstallprompt', afficherBoutonInstall);

function afficherBouttonInstall(evt) {
    // CODELAB: Save the event & show the install button.
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

/**
 * * Event handler for beforinstallprompt event.
 * * Saves the event & shows install button.
 * *
 * * @param {Event} evt 
 */

function saveBeforeInstallPromptEvent(evt) {
    // CODELAB: Save the event & show the install button.
    // CODELAB: Log user response to prompt.

    // Add code show install prompt & hide the install button.
    deferedInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    // Log user response to prompt.
    deferedInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('PWA setup accepted');
            } else {
                console.log('PWA setup rejected');
            }
            defferedInstallPrompt = null;
        }); 
    
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}