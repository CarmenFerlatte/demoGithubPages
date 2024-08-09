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

function installPWA(evt) {
    // CODELAB: Save the event & show the install button.
    // CODELAB: Log user response to prompt.

    // Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    evt.srcElement.setAttribute('hidden', true);
    // Log user response to prompt.
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log("L'usager a installé la PWA VIA les mon boutton d'installation", choice);
            } else {
                console.log("L'usager a refusé l'installation de la PWA VIA le boutton d'installation", choice);
            }
            deferredInstallPrompt = null;
        }); 
    
    function logAppInstalled(evt) {
        console.log("")
    }
}