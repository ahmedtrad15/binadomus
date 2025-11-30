// Fonction d'initialisation des fonctionnalités
function initializeFeatures() {
    // Menu mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown menu
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Sélecteur de langue
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (languageSwitcher) {
        const languageCurrent = languageSwitcher.querySelector('.language-current');
        
        languageCurrent.addEventListener('click', function(e) {
            e.stopPropagation();
            languageSwitcher.classList.toggle('active');
        });

        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                changeLanguage(lang);
                languageSwitcher.classList.remove('active');
            });
        });

        // Fermer le sélecteur en cliquant à l'extérieur
        document.addEventListener('click', function(e) {
            if (!languageSwitcher.contains(e.target)) {
                languageSwitcher.classList.remove('active');
            }
        });
    }

  
}

function applyLanguage(lang) {
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        } else {
            console.warn(`Translation missing for key: ${key} in language: ${lang}`);
        }
    });

    // Also update the language switcher UI (the current language display)
    const currentFlag = document.querySelector('.language-current .language-flag');
    const currentName = document.querySelector('.language-current .language-name');
    const selectedOption = document.querySelector(`.language-option[data-lang="${lang}"]`);
    
    if (selectedOption && currentFlag && currentName) {
        const selectedFlag = selectedOption.querySelector('.language-flag').src;
        currentFlag.src = selectedFlag;
        currentName.textContent = lang.toUpperCase();
        
        // Update active class in language options
        document.querySelectorAll('.language-option').forEach(opt => {
            opt.classList.remove('active');
        });
        selectedOption.classList.add('active');
    }

    // Save the preference
    localStorage.setItem('preferredLanguage', lang);
}

// Fonction pour changer de langue
function changeLanguage(lang) {
    applyLanguage(lang);
}

function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    applyLanguage(savedLanguage);
}
function initStickyHeader() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Optionnel: effet de masquage au scroll vers le bas
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
    loadSavedLanguage();
      initStickyHeader();
});

  const translations = {
            fr: {
                // Navigation
                "nav.home": "Accueil",
                "nav.products": "Nos produits",
                "nav.materials": "Matériaux",
                "nav.contact": "Contact",
                "nav.quote": "Devis gratuit",
                
                // Hero section
                "hero.title": "Vos fenêtres et portes sur mesure<br>Excellence et savoir-faire depuis plus de 10 ans",
                "hero.subtitle": "BINA DOMUS, votre spécialiste en menuiseries PVC et aluminium. Solutions personnalisées pour votre habitat : fenêtres, portes, volets roulants et bien plus encore.",
                "hero.button1": "Demander un devis gratuit",
                "hero.button2": "Découvrir nos produits",
                "hero.button3": "Nous contacter",
                
                // Features section
                "features.title": "Pourquoi choisir BINA DOMUS ?",
                "features.1.title": "Production sur mesure",
                "features.1.description": "Chaque produit est fabriqué selon vos dimensions et vos besoins spécifiques. Votre projet est unique, nos solutions aussi.",
                "features.2.title": "Livraison rapide",
                "features.2.description": "Délai de livraison de seulement 7 jours. Nous livrons dans toute la France et en Europe.",
                "features.3.title": "Large choix de couleurs",
                "features.3.description": "Un catalogue de couleurs très varié pour s'adapter parfaitement à votre décoration et à vos envies.",
                "features.4.title": "Montage professionnel",
                "features.4.description": "Possibilité de montage inclus sur devis. Nos équipes qualifiées assurent une installation impeccable.",
                "features.5.title": "Devis gratuit",
                "features.5.description": "Demandez votre devis personnalisé sans engagement. Réponse rapide et détaillée.",
                
                // Products section
                "products.title": "Découvrez notre gamme complète de menuiseries",
                "products.1.title": "Fenêtres PVC et Aluminium",
                "products.1.description": "Allient isolation thermique, acoustique et esthétisme pour améliorer votre confort au quotidien.",
                "products.2.title": "Portes d'entrée sécurisées",
                "products.2.description": "Combinez sécurité, isolation et design pour une première impression remarquable.",
                "products.3.title": "Systèmes coulissants",
                "products.3.description": "Ouvrez votre intérieur sur l'extérieur avec luminosité maximale et gain d'espace.",
                "products.4.title": "Volets roulants",
                "products.4.description": "Protection solaire, isolation thermique et sécurité en version manuelle ou motorisée.",
                "products.link": "En savoir plus",
                "products.button": "Voir tous nos produits",
                
                // Footer
                "footer.description": "Votre spécialiste menuiseries PVC et Aluminium. Excellence et savoir-faire depuis plus de 10 ans.",
                "footer.navigation": "Navigation",
                "footer.home": "Accueil",
                "footer.products": "Produits",
                "footer.materials": "Matériaux",
                "footer.contact": "Contact",
                "footer.quote": "Devis gratuit",
                "footer.services": "Nos services",
                "footer.service1": "Production sur mesure",
                "footer.service2": "Livraison France & Europe",
                "footer.service3": "Montage professionnel",
                "footer.service4": "Devis gratuit",
                "footer.service5": "Délai 7 jours",
                "footer.rights": "Tous droits réservés"
            },
            en: {
                // Navigation
                "nav.home": "Home",
                "nav.products": "Our Products",
                "nav.materials": "Materials",
                "nav.contact": "Contact",
                "nav.quote": "Free Quote",
                
                // Hero section
                "hero.title": "Your Custom Windows and Doors<br>Excellence and Know-How for Over 10 Years",
                "hero.subtitle": "BINA DOMUS, your specialist in PVC and aluminum joinery. Customized solutions for your home: windows, doors, roller shutters and much more.",
                "hero.button1": "Request a Free Quote",
                "hero.button2": "Discover Our Products",
                "hero.button3": "Contact Us",
                
                // Features section
                "features.title": "Why Choose BINA DOMUS?",
                "features.1.title": "Custom Production",
                "features.1.description": "Each product is manufactured according to your dimensions and specific needs. Your project is unique, our solutions too.",
                "features.2.title": "Fast Delivery",
                "features.2.description": "Delivery time of only 7 days. We deliver throughout France and Europe.",
                "features.3.title": "Wide Choice of Colors",
                "features.3.description": "A very varied color catalog to perfectly match your decoration and desires.",
                "features.4.title": "Professional Installation",
                "features.4.description": "Possibility of installation included in the quote. Our qualified teams ensure impeccable installation.",
                "features.5.title": "Free Quote",
                "features.5.description": "Request your personalized quote without obligation. Quick and detailed response.",
                
                // Products section
                "products.title": "Discover Our Complete Range of Joinery",
                "products.1.title": "PVC and Aluminum Windows",
                "products.1.description": "Combine thermal insulation, acoustic insulation and aesthetics to improve your daily comfort.",
                "products.2.title": "Secure Entrance Doors",
                "products.2.description": "Combine security, insulation and design for a remarkable first impression.",
                "products.3.title": "Sliding Systems",
                "products.3.description": "Open your interior to the exterior with maximum brightness and space saving.",
                "products.4.title": "Roller Shutters",
                "products.4.description": "Sun protection, thermal insulation and security in manual or motorized version.",
                "products.link": "Learn More",
                "products.button": "View All Products",
                
                // Footer
                "footer.description": "Your specialist in PVC and aluminum joinery. Excellence and know-how for over 10 years.",
                "footer.navigation": "Navigation",
                "footer.home": "Home",
                "footer.products": "Products",
                "footer.materials": "Materials",
                "footer.contact": "Contact",
                "footer.quote": "Free Quote",
                "footer.services": "Our Services",
                "footer.service1": "Custom Production",
                "footer.service2": "Delivery France & Europe",
                "footer.service3": "Professional Installation",
                "footer.service4": "Free Quote",
                "footer.service5": "7-Day Delivery",
                "footer.rights": "All Rights Reserved"
            },
            it: {
                // Navigation
                "nav.home": "Home",
                "nav.products": "I Nostri Prodotti",
                "nav.materials": "Materiali",
                "nav.contact": "Contatto",
                "nav.quote": "Preventivo Gratuito",
                
                // Hero section
                "hero.title": "Le Vostre Finestre e Porte Su Misura<br>Eccellenza e Competenza da Più di 10 Anni",
                "hero.subtitle": "BINA DOMUS, il vostro specialista in serramenti PVC e alluminio. Soluzioni personalizzate per la vostra casa: finestre, porte, avvolgibili e molto altro.",
                "hero.button1": "Richiedi un Preventivo Gratuito",
                "hero.button2": "Scopri i Nostri Prodotti",
                "hero.button3": "Contattaci",
                
                // Features section
                "features.title": "Perché Scegliere BINA DOMUS?",
                "features.1.title": "Produzione Su Misura",
                "features.1.description": "Ogni prodotto è fabbricato secondo le vostre dimensioni e necessità specifiche. Il vostro progetto è unico, anche le nostre soluzioni.",
                "features.2.title": "Consegna Rapida",
                "features.2.description": "Tempo di consegna di soli 7 giorni. Consegniamo in tutta la Francia e in Europa.",
                "features.3.title": "Ampia Scelta di Colori",
                "features.3.description": "Un catalogo colori molto vario per adattarsi perfettamente alla vostra decorazione e ai vostri desideri.",
                "features.4.title": "Montaggio Professionale",
                "features.4.description": "Possibilità di montaggio incluso nel preventivo. I nostri team qualificati garantiscono un'installazione impeccabile.",
                "features.5.title": "Preventivo Gratuito",
                "features.5.description": "Richiedete il vostro preventivo personalizzato senza impegno. Risposta rapida e dettagliata.",
                
                // Products section
                "products.title": "Scopri la Nostra Gamma Completa di Serramenti",
                "products.1.title": "Finestre in PVC e Alluminio",
                "products.1.description": "Combinano isolamento termico, acustico ed estetica per migliorare il vostro comfort quotidiano.",
                "products.2.title": "Porte d'Ingresso Sicure",
                "products.2.description": "Combinate sicurezza, isolamento e design per una prima impressione notevole.",
                "products.3.title": "Sistemi Scorrevoli",
                "products.3.description": "Aprite il vostro interno all'esterno con massima luminosità e risparmio di spazio.",
                "products.4.title": "Tapparelle",
                "products.4.description": "Protezione solare, isolamento termico e sicurezza in versione manuale o motorizzata.",
                "products.link": "Scopri di Più",
                "products.button": "Vedi Tutti i Prodotti",
                
                // Footer
                "footer.description": "Il vostro specialista in serramenti PVC e alluminio. Eccellenza e competenza da più di 10 anni.",
                "footer.navigation": "Navigazione",
                "footer.home": "Home",
                "footer.products": "Prodotti",
                "footer.materials": "Materiali",
                "footer.contact": "Contatto",
                "footer.quote": "Preventivo Gratuito",
                "footer.services": "I Nostri Servizi",
                "footer.service1": "Produzione Su Misura",
                "footer.service2": "Consegna Francia & Europa",
                "footer.service3": "Montaggio Professionale",
                "footer.service4": "Preventivo Gratuito",
                "footer.service5": "Consegna 7 Giorni",
                "footer.rights": "Tutti i Diritti Riservati"
            },
            es: {
                // Navigation
                "nav.home": "Inicio",
                "nav.products": "Nuestros Productos",
                "nav.materials": "Materiales",
                "nav.contact": "Contacto",
                "nav.quote": "Presupuesto Gratuito",
                
                // Hero section
                "hero.title": "Sus Ventanas y Puertas a Medida<br>Excelencia y Saber Hacer desde Hace Más de 10 Años",
                "hero.subtitle": "BINA DOMUS, su especialista en carpintería de PVC y aluminio. Soluciones personalizadas para su hogar: ventanas, puertas, persianas enrollables y mucho más.",
                "hero.button1": "Solicitar Presupuesto Gratuito",
                "hero.button2": "Descubrir Nuestros Productos",
                "hero.button3": "Contactarnos",
                
                // Features section
                "features.title": "¿Por Qué Elegir BINA DOMUS?",
                "features.1.title": "Producción a Medida",
                "features.1.description": "Cada producto se fabrica según sus dimensiones y necesidades específicas. Su proyecto es único, nuestras soluciones también.",
                "features.2.title": "Entrega Rápida",
                "features.2.description": "Plazo de entrega de solo 7 días. Entregamos en toda Francia y Europa.",
                "features.3.title": "Amplia Gama de Colores",
                "features.3.description": "Un catálogo de colores muy variado para adaptarse perfectamente a su decoración y sus deseos.",
                "features.4.title": "Montaje Profesional",
                "features.4.description": "Posibilidad de montaje incluido en el presupuesto. Nuestros equipos cualificados garantizan una instalación impecable.",
                "features.5.title": "Presupuesto Gratuito",
                "features.5.description": "Solicite su presupuesto personalizado sin compromiso. Respuesta rápida y detallada.",
                
                // Products section
                "products.title": "Descubra Nuestra Gama Completa de Carpintería",
                "products.1.title": "Ventanas de PVC y Aluminio",
                "products.1.description": "Combinan aislamiento térmico, acústico y estética para mejorar su confort diario.",
                "products.2.title": "Puertas de Entrada Seguras",
                "products.2.description": "Combine seguridad, aislamiento y diseño para una primera impresión notable.",
                "products.3.title": "Sistemas Correderos",
                "products.3.description": "Abra su interior al exterior con máxima luminosidad y ahorro de espacio.",
                "products.4.title": "Persianas Enrollables",
                "products.4.description": "Protección solar, aislamiento térmico y seguridad en versión manual o motorizada.",
                "products.link": "Saber Más",
                "products.button": "Ver Todos los Productos",
                
                // Footer
                "footer.description": "Su especialista en carpintería de PVC y aluminio. Excelencia y saber hacer desde hace más de 10 años.",
                "footer.navigation": "Navegación",
                "footer.home": "Inicio",
                "footer.products": "Productos",
                "footer.materials": "Materiales",
                "footer.contact": "Contacto",
                "footer.quote": "Presupuesto Gratuito",
                "footer.services": "Nuestros Servicios",
                "footer.service1": "Producción a Medida",
                "footer.service2": "Entrega Francia & Europa",
                "footer.service3": "Montaje Profesional",
                "footer.service4": "Presupuesto Gratuito",
                "footer.service5": "Plazo 7 Días",
                "footer.rights": "Todos los Derechos Reservados"
            }
        };