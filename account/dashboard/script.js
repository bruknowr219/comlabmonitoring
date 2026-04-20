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
        window.location.href = '../signin.html';
    });
}

// Optional: Redirect to login if no user is logged in
if (!loggedInUsername) {
    window.location.href = '../signin.html';
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
