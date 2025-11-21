// config.js - Configuration centrale de l'application
const APP_CONFIG = {
    // Informations de contact
    CONTACT: {
        WEBSITE: 'https://www.scsmaubmar.org',
        SUPPORT_EMAIL: 'support@scsmaubmar.org',
        PHONE: '+237 XXX XXX XXX',
        ADDRESS: 'Yaoundé, Cameroun'
    },
    
    // Informations de l'application
    APP_INFO: {
        NAME: 'WeneedApp',
        VERSION: '1.0.0',
        COPYRIGHT: '© 2025 WeneedApp. Tous droits réservés.',
        POWERED_BY: 'SCS MauBmar'
    },
    
    // Paramètres de l'application
    SETTINGS: {
        MAX_ITEMS_PER_PAGE: 12,
        AUTO_SAVE_INTERVAL: 30000, // 30 secondes
        ENABLE_ANALYTICS: true
    }
};

// Fonction pour mettre à jour dynamiquement les contacts dans l'application
function updateContactElements() {
    const websiteElements = document.querySelectorAll('[data-contact="website"]');
    const emailElements = document.querySelectorAll('[data-contact="email"]');
    const phoneElements = document.querySelectorAll('[data-contact="phone"]');
    
    websiteElements.forEach(el => {
        if (el.tagName === 'A') {
            el.href = APP_CONFIG.CONTACT.WEBSITE;
            el.textContent = APP_CONFIG.CONTACT.WEBSITE.replace('https://', '');
        } else {
            el.textContent = APP_CONFIG.CONTACT.WEBSITE;
        }
    });
    
    emailElements.forEach(el => {
        if (el.tagName === 'A') {
            el.href = `mailto:${APP_CONFIG.CONTACT.SUPPORT_EMAIL}`;
            el.textContent = APP_CONFIG.CONTACT.SUPPORT_EMAIL;
        } else {
            el.textContent = APP_CONFIG.CONTACT.SUPPORT_EMAIL;
        }
    });
    
    phoneElements.forEach(el => {
        el.textContent = APP_CONFIG.CONTACT.PHONE;
    });
}

// Appeler cette fonction au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    updateContactElements();
});