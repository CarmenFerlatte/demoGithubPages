let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

// CODELAB: Add event listener for beforeinstallprompt event

/**
 * * Event handler for beforinstallprompt event.
 * * Saves the event & shows install button.
 * *
 * * @param {Event} evt 
 * 
 */