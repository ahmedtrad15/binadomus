// Fonction pour charger les composants (header et footer)
async function loadComponents() {
    try {
        // Charger le header
        const headerResponse = await fetch('../components/header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header-container').innerHTML = headerHTML;

        // Charger le footer
        const footerResponse = await fetch('../components/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-container').innerHTML = footerHTML;

        // Initialiser les fonctionnalités après le chargement
        initializeFeatures();
        
        
    } catch (error) {
        console.error('Erreur lors du chargement des composants:', error);
    }

    
}

// Charger les composants au démarrage
document.addEventListener('DOMContentLoaded', loadComponents);