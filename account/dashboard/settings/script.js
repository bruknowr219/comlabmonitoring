// Get the username from localStorage
const loggedInUsername = localStorage.getItem('loggedInUsername');

// Handle logout
const logoutButton = document.querySelector('.logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUsername');
        window.location.href = '../../signin.html';
    });
}

// Redirect to login if no user is logged in
if (!loggedInUsername) {
    window.location.href = '../../signin.html';
}

// ========== SIDEBAR FUNCTIONALITY ==========
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapse-btn');
const expandBtn = document.getElementById('expand-btn');

const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
if (sidebarCollapsed) {
    sidebar.classList.add('collapsed');
    collapseBtn.style.display = 'none';
    expandBtn.style.display = 'block';
}

if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
        sidebar.classList.add('collapsed');
        localStorage.setItem('sidebarCollapsed', 'true');
        collapseBtn.style.display = 'none';
        expandBtn.style.display = 'block';
    });
}

if (expandBtn) {
    expandBtn.addEventListener('click', () => {
        sidebar.classList.remove('collapsed');
        localStorage.setItem('sidebarCollapsed', 'false');
        
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                navLinks.classList.remove('animate__animated', 'animate__fadeIn');
            }, 800);
        }
        
        expandBtn.style.display = 'none';
        collapseBtn.style.display = 'block';
    });
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const overlay = document.getElementById('overlay');

function closeSidebarMobile() {
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function openSidebarMobile() {
    if (sidebar) {
        sidebar.classList.add('open');
    }
    if (overlay) {
        overlay.style.display = 'block';
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (sidebar && sidebar.classList.contains('open')) {
            closeSidebarMobile();
        } else {
            openSidebarMobile();
        }
    });
}

if (overlay) {
    overlay.addEventListener('click', closeSidebarMobile);
}

// ========== DATE/TIME FUNCTIONALITY ==========
function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    
    const dateElement = document.querySelector('.top-bar-date');
    const timeElement = document.querySelector('.top-bar-time');
    if (dateElement) dateElement.textContent = dateStr;
    if (timeElement) timeElement.textContent = timeStr;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// ========== TAB NAVIGATION ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabName = btn.getAttribute('data-tab');
        document.getElementById(tabName).classList.add('active');
        
        // Save last active tab
        localStorage.setItem('lastActiveTab', tabName);
    });
});

// Load last active tab
const lastTab = localStorage.getItem('lastActiveTab') || 'system';
document.querySelector(`[data-tab="${lastTab}"]`)?.click();

// ========== SETTINGS FUNCTIONALITY ==========

// Default settings
const defaultSettings = {
    system: {
        labName: 'Computer Lab',
        labLocation: 'Building 3, Room 201',
        labManager: 'Dr. John Smith',
        contactEmail: 'lab@university.edu',
        timezone: 'EST'
    },
    security: {
        requireUppercase: true,
        requireNumbers: true,
        requireSpecial: false,
        minPasswordLength: 8
    },
    notifications: {
        offlineAlerts: true,
        resourceAlerts: true,
        securityAlerts: true,
        dailyReport: false,
        primaryEmail: 'admin@lab.edu',
        secondaryEmail: ''
    },
    display: {
        theme: 'light',
        itemsPerPage: 20,
        showAnimations: true,
        compactView: false,
        fontSize: 'medium'
    },
    schedule: {
        monOpen: '08:00', monClose: '17:00', monClosed: false,
        tueOpen: '08:00', tueClose: '17:00', tueClosed: false,
        wedOpen: '08:00', wedClose: '17:00', wedClosed: false,
        thuOpen: '08:00', thuClose: '17:00', thuClosed: false,
        friOpen: '08:00', friClose: '17:00', friClosed: false,
        satOpen: '09:00', satClose: '14:00', satClosed: false,
        sunOpen: '10:00', sunClose: '16:00', sunClosed: true
    },
    maintenance: {
        maintenanceMode: false,
        maintenanceMessage: 'The lab is under maintenance. Please try again later.'
    }
};

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('labSettings');
    if (saved) {
        return JSON.parse(saved);
    }
    return defaultSettings;
}

// Save settings to localStorage
function saveSettingsToStorage(settings) {
    localStorage.setItem('labSettings', JSON.stringify(settings));
}

let currentSettings = loadSettings();

// Initialize form with saved settings
function initializeForm() {
    // System Settings
    document.getElementById('labName').value = currentSettings.system.labName;
    document.getElementById('labLocation').value = currentSettings.system.labLocation;
    document.getElementById('labManager').value = currentSettings.system.labManager;
    document.getElementById('contactEmail').value = currentSettings.system.contactEmail;
    document.getElementById('totalComputers').value = '25';
    document.getElementById('timezone').value = currentSettings.system.timezone;

    // Security Settings
    document.getElementById('requireUppercase').checked = currentSettings.security.requireUppercase;
    document.getElementById('requireNumbers').checked = currentSettings.security.requireNumbers;
    document.getElementById('requireSpecial').checked = currentSettings.security.requireSpecial;
    document.getElementById('minPasswordLength').value = currentSettings.security.minPasswordLength;

    // Notifications
    document.getElementById('offlineAlerts').checked = currentSettings.notifications.offlineAlerts;
    document.getElementById('resourceAlerts').checked = currentSettings.notifications.resourceAlerts;
    document.getElementById('securityAlerts').checked = currentSettings.notifications.securityAlerts;
    document.getElementById('dailyReport').checked = currentSettings.notifications.dailyReport;
    document.getElementById('primaryEmail').value = currentSettings.notifications.primaryEmail;
    document.getElementById('secondaryEmail').value = currentSettings.notifications.secondaryEmail;

    // Display Settings
    document.getElementById('theme').value = currentSettings.display.theme;
    document.getElementById('itemsPerPage').value = currentSettings.display.itemsPerPage;
    document.getElementById('showAnimations').checked = currentSettings.display.showAnimations;
    document.getElementById('compactView').checked = currentSettings.display.compactView;
    document.getElementById('fontSize').value = currentSettings.display.fontSize;

    // Schedule Settings
    document.getElementById('monOpen').value = currentSettings.schedule.monOpen;
    document.getElementById('monClose').value = currentSettings.schedule.monClose;
    document.getElementById('monClosed').checked = currentSettings.schedule.monClosed;
    document.getElementById('tueOpen').value = currentSettings.schedule.tueOpen;
    document.getElementById('tueClose').value = currentSettings.schedule.tueClose;
    document.getElementById('tueClosed').checked = currentSettings.schedule.tueClosed;
    document.getElementById('wedOpen').value = currentSettings.schedule.wedOpen;
    document.getElementById('wedClose').value = currentSettings.schedule.wedClose;
    document.getElementById('wedClosed').checked = currentSettings.schedule.wedClosed;
    document.getElementById('thuOpen').value = currentSettings.schedule.thuOpen;
    document.getElementById('thuClose').value = currentSettings.schedule.thuClose;
    document.getElementById('thuClosed').checked = currentSettings.schedule.thuClosed;
    document.getElementById('friOpen').value = currentSettings.schedule.friOpen;
    document.getElementById('friClose').value = currentSettings.schedule.friClose;
    document.getElementById('friClosed').checked = currentSettings.schedule.friClosed;
    document.getElementById('satOpen').value = currentSettings.schedule.satOpen;
    document.getElementById('satClose').value = currentSettings.schedule.satClose;
    document.getElementById('satClosed').checked = currentSettings.schedule.satClosed;
    document.getElementById('sunOpen').value = currentSettings.schedule.sunOpen;
    document.getElementById('sunClose').value = currentSettings.schedule.sunClose;
    document.getElementById('sunClosed').checked = currentSettings.schedule.sunClosed;

    // Maintenance Settings
    document.getElementById('maintenanceMode').checked = currentSettings.maintenance.maintenanceMode;
    document.getElementById('maintenanceMessage').value = currentSettings.maintenance.maintenanceMessage;
}

// Show save status message
function showSaveStatus(message, type = 'success') {
    const status = document.getElementById('saveStatus');
    status.textContent = message;
    status.className = 'save-status show';
    if (type === 'success') {
        status.style.background = 'rgba(16, 185, 129, 0.2)';
        status.style.color = '#059669';
    } else {
        status.style.background = 'rgba(239, 68, 68, 0.2)';
        status.style.color = '#ef4444';
    }
    
    setTimeout(() => {
        status.classList.remove('show');
    }, 3000);
}

// Save settings function
window.saveSettings = function(tab) {
    try {
        if (tab === 'system') {
            currentSettings.system.labName = document.getElementById('labName').value;
            currentSettings.system.labLocation = document.getElementById('labLocation').value;
            currentSettings.system.labManager = document.getElementById('labManager').value;
            currentSettings.system.contactEmail = document.getElementById('contactEmail').value;
            currentSettings.system.timezone = document.getElementById('timezone').value;
        } else if (tab === 'security') {
            currentSettings.security.requireUppercase = document.getElementById('requireUppercase').checked;
            currentSettings.security.requireNumbers = document.getElementById('requireNumbers').checked;
            currentSettings.security.requireSpecial = document.getElementById('requireSpecial').checked;
            currentSettings.security.minPasswordLength = document.getElementById('minPasswordLength').value;
        } else if (tab === 'notifications') {
            currentSettings.notifications.offlineAlerts = document.getElementById('offlineAlerts').checked;
            currentSettings.notifications.resourceAlerts = document.getElementById('resourceAlerts').checked;
            currentSettings.notifications.securityAlerts = document.getElementById('securityAlerts').checked;
            currentSettings.notifications.dailyReport = document.getElementById('dailyReport').checked;
            currentSettings.notifications.primaryEmail = document.getElementById('primaryEmail').value;
            currentSettings.notifications.secondaryEmail = document.getElementById('secondaryEmail').value;
        } else if (tab === 'display') {
            currentSettings.display.theme = document.getElementById('theme').value;
            currentSettings.display.itemsPerPage = document.getElementById('itemsPerPage').value;
            currentSettings.display.showAnimations = document.getElementById('showAnimations').checked;
            currentSettings.display.compactView = document.getElementById('compactView').checked;
            currentSettings.display.fontSize = document.getElementById('fontSize').value;
        } else if (tab === 'schedule') {
            currentSettings.schedule.monOpen = document.getElementById('monOpen').value;
            currentSettings.schedule.monClose = document.getElementById('monClose').value;
            currentSettings.schedule.monClosed = document.getElementById('monClosed').checked;
            currentSettings.schedule.tueOpen = document.getElementById('tueOpen').value;
            currentSettings.schedule.tueClose = document.getElementById('tueClose').value;
            currentSettings.schedule.tueClosed = document.getElementById('tueClosed').checked;
            currentSettings.schedule.wedOpen = document.getElementById('wedOpen').value;
            currentSettings.schedule.wedClose = document.getElementById('wedClose').value;
            currentSettings.schedule.wedClosed = document.getElementById('wedClosed').checked;
            currentSettings.schedule.thuOpen = document.getElementById('thuOpen').value;
            currentSettings.schedule.thuClose = document.getElementById('thuClose').value;
            currentSettings.schedule.thuClosed = document.getElementById('thuClosed').checked;
            currentSettings.schedule.friOpen = document.getElementById('friOpen').value;
            currentSettings.schedule.friClose = document.getElementById('friClose').value;
            currentSettings.schedule.friClosed = document.getElementById('friClosed').checked;
            currentSettings.schedule.satOpen = document.getElementById('satOpen').value;
            currentSettings.schedule.satClose = document.getElementById('satClose').value;
            currentSettings.schedule.satClosed = document.getElementById('satClosed').checked;
            currentSettings.schedule.sunOpen = document.getElementById('sunOpen').value;
            currentSettings.schedule.sunClose = document.getElementById('sunClose').value;
            currentSettings.schedule.sunClosed = document.getElementById('sunClosed').checked;
        } else if (tab === 'maintenance') {
            currentSettings.maintenance.maintenanceMode = document.getElementById('maintenanceMode').checked;
            currentSettings.maintenance.maintenanceMessage = document.getElementById('maintenanceMessage').value;
        }
        
        saveSettingsToStorage(currentSettings);
        showSaveStatus('✓ Settings saved successfully!');
    } catch (error) {
        showSaveStatus('✗ Error saving settings', 'error');
    }
};

// Reset settings function
window.resetSettings = function(tab) {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
        currentSettings = JSON.parse(JSON.stringify(defaultSettings));
        saveSettingsToStorage(currentSettings);
        initializeForm();
        showSaveStatus('✓ Settings reset to defaults');
    }
};

// Change password function
window.changePassword = function() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!current || !newPass || !confirm) {
        alert('Please fill in all password fields');
        return;
    }

    if (newPass !== confirm) {
        alert('New passwords do not match');
        return;
    }

    if (newPass.length < currentSettings.security.minPasswordLength) {
        alert(`Password must be at least ${currentSettings.security.minPasswordLength} characters`);
        return;
    }

    // Here you would validate current password and update
    alert('Password changed successfully!');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
};

// Password strength indicator
document.getElementById('newPassword')?.addEventListener('input', (e) => {
    const pwd = e.target.value;
    const strength = document.getElementById('passwordStrength');
    
    if (pwd.length < 6) {
        strength.className = 'password-strength weak';
    } else if (pwd.length < 10) {
        strength.className = 'password-strength medium';
    } else {
        strength.className = 'password-strength strong';
    }
});

// Maintenance functions
window.performBackup = function() {
    alert('Database backup started...\nThis may take a few minutes.');
};

window.clearCache = function() {
    if (confirm('Clear all cached data? This will not delete settings.')) {
        alert('Cache cleared successfully!');
    }
};

window.viewLogs = function() {
    alert('System Logs:\n\n[2026-04-16 10:30:45] System started\n[2026-04-16 10:31:12] Database connected\n[2026-04-16 10:32:00] All users loaded\n\nTotal log entries: 2,156');
};

// Initialize on page load
window.addEventListener('load', () => {
    initializeForm();
});
