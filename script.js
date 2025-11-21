/********************************************************************
 * CONFIGURATION ET CONSTANTES
 ********************************************************************/

const AUTH_CONFIG = {
    ADMIN_CODE: "13245@10001a",
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 heures
    USER_SESSION_KEY: "weneedapp_user_session",
    ADMIN_SESSION_KEY: "weneedapp_admin_session"
};

// Données pour l'application
let services = JSON.parse(localStorage.getItem('weneedapp-services')) || [];
let orders = JSON.parse(localStorage.getItem('weneedapp-orders')) || [];
let users = JSON.parse(localStorage.getItem('weneedapp-users')) || [];

// Structure des régions, départements et villes du Cameroun
const cameroonLocations = {
    'adamaoua': {
        name: 'Adamaoua',
        departments: {
            'djerem': { name: 'Djérem', cities: ['Tibati', 'Ngaoundal'] },
            'faro-et-deo': { name: 'Faro et Déo', cities: ['Tignère', 'Galim', 'Mayo-Baléo'] },
            'mayo-banyo': { name: 'Mayo-Banyo', cities: ['Banyo', 'Bankim', 'Mayo-Darlé'] },
            'mbere': { name: 'Mbéré', cities: ['Meiganga', 'Djohong'] },
            'vina': { name: 'Vina', cities: ['Ngaoundéré', 'Mbe', 'Nganha'] }
        }
    },
    'centre': {
        name: 'Centre',
        departments: {
            'haute-sanaga': { name: 'Haute-Sanaga', cities: ['Nanga-Eboko', 'Mbandjock'] },
            'lekie': { name: 'Lekié', cities: ['Monatélé', 'Obala', 'Saa'] },
            'mbam-et-inoubou': { name: 'Mbam et Inoubou', cities: ['Bafia', 'Makénéné', 'Ndikiniméki'] },
            'mbam-et-kim': { name: 'Mbam et Kim', cities: ['Ntui', 'Yoko'] },
            'mefou-et-afamba': { name: 'Méfou et Afamba', cities: ['Mfou', 'Eséka', 'Ngoumou'] },
            'mefou-et-akono': { name: 'Méfou et Akono', cities: ['Ngoumou', 'Akono'] },
            'mfoundi': { name: 'Mfoundi', cities: ['Yaoundé'] },
            'nyong-et-ekelle': { name: 'Nyong et Ekellé', cities: ['Édéa', 'Dibang', 'Ngwei'] },
            'nyong-et-mfoumou': { name: 'Nyong et Mfoumou', cities: ['Akonolinga', 'Ayos'] },
            'nyong-et-soo': { name: 'Nyong et Soo', cities: ['Mbalmayo', 'Akoeman'] }
        }
    },
    'est': {
        name: 'Est',
        departments: {
            'boumba-et-ngoko': { name: 'Boumba-et-Ngoko', cities: ['Yokadouma', 'Moloundou', 'Salapoumbé'] },
            'haut-nyong': { name: 'Haut-Nyong', cities: ['Abong-Mbang', 'Dimako', 'Doumé', 'Lomié'] },
            'kadey': { name: 'Kadey', cities: ['Batouri', 'Ndélélé', 'Kette', 'Mbang'] },
            'lom-et-djerem': { name: 'Lom-et-Djérem', cities: ['Bertoua', 'Bélabo', 'Diang', 'Garoua-Boulaï'] }
        }
    },
    'extreme-nord': {
        name: 'Extrême-Nord',
        departments: {
            'diamare': { name: 'Diamaré', cities: ['Maroua', 'Bogo', 'Meri', 'Mokolo'] },
            'logone-et-chari': { name: 'Logone-et-Chari', cities: ['Kousséri', 'Makary', 'Hile-Alifa', 'Logone-Birni'] },
            'mayo-danay': { name: 'Mayo-Danay', cities: ['Yagoua', 'Kaélé', 'Guéré', 'Tchati'] },
            'mayo-kani': { name: 'Mayo-Kani', cities: ['Kaélé', 'Mindif', 'Moulvoudaye'] },
            'mayo-sava': { name: 'Mayo-Sava', cities: ['Mora', 'Tokombéré', 'Kolofata'] },
            'mayo-tsanaga': { name: 'Mayo-Tsanaga', cities: ['Mokolo', 'Mora', 'Koza'] }
        }
    },
    'littoral': {
        name: 'Littoral',
        departments: {
            'moungo': { name: 'Moungo', cities: ['Nkongsamba', 'Loum', 'Melong', 'Manjo'] },
            'nkam': { name: 'Nkam', cities: ['Yabassi', 'Nkondjock'] },
            'sanaga-maritime': { name: 'Sanaga-Maritime', cities: ['Édéa', 'Dizangué', 'Ndom', 'Ngambe'] },
            'wouri': { name: 'Wouri', cities: ['Douala', 'Manoka'] }
        }
    },
    'nord': {
        name: 'Nord',
        departments: {
            'benoue': { name: 'Bénoué', cities: ['Garoua', 'Pitoa', 'Lagdo', 'Dembo'] },
            'faro': { name: 'Faro', cities: ['Poli', 'Beka', 'Gashiga'] },
            'mayo-louti': { name: 'Mayo-Louti', cities: ['Guider', 'Figuil', 'Mayo-Oulo'] },
            'mayo-rey': { name: 'Mayo-Rey', cities: ['Tcholliré', 'Rey Bouba', 'Madingring'] }
        }
    },
    'nord-ouest': {
        name: 'Nord-Ouest',
        departments: {
            'bui': { name: 'Bui', cities: ['Kumbo', 'Jakiri', 'Mbiame'] },
            'boyo': { name: 'Boyo', cities: ['Fundong', 'Belo', 'Njinikom'] },
            'donga-mantung': { name: 'Donga-Mantung', cities: ['Nkambé', 'Ndu', 'Nwa', 'Ako'] },
            'menchum': { name: 'Menchum', cities: ['Wum', 'Benakuma', 'Furu-Awa'] },
            'mezam': { name: 'Mezam', cities: ['Bamenda', 'Bafut', 'Santa', 'Tubah'] },
            'momo': { name: 'Momo', cities: ['Mbengwi', 'Batibo', 'Njikwa', 'Andek'] },
            'ngo-ketunjia': { name: 'Ngo-Ketunjia', cities: ['Ndop', 'Babessi', 'Balikumbat'] }
        }
    },
    'ouest': {
        name: 'Ouest',
        departments: {
            'bamboutos': { name: 'Bamboutos', cities: ['Mbouda', 'Galim', 'Batcham'] },
            'haut-nkam': { name: 'Haut-Nkam', cities: ['Bafang', 'Bana', 'Kékem'] },
            'hauts-plateaux': { name: 'Hauts-Plateaux', cities: ['Baham', 'Bandjoun', 'Bangangté'] },
            'koung-khi': { name: 'Koung-Khi', cities: ['Badjoun', 'Fokoué'] },
            'menoua': { name: 'Menoua', cities: ['Dschang', 'Fongo-Tongo', 'Fokoué'] },
            'mifi': { name: 'Mifi', cities: ['Bafoussam', 'Bamougoum'] },
            'nde': { name: 'Ndé', cities: ['Bangangté', 'Tonga', 'Bazou'] },
            'noun': { name: 'Noun', cities: ['Foumban', 'Foumbot', 'Koutaba', 'Massangam'] }
        }
    },
    'sud': {
        name: 'Sud',
        departments: {
            'dja-et-lobo': { name: 'Dja-et-Lobo', cities: ['Sangmélima', 'Meyomessala', 'Mintom'] },
            'mvila': { name: 'Mvila', cities: ['Ebolowa', 'Mvangane', 'Ngoulemakong'] },
            'ocean': { name: 'Océan', cities: ['Kribi', 'Lolodorf', 'Bipindi', 'Campo'] },
            'vallee-du-ntem': { name: 'Vallée du Ntem', cities: ['Ambam', 'Olamze', 'Ma\'an'] }
        }
    },
    'sud-ouest': {
        name: 'Sud-Ouest',
        departments: {
            'fako': { name: 'Fako', cities: ['Limbé', 'Buéa', 'Tiko', 'Muyuka'] },
            'koupe-manengouba': { name: 'Koupé-Manengouba', cities: ['Bangem', 'Nguti', 'Tombel'] },
            'lebialem': { name: 'Lebialem', cities: ['Menji', 'Alou', 'Wabane'] },
            'manyu': { name: 'Manyu', cities: ['Mamfé', 'Akwaya', 'Eyumodjock'] },
            'meme': { name: 'Meme', cities: ['Kumba', 'Konye', 'Mbonge'] },
            'ndian': { name: 'Ndian', cities: ['Mundemba', 'Ekondo-Titi', 'Isangele'] }
        }
    }
};

/********************************************************************
 * UTILITAIRES GÉNÉRAUX
 ********************************************************************/

// Transforme un nom en slug (pour stockage interne)
function toSlug(str) {
    if (!str) return '';
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // retire accents
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

// Corrige automatiquement accents + capitalisation
function formatDisplayName(str) {
    if (!str) return '';
    
    const corrections = {
        "yaounde": "Yaoundé",
        "extreme-nord": "Extrême-Nord",
        "nord-ouest": "Nord-Ouest",
        "sud-ouest": "Sud-Ouest",
        "centre": "Centre",
        "ouest": "Ouest",
        "douala": "Douala"
    };

    const slug = toSlug(str);
    if (corrections[slug]) return corrections[slug];

    return str
        .toLowerCase()
        .replace(/(^|\s|-)(\w)/g, c => c.toUpperCase());
}

// Sauvegarde des données
function saveData() {
    try {
        localStorage.setItem('weneedapp-services', JSON.stringify(services));
        localStorage.setItem('weneedapp-orders', JSON.stringify(orders));
        localStorage.setItem('weneedapp-users', JSON.stringify(users));
    } catch (error) {
        console.error('Erreur sauvegarde données:', error);
    }
}

/********************************************************************
 * INITIALISATION DES SELECTS (PUBLIC ET ADMIN)
 ********************************************************************/

function initLocationSelects(prefix) {
    const regionId = prefix ? `${prefix}Region` : 'region';
    const deptId = prefix ? `${prefix}Department` : 'departement';
    const cityId = prefix ? `${prefix}City` : 'ville';
    
    const regionSelect = document.getElementById(regionId);
    const deptSelect = document.getElementById(deptId);
    const citySelect = document.getElementById(cityId);

    if (!regionSelect || !deptSelect || !citySelect) return;

    // Remplir les régions
    regionSelect.innerHTML = `<option value="">Sélectionnez une région</option>`;
    Object.keys(cameroonLocations).forEach(regionKey => {
        const opt = document.createElement("option");
        opt.value = regionKey;
        opt.textContent = formatDisplayName(cameroonLocations[regionKey].name);
        regionSelect.appendChild(opt);
    });

    // Quand la région change
    regionSelect.addEventListener("change", () => {
        const region = regionSelect.value;
        deptSelect.innerHTML = `<option value="">Sélectionnez un département</option>`;
        citySelect.innerHTML = `<option value="">Sélectionnez une ville</option>`;

        if (!region || !cameroonLocations[region]) return;

        const deps = cameroonLocations[region].departments;
        Object.keys(deps).forEach(depKey => {
            const opt = document.createElement("option");
            opt.value = depKey;
            opt.textContent = formatDisplayName(deps[depKey].name);
            deptSelect.appendChild(opt);
        });
    });

    // Quand le département change
    deptSelect.addEventListener("change", () => {
        const region = regionSelect.value;
        const dep = deptSelect.value;

        citySelect.innerHTML = `<option value="">Sélectionnez une ville</option>`;

        if (!region || !dep) return;

        const cities = cameroonLocations[region].departments[dep].cities;
        if (cities) {
            cities.forEach(city => {
                const opt = document.createElement("option");
                opt.value = toSlug(city);
                opt.textContent = formatDisplayName(city);
                citySelect.appendChild(opt);
            });
        }
    });
}

// Alias pour compatibilité
function initializeLocationSelects() {
    initLocationSelects(""); // Public
}

function initializeLocationSelectsAdmin() {
    initLocationSelects("service"); // Admin
}

/********************************************************************
 * SYSTÈME D'AUTHENTIFICATION CORRIGÉ
 ********************************************************************/

// Initialisation de l'authentification
function initializeAuth() {
    console.log('🔐 Initialisation authentification...');
    if (document.getElementById('loginForm')) {
        initializeLoginPage();
    } else {
        checkExistingSession();
    }
}

// Initialisation de la page de login
function initializeLoginPage() {
    console.log('📄 Initialisation page login...');
    
    const userTypeSelect = document.getElementById('userType');
    const userFields = document.getElementById('userFields');
    const adminFields = document.getElementById('adminFields');
    const loginForm = document.getElementById('loginForm');

    if (!userTypeSelect || !userFields || !adminFields || !loginForm) {
        console.error('❌ Éléments manquants dans le formulaire de login');
        return;
    }

    userTypeSelect.addEventListener('change', function() {
        console.log('🔄 Changement type utilisateur:', this.value);
        if (this.value === 'admin') {
            userFields.style.display = 'none';
            adminFields.style.display = 'block';
        } else {
            userFields.style.display = 'block';
            adminFields.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        console.log('📝 Formulaire soumis!');
        e.preventDefault();
        handleLogin(e);
    });

    console.log('✅ Page login initialisée');
}

// Gestion de la connexion - VERSION CORRIGÉE
function handleLogin(event) {
    console.log('🚀 handleLogin appelé');
    
    if (event) event.preventDefault();
    
    const userType = document.getElementById('userType').value;
    console.log('Type utilisateur sélectionné:', userType);

    if (!userType) {
        alert('Veuillez sélectionner un type d\'utilisateur');
        return false;
    }

    if (userType === 'admin') {
        console.log('🔑 Tentative connexion admin...');
        return handleAdminLogin();
    } else {
        console.log('👤 Tentative connexion utilisateur...');
        return handleUserLogin();
    }
}

// Connexion administrateur
function handleAdminLogin() {
    console.log('=== handleAdminLogin démarré ===');
    
    try {
        const adminCode = document.getElementById('adminCode').value.trim();

        if (!adminCode) {
            alert('Veuillez entrer le code administrateur');
            document.getElementById('adminCode').focus();
            return false;
        }

        if (adminCode === AUTH_CONFIG.ADMIN_CODE) {
            const adminSession = {
                type: 'admin',
                loggedInAt: new Date().toISOString(),
                expiresAt: Date.now() + AUTH_CONFIG.SESSION_TIMEOUT
            };

            localStorage.setItem(AUTH_CONFIG.ADMIN_SESSION_KEY, JSON.stringify(adminSession));
            
            console.log('✅ Admin connecté! Redirection...');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 100);
            
            return true;
        } else {
            alert('Code administrateur incorrect');
            document.getElementById('adminCode').focus();
            return false;
        }
    } catch (error) {
        console.error('Erreur connexion admin:', error);
        alert('Erreur lors de la connexion admin');
        return false;
    }
}

// Connexion utilisateur - VERSION COMPLÈTEMENT CORRIGÉE
function handleUserLogin() {
    console.log('=== handleUserLogin démarré ===');
    
    try {
        // Récupération sécurisée des valeurs
        const getUserField = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        const userName = getUserField('userName');
        const userEmail = getUserField('userEmail');
        const userPhone = getUserField('userPhone');

        console.log('📝 Données utilisateur:', { userName, userEmail, userPhone });

        // VALIDATION
        if (!userName) {
            alert('Veuillez entrer votre nom complet');
            document.getElementById('userName').focus();
            return false;
        }

        if (!userEmail) {
            alert('Veuillez entrer votre adresse email');
            document.getElementById('userEmail').focus();
            return false;
        }

        // Validation email basique
        if (!userEmail.includes('@') || !userEmail.includes('.')) {
            alert('Veuillez entrer une adresse email valide');
            document.getElementById('userEmail').focus();
            return false;
        }

        console.log('✅ Validation réussie');

        // CRÉATION DE L'UTILISATEUR
        const user = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name: userName,
            email: userEmail.toLowerCase(),
            phone: userPhone,
            type: 'user',
            firstLogin: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        console.log('👤 Utilisateur créé:', user);

        // SAUVEGARDE UTILISATEUR
        let users = JSON.parse(localStorage.getItem('weneedapp-users') || '[]');
        
        // Vérifier si l'utilisateur existe déjà
        const existingUserIndex = users.findIndex(u => u.email === user.email);
        
        if (existingUserIndex !== -1) {
            // Mettre à jour l'utilisateur existant
            users[existingUserIndex].lastLogin = user.lastLogin;
            users[existingUserIndex].name = user.name;
            console.log('🔄 Utilisateur existant mis à jour');
        } else {
            // Nouvel utilisateur
            users.push(user);
            console.log('➕ Nouvel utilisateur ajouté');
        }
        
        localStorage.setItem('weneedapp-users', JSON.stringify(users));
        console.log('💾 Utilisateur sauvegardé');

        // CRÉATION DE LA SESSION
        const userSession = {
            userId: user.id,
            type: 'user',
            loggedInAt: new Date().toISOString(),
            expiresAt: Date.now() + AUTH_CONFIG.SESSION_TIMEOUT
        };

        localStorage.setItem(AUTH_CONFIG.USER_SESSION_KEY, JSON.stringify(userSession));
        console.log('🔐 Session créée:', userSession);

        // VÉRIFICATION
        const verifyUser = localStorage.getItem('weneedapp-users');
        const verifySession = localStorage.getItem(AUTH_CONFIG.USER_SESSION_KEY);
        
        console.log('🔍 Vérification sauvegarde:');
        console.log('- Users dans localStorage:', verifyUser ? '✅' : '❌');
        console.log('- Session dans localStorage:', verifySession ? '✅' : '❌');

        if (!verifyUser || !verifySession) {
            throw new Error('Échec de la sauvegarde des données');
        }

        // REDIRECTION
        console.log('🎉 Connexion réussie! Redirection vers index.html...');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 100);

        return true;

    } catch (error) {
        console.error('💥 ERREUR CRITIQUE dans handleUserLogin:', error);
        alert('Une erreur technique est survenue: ' + error.message);
        return false;
    }
}

// Vérification de session existante
function checkExistingSession() {
    const userSession = localStorage.getItem(AUTH_CONFIG.USER_SESSION_KEY);
    const adminSession = localStorage.getItem(AUTH_CONFIG.ADMIN_SESSION_KEY);

    // Vérifier la session admin
    if (adminSession) {
        try {
            const session = JSON.parse(adminSession);
            if (Date.now() < session.expiresAt) {
                if (window.location.pathname.includes('admin.html')) {
                    initializeAdminInterface();
                } else {
                    window.location.href = 'admin.html';
                }
                return;
            } else {
                localStorage.removeItem(AUTH_CONFIG.ADMIN_SESSION_KEY);
            }
        } catch (error) {
            console.error('Erreur session admin:', error);
            localStorage.removeItem(AUTH_CONFIG.ADMIN_SESSION_KEY);
        }
    }

    // Vérifier la session utilisateur
    if (userSession) {
        try {
            const session = JSON.parse(userSession);
            if (Date.now() < session.expiresAt) {
                if (window.location.pathname.includes('admin.html')) {
                    window.location.href = 'index.html';
                } else {
                    initializeUserInterface(session.userId);
                }
                return;
            } else {
                localStorage.removeItem(AUTH_CONFIG.USER_SESSION_KEY);
            }
        } catch (error) {
            console.error('Erreur session utilisateur:', error);
            localStorage.removeItem(AUTH_CONFIG.USER_SESSION_KEY);
        }
    }

    // Aucune session valide, rediriger vers le login
    if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Navigation et interfaces
function initializeUserInterface(userId) {
    const user = getUser(userId);
    if (user) {
        updateUserNavigation(user);
    }
}

function initializeAdminInterface() {
    document.body.classList.add('admin-logged-in');
    updateAdminNavigation();
}

function updateUserNavigation(user) {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    const userNav = document.createElement('li');
    userNav.className = 'user-nav';
    
    userNav.innerHTML = `
        <div class="user-info">
            <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <span>${user.name}</span>
        </div>
        <button class="logout-btn" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
        </button>
    `;
    
    const adminLink = document.querySelector('.admin-btn');
    if (adminLink && adminLink.parentNode) {
        adminLink.parentNode.replaceChild(userNav, adminLink);
    } else {
        navMenu.appendChild(userNav);
    }
}

function updateAdminNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    const adminNav = document.createElement('li');
    adminNav.className = 'user-nav';
    
    adminNav.innerHTML = `
        <div class="user-info">
            <div class="user-avatar">A</div>
            <span>Administrateur</span>
        </div>
        <button class="logout-btn" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
        </button>
    `;
    
    const existingUserNav = document.querySelector('.user-nav');
    if (existingUserNav) {
        existingUserNav.remove();
    }
    
    const adminLink = document.querySelector('.admin-btn');
    if (adminLink && adminLink.parentNode) {
        adminLink.parentNode.replaceChild(adminNav, adminLink);
    } else {
        navMenu.appendChild(adminNav);
    }
}

// Déconnexion
function logout() {
    localStorage.removeItem(AUTH_CONFIG.USER_SESSION_KEY);
    localStorage.removeItem(AUTH_CONFIG.ADMIN_SESSION_KEY);
    window.location.href = 'login.html';
}

// Utilitaires utilisateurs
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function saveUser(user) {
    try {
        let users = JSON.parse(localStorage.getItem('weneedapp-users') || '[]');
        const existingUserIndex = users.findIndex(u => u.email === user.email);
        
        if (existingUserIndex !== -1) {
            users[existingUserIndex] = {
                ...users[existingUserIndex],
                ...user,
                lastLogin: new Date().toISOString()
            };
        } else {
            users.push(user);
        }
        
        localStorage.setItem('weneedapp-users', JSON.stringify(users));
        return true;
    } catch (error) {
        console.error('Erreur saveUser:', error);
        return false;
    }
}

function getUser(userId) {
    try {
        const users = JSON.parse(localStorage.getItem('weneedapp-users') || '[]');
        return users.find(u => u.id === userId) || null;
    } catch (error) {
        console.error('Erreur getUser:', error);
        return null;
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const icon = input.nextElementSibling?.querySelector('i');
    if (!icon) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

/********************************************************************
 * GESTION DES SERVICES (ADMIN)
 ********************************************************************/

let selectedImages = [];

function initializeImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('serviceImages');
    const imagePreview = document.getElementById('imagePreview');

    if (!uploadArea || !fileInput || !imagePreview) return;

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleImageSelection(files);
    });

    fileInput.addEventListener('change', function(e) {
        handleImageSelection(e.target.files);
    });

    imagePreview.addEventListener('click', function(e) {
        if (e.target.classList.contains('preview-remove')) {
            const index = parseInt(e.target.dataset.index);
            removeImage(index);
        }
    });
}

function handleImageSelection(files) {
    const maxSize = 2 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    for (let file of files) {
        if (file.size > maxSize) {
            alert(`L'image "${file.name}" est trop volumineuse (max 2MB)`);
            continue;
        }
        
        if (!allowedTypes.includes(file.type)) {
            alert(`Le format de "${file.name}" n'est pas supporté`);
            continue;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImages.push({
                file: file,
                dataUrl: e.target.result,
                name: file.name,
                size: file.size
            });
            updateImagePreview();
        };
        reader.readAsDataURL(file);
    }
    
    document.getElementById('serviceImages').value = '';
}

function updateImagePreview() {
    const imagePreview = document.getElementById('imagePreview');
    if (!imagePreview) return;
    
    imagePreview.innerHTML = '';
    
    selectedImages.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        previewItem.innerHTML = `
            <img src="${image.dataUrl}" alt="Preview" class="preview-image">
            <button type="button" class="preview-remove" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
            <div class="preview-info">
                ${formatFileSize(image.size)}
            </div>
        `;
        
        imagePreview.appendChild(previewItem);
    });
}

function removeImage(index) {
    selectedImages.splice(index, 1);
    updateImagePreview();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function addService(e) {
    e.preventDefault();

    const category = document.getElementById('serviceCategory').value;
    const name = document.getElementById('serviceName').value;
    const region = document.getElementById('serviceRegion').value;
    const department = document.getElementById('serviceDepartment').value;
    const city = document.getElementById('serviceCity').value;
    const address = document.getElementById('serviceAddress').value;
    const price = parseInt(document.getElementById('servicePrice').value) || 0;
    const description = document.getElementById('serviceDescription').value;
    const contact = document.getElementById('serviceContact').value;

    if (!category || !name || !region || !department || !city || !address || !description || !contact) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    if (selectedImages.length === 0) {
        alert('Veuillez sélectionner au moins une image');
        return;
    }

    // Générer les chemins d'images
    const imagePaths = selectedImages.map((image, index) => {
        const extension = image.name.split('.').pop();
        const timestamp = Date.now();
        return `uploads/${category}/${toSlug(name)}-${timestamp}-${index}.${extension}`;
    });

    // Simuler l'upload
    const uploadedImages = JSON.parse(localStorage.getItem('weneedapp-uploaded-images')) || {};
    selectedImages.forEach((image, index) => {
        uploadedImages[imagePaths[index]] = image.dataUrl;
    });
    localStorage.setItem('weneedapp-uploaded-images', JSON.stringify(uploadedImages));

    // Récupérer les aménités
    const amenities = category === 'hotel' ? 
        Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(cb => cb.value) : [];

    const newService = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        category: category,
        name: name,
        region: region,
        department: department,
        city: city,
        address: address,
        price: price,
        description: description,
        contact: contact,
        available: true,
        images: imagePaths,
        amenities: amenities,
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString()
    };

    services.push(newService);
    saveData();

    alert('Service ajouté avec succès!');
    document.getElementById('addServiceForm').reset();
    selectedImages = [];
    updateImagePreview();
}

/********************************************************************
 * AFFICHAGE ET RECHERCHE (PUBLIC)
 ********************************************************************/

function displayResults(servicesList = services) {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (servicesList.length === 0) {
        container.innerHTML = `<div class="no-results"><p>Aucun résultat trouvé.</p></div>`;
        return;
    }

    servicesList.forEach(service => {
        const mainImage = service.images && service.images.length > 0 ? 
            getUploadedImage(service.images[0]) : 
            `images/${service.category}/default-${service.category}.jpg`;

        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-image" style="background-image: url('${mainImage}')">
                <div class="service-badge">${getCategoryIcon(service.category)} ${getCategoryText(service.category)}</div>
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${formatDisplayName(service.city)}, ${formatDisplayName(service.department)}, ${formatDisplayName(service.region)}</p>
                <p class="service-price">${service.price > 0 ? service.price.toLocaleString() + ' FCFA' : 'Gratuit'}</p>
                <p>${service.description}</p>
                <div class="service-actions">
                    <button class="details-btn" onclick="showServiceDetails(${service.id})">Détails</button>
                    <button class="order-btn" onclick="prepareOrder(${service.id})">Commander</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function getUploadedImage(path) {
    const uploadedImages = JSON.parse(localStorage.getItem('weneedapp-uploaded-images')) || {};
    return uploadedImages[path] || `images/default.jpg`;
}

function getCategoryIcon(category) {
    const icons = {
        'hotel': '🏨',
        'agence-voyage': '✈️',
        'engin-lourd': '🏗️',
        'formation': '🎓'
    };
    return icons[category] || '📋';
}

function getCategoryText(category) {
    const texts = {
        'hotel': 'Hôtel',
        'agence-voyage': 'Agence de voyage',
        'engin-lourd': 'Engin lourd',
        'formation': 'Formation'
    };
    return texts[category] || 'Service';
}

function filterServices() {
    const region = document.getElementById('region')?.value || '';
    const department = document.getElementById('departement')?.value || '';
    const city = document.getElementById('ville')?.value || '';
    const category = document.getElementById('service')?.value || '';

    const result = services.filter(s =>
        (!region || s.region === region) &&
        (!department || s.department === department) &&
        (!city || s.city === city) &&
        (!category || s.category === category)
    );

    displayResults(result);
}

/********************************************************************
 * FONCTIONS ADMIN AVANCÉES
 ********************************************************************/

function loadUsersTable() {
    const usersTableBody = document.getElementById('usersTableBody');
    if (!usersTableBody) return;
    
    const users = JSON.parse(localStorage.getItem('weneedapp-users')) || [];
    
    if (users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="6">Aucun utilisateur enregistré</td></tr>';
        return;
    }
    
    usersTableBody.innerHTML = '';
    
    const sortedUsers = [...users].sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
    
    sortedUsers.forEach(user => {
        const row = document.createElement('tr');
        const firstLogin = new Date(user.firstLogin).toLocaleDateString('fr-FR');
        const lastLogin = new Date(user.lastLogin).toLocaleDateString('fr-FR');
        
        row.innerHTML = `
            <td>${user.id.substring(0, 8)}...</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone || 'Non renseigné'}</td>
            <td>${firstLogin}</td>
            <td>${lastLogin}</td>
        `;
        
        usersTableBody.appendChild(row);
    });
}

function initializeAdmin() {
    checkExistingSession();
    
    const adminSession = localStorage.getItem(AUTH_CONFIG.ADMIN_SESSION_KEY);
    if (!adminSession) return;
    
    // Charger les localisations personnalisées
    loadCustomLocations();
    
    updateAdminNavigation();
    initializeLocationSelectsAdmin();
    
    // Initialiser le système de localisations dynamiques
    initializeDynamicLocations();
    
    updateStats();
    
    // Initialiser les onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Configurer la sauvegarde automatique
    setupAutoSave();
    
    // Événements du formulaire
    const addForm = document.getElementById('addServiceForm');
    if (addForm) addForm.addEventListener('submit', addService);
    
    const searchBtn = document.getElementById('searchServiceBtn');
    if (searchBtn) searchBtn.addEventListener('click', searchServicesAdmin);
    
    // Initialiser l'upload d'images
    initializeImageUpload();
    
    loadServicesList();
    loadOrdersTable();
    loadUsersTable();
}

// Fonctions manquantes à implémenter
function updateStats() {
    const totalServices = document.getElementById('totalServices');
    if (totalServices) totalServices.textContent = services.length;
    
    const todayOrders = document.getElementById('todayOrders');
    if (todayOrders) {
        const today = new Date().toDateString();
        const todayCount = orders.filter(order => new Date(order.orderDate).toDateString() === today).length;
        todayOrders.textContent = todayCount;
    }
    
    const totalUsers = document.getElementById('totalUsers');
    if (totalUsers) totalUsers.textContent = users.length;
    
    const regionsCovered = document.getElementById('regionsCovered');
    if (regionsCovered) {
        const regions = new Set(services.map(service => service.region));
        regionsCovered.textContent = regions.size;
    }
}

function switchTab(tabId) {
    // Cacher tous les contenus d'onglets
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Désactiver tous les boutons d'onglets
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
}

function searchServicesAdmin() {
    const searchTerm = document.getElementById('searchService').value.toLowerCase();
    const servicesList = document.getElementById('servicesList');
    
    if (!servicesList) return;
    
    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm)
    );
    
    servicesList.innerHTML = '';
    
    if (filteredServices.length === 0) {
        servicesList.innerHTML = '<p>Aucun service trouvé</p>';
        return;
    }
    
    filteredServices.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>${getCategoryText(service.category)} - ${service.address}</p>
                <p>Prix: ${service.price > 0 ? service.price.toLocaleString() + ' FCFA' : 'Gratuit'}</p>
            </div>
            <div class="service-actions">
                <button class="edit-btn" onclick="editService(${service.id})">Modifier</button>
                <button class="delete-btn" onclick="deleteService(${service.id})">Supprimer</button>
            </div>
        `;
        servicesList.appendChild(serviceItem);
    });
}

function loadServicesList() {
    const servicesList = document.getElementById('servicesList');
    if (!servicesList) return;
    
    servicesList.innerHTML = '';
    
    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>${getCategoryText(service.category)} - ${service.address}</p>
                <p>Prix: ${service.price > 0 ? service.price.toLocaleString() + ' FCFA' : 'Gratuit'}</p>
            </div>
            <div class="service-actions">
                <button class="edit-btn" onclick="editService(${service.id})">Modifier</button>
                <button class="delete-btn" onclick="deleteService(${service.id})">Supprimer</button>
            </div>
        `;
        servicesList.appendChild(serviceItem);
    });
}

function loadOrdersTable() {
    const ordersTableBody = document.querySelector('#ordersTable tbody');
    if (!ordersTableBody) return;
    
    ordersTableBody.innerHTML = '';
    
    if (orders.length === 0) {
        ordersTableBody.innerHTML = '<tr><td colspan="6">Aucune commande</td></tr>';
        return;
    }
    
    const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    sortedOrders.forEach(order => {
        const row = document.createElement('tr');
        const orderDate = new Date(order.orderDate).toLocaleDateString('fr-FR');
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.clientName}<br>${order.clientEmail}</td>
            <td>${order.serviceType}</td>
            <td>${orderDate}</td>
            <td><span class="status-badge status-pending">En attente</span></td>
            <td>
                <button class="edit-btn" onclick="editOrder(${order.id})">Modifier</button>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
}

// Fonctions de gestion des services
function editService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        // Remplir le formulaire avec les données du service
        document.getElementById('serviceCategory').value = service.category;
        document.getElementById('serviceName').value = service.name;
        // ... remplir les autres champs
        
        // Supprimer le service de la liste
        services = services.filter(s => s.id !== serviceId);
        saveData();
        
        // Basculer vers l'onglet d'ajout
        switchTab('ajouter');
        
        alert('Service chargé pour modification');
    }
}

function deleteService(serviceId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service?')) {
        services = services.filter(s => s.id !== serviceId);
        saveData();
        loadServicesList();
        updateStats();
        alert('Service supprimé avec succès!');
    }
}

function editOrder(orderId) {
    const newStatus = prompt('Nouveau statut (pending/confirmed/completed):');
    if (newStatus && ['pending', 'confirmed', 'completed'].includes(newStatus)) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            saveData();
            loadOrdersTable();
            alert('Statut mis à jour!');
        }
    }
}

/********************************************************************
 * FONCTIONS DE NAVIGATION ET DIVERS
 ********************************************************************/

function scrollToElement(elementId) {
    const element = document.getElementById(elementId) || 
                   document.querySelector(`.${elementId}`);
    
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showServiceDetails(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        alert(`Détails de ${service.name}\n${service.description}\nContact: ${service.contact}`);
    }
}

function prepareOrder(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        document.getElementById('serviceType').value = service.category;
        document.getElementById('serviceDetails').value = `Commande pour: ${service.name}\nLocalisation: ${service.address}`;
        document.querySelector('.order-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// Fonction de soumission de commande
function submitOrder(e) {
    e.preventDefault();
    
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const serviceType = document.getElementById('serviceType').value;
    const serviceDetails = document.getElementById('serviceDetails').value;
    
    if (!clientName || !clientEmail || !serviceType || !serviceDetails) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }
    
    const order = {
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        clientName: clientName,
        clientEmail: clientEmail,
        clientPhone: clientPhone,
        serviceType: serviceType,
        serviceDetails: serviceDetails,
        orderDate: new Date().toISOString(),
        status: 'pending'
    };
    
    orders.push(order);
    saveData();
    
    // Afficher la confirmation
    const confirmationSection = document.getElementById('orderConfirmation');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    if (confirmationSection && confirmationMessage) {
        confirmationMessage.textContent = `Merci ${clientName}! Votre commande a été enregistrée.`;
        confirmationSection.classList.remove('hidden');
        confirmationSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Réinitialiser le formulaire
    document.getElementById('orderForm').reset();
    
    alert('Commande soumise avec succès!');
}

function printConfirmation() {
    window.print();
}

function newOrder() {
    const confirmationSection = document.getElementById('orderConfirmation');
    if (confirmationSection) {
        confirmationSection.classList.add('hidden');
    }
    document.getElementById('orderForm').scrollIntoView({ behavior: 'smooth' });
}

/********************************************************************
 * INITIALISATION GLOBALE
 ********************************************************************/

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Application WeneedApp initialisée');
    // Initialiser l'authentification
    initializeAuth();
    
    // Initialiser selon la page
    if (document.querySelector('body').classList.contains('admin-body')) {
        initializeAdmin();
    } else if (!window.location.pathname.includes('login.html')) {
        initializeMainApp();
    }
});

function initializeMainApp() {
    console.log('🏠 Initialisation application principale');
    initializeLocationSelects();
    
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener('click', filterServices);
    
    const orderForm = document.getElementById('orderForm');
    if (orderForm) orderForm.addEventListener('submit', submitOrder);
    
    const printBtn = document.getElementById('printConfirmation');
    if (printBtn) printBtn.addEventListener('click', printConfirmation);
    
    const newOrderBtn = document.getElementById('newOrder');
    if (newOrderBtn) newOrderBtn.addEventListener('click', newOrder);
    
    // Afficher les résultats initiaux
    displayResults(services);
    
    console.log('✅ Application principale initialisée');
}

/********************************************************************
 * GESTION DYNAMIQUE DES LOCALISATIONS (ADMIN)
 ********************************************************************/

function initializeDynamicLocations() {
    const regionSelect = document.getElementById('serviceRegion');
    const deptSelect = document.getElementById('serviceDepartment');
    const citySelect = document.getElementById('serviceCity');

    if (!regionSelect || !deptSelect || !citySelect) return;

    // Ajouter le bouton "Nouvelle région"
    const newRegionBtn = createAddButton('Ajouter une nouvelle région', 'newRegion');
    regionSelect.parentNode.appendChild(newRegionBtn);

    // Ajouter le bouton "Nouveau département"
    const newDeptBtn = createAddButton('Ajouter un nouveau département', 'newDepartment');
    deptSelect.parentNode.appendChild(newDeptBtn);

    // Ajouter le bouton "Nouvelle ville"
    const newCityBtn = createAddButton('Ajouter une nouvelle ville', 'newCity');
    citySelect.parentNode.appendChild(newCityBtn);

    // Événements
    newRegionBtn.addEventListener('click', () => showAddLocationModal('region'));
    newDeptBtn.addEventListener('click', () => showAddLocationModal('department'));
    newCityBtn.addEventListener('click', () => showAddLocationModal('city'));
}

function createAddButton(text, type) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `add-location-btn ${type}-btn`;
    button.innerHTML = `<i class="fas fa-plus-circle"></i> ${text}`;
    return button;
}

function showAddLocationModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';

    let title = '';
    let fields = '';

    switch (type) {
        case 'region':
            title = 'Ajouter une nouvelle région';
            fields = `
                <div class="form-group">
                    <label for="newRegionName">Nom de la région:</label>
                    <input type="text" id="newRegionName" placeholder="Ex: Nouvelle Région" required>
                </div>
            `;
            break;

        case 'department':
            const regionSelect = document.getElementById('serviceRegion');
            if (!regionSelect.value) {
                alert('Veuillez d\'abord sélectionner une région');
                return;
            }
            
            title = 'Ajouter un nouveau département';
            fields = `
                <div class="form-group">
                    <label>Région parente:</label>
                    <input type="text" value="${formatDisplayName(regionSelect.options[regionSelect.selectedIndex].text)}" disabled>
                    <input type="hidden" id="parentRegion" value="${regionSelect.value}">
                </div>
                <div class="form-group">
                    <label for="newDepartmentName">Nom du département:</label>
                    <input type="text" id="newDepartmentName" placeholder="Ex: Nouveau Département" required>
                </div>
            `;
            break;

        case 'city':
            const deptSelect = document.getElementById('serviceDepartment');
            if (!deptSelect.value) {
                alert('Veuillez d\'abord sélectionner un département');
                return;
            }

            title = 'Ajouter une nouvelle ville';
            fields = `
                <div class="form-group">
                    <label>Département parent:</label>
                    <input type="text" value="${formatDisplayName(deptSelect.options[deptSelect.selectedIndex].text)}" disabled>
                    <input type="hidden" id="parentDepartment" value="${deptSelect.value}">
                    <input type="hidden" id="parentRegionForCity" value="${document.getElementById('serviceRegion').value}">
                </div>
                <div class="form-group">
                    <label for="newCityName">Nom de la ville:</label>
                    <input type="text" id="newCityName" placeholder="Ex: Nouvelle Ville" required>
                </div>
            `;
            break;
    }

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <form id="addLocationForm">
                    ${fields}
                    <div class="modal-actions">
                        <button type="button" class="btn-cancel" onclick="closeModal(this)">Annuler</button>
                        <button type="submit" class="btn-confirm">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Événement du formulaire
    const form = modal.querySelector('#addLocationForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddLocation(type, form);
    });

    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

function handleAddLocation(type, form) {
    switch (type) {
        case 'region':
            addNewRegion(form);
            break;
        case 'department':
            addNewDepartment(form);
            break;
        case 'city':
            addNewCity(form);
            break;
    }
}

function addNewRegion(form) {
    const regionName = form.querySelector('#newRegionName').value.trim();
    
    if (!regionName) {
        alert('Veuillez entrer un nom de région');
        return;
    }

    const regionSlug = toSlug(regionName);
    
    // Vérifier si la région existe déjà
    if (cameroonLocations[regionSlug]) {
        alert('Cette région existe déjà');
        return;
    }

    // Ajouter la nouvelle région
    cameroonLocations[regionSlug] = {
        name: regionName,
        departments: {}
    };

    // Mettre à jour le select
    updateRegionSelect(regionSlug, regionName);
    
    alert(`Région "${regionName}" ajoutée avec succès!`);
    closeModal(form.closest('.modal-overlay'));
}

function addNewDepartment(form) {
    const deptName = form.querySelector('#newDepartmentName').value.trim();
    const parentRegion = form.querySelector('#parentRegion').value;
    
    if (!deptName) {
        alert('Veuillez entrer un nom de département');
        return;
    }

    const deptSlug = toSlug(deptName);
    
    // Vérifier si le département existe déjà
    if (cameroonLocations[parentRegion]?.departments[deptSlug]) {
        alert('Ce département existe déjà dans cette région');
        return;
    }

    // Ajouter le nouveau département
    cameroonLocations[parentRegion].departments[deptSlug] = {
        name: deptName,
        cities: []
    };

    // Mettre à jour le select
    updateDepartmentSelect(parentRegion, deptSlug, deptName);
    
    alert(`Département "${deptName}" ajouté avec succès dans ${formatDisplayName(parentRegion)}!`);
    closeModal(form.closest('.modal-overlay'));
}

function addNewCity(form) {
    const cityName = form.querySelector('#newCityName').value.trim();
    const parentRegion = form.querySelector('#parentRegionForCity').value;
    const parentDepartment = form.querySelector('#parentDepartment').value;
    
    if (!cityName) {
        alert('Veuillez entrer un nom de ville');
        return;
    }

    const citySlug = toSlug(cityName);
    
    // Vérifier si la ville existe déjà
    const cities = cameroonLocations[parentRegion]?.departments[parentDepartment]?.cities || [];
    if (cities.includes(cityName)) {
        alert('Cette ville existe déjà dans ce département');
        return;
    }

    // Ajouter la nouvelle ville
    cameroonLocations[parentRegion].departments[parentDepartment].cities.push(cityName);

    // Mettre à jour le select
    updateCitySelect(parentRegion, parentDepartment, citySlug, cityName);
    
    alert(`Ville "${cityName}" ajoutée avec succès!`);
    closeModal(form.closest('.modal-overlay'));
}

function updateRegionSelect(regionSlug, regionName) {
    const regionSelect = document.getElementById('serviceRegion');
    const option = document.createElement('option');
    option.value = regionSlug;
    option.textContent = regionName;
    regionSelect.appendChild(option);
    regionSelect.value = regionSlug;
    
    // Déclencher l'événement change pour mettre à jour les départements
    regionSelect.dispatchEvent(new Event('change'));
}

function updateDepartmentSelect(regionSlug, deptSlug, deptName) {
    const deptSelect = document.getElementById('serviceDepartment');
    const option = document.createElement('option');
    option.value = deptSlug;
    option.textContent = deptName;
    deptSelect.appendChild(option);
    deptSelect.value = deptSlug;
    
    // Déclencher l'événement change pour mettre à jour les villes
    deptSelect.dispatchEvent(new Event('change'));
}

function updateCitySelect(regionSlug, deptSlug, citySlug, cityName) {
    const citySelect = document.getElementById('serviceCity');
    const option = document.createElement('option');
    option.value = citySlug;
    option.textContent = cityName;
    citySelect.appendChild(option);
    citySelect.value = citySlug;
}

function closeModal(element) {
    const modal = element.closest ? element.closest('.modal-overlay') : element;
    if (modal) {
        modal.remove();
    }
}

// Sauvegarder les localisations modifiées
function saveLocations() {
    localStorage.setItem('weneedapp-custom-locations', JSON.stringify(cameroonLocations));
}

// Charger les localisations personnalisées
function loadCustomLocations() {
    const customLocations = localStorage.getItem('weneedapp-custom-locations');
    if (customLocations) {
        const parsed = JSON.parse(customLocations);
        Object.keys(parsed).forEach(key => {
            cameroonLocations[key] = parsed[key];
        });
    }
}

// Sauvegarde automatique des localisations
function setupAutoSave() {
    window.addEventListener('beforeunload', saveLocations);
    setInterval(saveLocations, 30000);
}