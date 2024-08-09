let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

// CODELAB: Add event listener for beforeinstallprompt event

window.addEventListener('beforeinstallprompt', afficherBoutonInstall));

/**
 * * Event handler for beforinstallprompt event.
 * * Saves the event & shows install button.
 * *
 * * @param {Event} evt 
 */

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}