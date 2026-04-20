// Get the username from localStorage
const loggedInUsername = localStorage.getItem('loggedInUsername');

// Display the username in the welcome message
const welcomeHeading = document.querySelector('.hero-card h1');
if (welcomeHeading && loggedInUsername) {
    welcomeHeading.textContent = `Hello, ${loggedInUsername}`;
}

// Handle logout
const logoutButton = document.querySelector('.logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUsername');
        window.location.href = '../../signin.html';
    });
}

// Optional: Redirect to login if no user is logged in
if (!loggedInUsername) {
    window.location.href = '../../signin.html';
}

// Sidebar collapse/expand functionality
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapse-btn');
const expandBtn = document.getElementById('expand-btn');

// Load sidebar state from localStorage on page load
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
        
        // Add animation to nav items only
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.add('animate__animated', 'animate__fadeIn');
            
            // Remove animation classes after animation completes
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

// ========== REPORTS FUNCTIONALITY ==========

// Report data based on time period
const reportData = {
    today: {
        pcsUsedToday: 18,
        pcsUsedWeek: 23,
        pcsUsedMonth: 25,
        loginsToday: 42,
        avgSessionLength: '2.3 hrs',
        peakHours: '10 AM - 2 PM',
    },
    week: {
        pcsUsedToday: 23,
        pcsUsedWeek: 23,
        pcsUsedMonth: 25,
        loginsToday: 234,
        avgSessionLength: '2.1 hrs',
        peakHours: '9 AM - 3 PM',
    },
    month: {
        pcsUsedToday: 25,
        pcsUsedWeek: 25,
        pcsUsedMonth: 25,
        loginsToday: 892,
        avgSessionLength: '2.0 hrs',
        peakHours: '9 AM - 5 PM',
    }
};

// Update reports based on selected time filter
function updateReports(period) {
    const data = reportData[period];
    
    // Update Lab Activity Reports
    document.getElementById('pcsUsedToday').textContent = data.pcsUsedToday;
    document.getElementById('pcsUsedWeek').textContent = data.pcsUsedWeek;
    document.getElementById('pcsUsedMonth').textContent = data.pcsUsedMonth;
    document.getElementById('loginsToday').textContent = data.loginsToday;
    document.getElementById('avgSessionLength').textContent = data.avgSessionLength;
    document.getElementById('peakHours').textContent = data.peakHours;
    
    // Animate value changes
    animateValueChanges();
}

function animateValueChanges() {
    const values = document.querySelectorAll('.metric-value');
    values.forEach(value => {
        value.style.opacity = '0.5';
        setTimeout(() => {
            value.style.opacity = '1';
        }, 100);
    });
}

// Time filter event listener
const timeFilter = document.getElementById('timeFilter');
if (timeFilter) {
    timeFilter.addEventListener('change', (e) => {
        updateReports(e.target.value);
    });
}

// Date/Time update
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

// Initialize reports on page load
window.addEventListener('load', () => {
    updateReports('week');
});
