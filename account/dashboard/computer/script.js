
const loggedInUsername = localStorage.getItem('loggedInUsername');


const welcomeHeading = document.querySelector('.hero-card h1');
if (welcomeHeading && loggedInUsername) {
    welcomeHeading.textContent = `Hello, ${loggedInUsername}`;
}


const logoutButton = document.querySelector('.logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUsername');
        window.location.href = '../../signin.html';
    });
}

if (!loggedInUsername) {
    window.location.href = '../signin.html';
}


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


function getComputersData() {
    const stored = localStorage.getItem('computersData');
    const defaultData = [
        { id: 1, name: 'PC-01', assignedUser: 'John Doe', remainingTime: 8, cpuUsage: 35, ramUsage: 48, isOnline: true, ipAddress: '192.168.1.10', macAddress: '00:1A:2B:3C:4D:5E', os: 'Windows 10', lastLogin: '2026-04-16 09:30', storageUsage: 65 },
        { id: 2, name: 'PC-02', assignedUser: 'Jane Smith', remainingTime: 6, cpuUsage: 62, ramUsage: 71, isOnline: true, ipAddress: '192.168.1.11', macAddress: '00:1A:2B:3C:4D:5F', os: 'Windows 11', lastLogin: '2026-04-16 08:45', storageUsage: 72 },
        { id: 3, name: 'PC-03', assignedUser: 'Mike Johnson', remainingTime: 3, cpuUsage: 45, ramUsage: 55, isOnline: true, ipAddress: '192.168.1.12', macAddress: '00:1A:2B:3C:4D:60', os: 'Windows 10', lastLogin: '2026-04-16 07:20', storageUsage: 58 },
        { id: 4, name: 'PC-04', assignedUser: 'Sarah Williams', remainingTime: 5, cpuUsage: 28, ramUsage: 42, isOnline: true, ipAddress: '192.168.1.13', macAddress: '00:1A:2B:3C:4D:61', os: 'Windows 11', lastLogin: '2026-04-16 09:15', storageUsage: 48 },
        { id: 5, name: 'PC-05', assignedUser: 'David Brown', remainingTime: 0, cpuUsage: 0, ramUsage: 0, isOnline: false, ipAddress: '192.168.1.14', macAddress: '00:1A:2B:3C:4D:62', os: 'Windows 10', lastLogin: '2026-04-15 16:30', storageUsage: 55 },
        { id: 6, name: 'PC-06', assignedUser: 'Emma Davis', remainingTime: 7, cpuUsage: 71, ramUsage: 85, isOnline: true, ipAddress: '192.168.1.15', macAddress: '00:1A:2B:3C:4D:63', os: 'Windows 11', lastLogin: '2026-04-16 10:05', storageUsage: 81 },
        { id: 7, name: 'PC-07', assignedUser: 'Robert Wilson', remainingTime: 4, cpuUsage: 52, ramUsage: 64, isOnline: true, ipAddress: '192.168.1.16', macAddress: '00:1A:2B:3C:4D:64', os: 'Windows 10', lastLogin: '2026-04-16 08:20', storageUsage: 62 },
        { id: 8, name: 'PC-08', assignedUser: 'Lisa Anderson', remainingTime: 8, cpuUsage: 38, ramUsage: 51, isOnline: true, ipAddress: '192.168.1.17', macAddress: '00:1A:2B:3C:4D:65', os: 'Windows 11', lastLogin: '2026-04-16 09:00', storageUsage: 69 },
        { id: 9, name: 'PC-09', assignedUser: 'James Taylor', remainingTime: 2, cpuUsage: 78, ramUsage: 82, isOnline: true, ipAddress: '192.168.1.18', macAddress: '00:1A:2B:3C:4D:66', os: 'Windows 10', lastLogin: '2026-04-16 10:30', storageUsage: 85 },
        { id: 10, name: 'PC-10', assignedUser: 'Maria Garcia', remainingTime: 6, cpuUsage: 41, ramUsage: 58, isOnline: true, ipAddress: '192.168.1.19', macAddress: '00:1A:2B:3C:4D:67', os: 'Windows 11', lastLogin: '2026-04-16 07:50', storageUsage: 71 },
        { id: 11, name: 'PC-11', assignedUser: 'Charles Martinez', remainingTime: 5, cpuUsage: 65, ramUsage: 73, isOnline: true, ipAddress: '192.168.1.20', macAddress: '00:1A:2B:3C:4D:68', os: 'Windows 10', lastLogin: '2026-04-16 08:35', storageUsage: 76 },
        { id: 12, name: 'PC-12', assignedUser: 'Patricia Lee', remainingTime: 0, cpuUsage: 0, ramUsage: 0, isOnline: false, ipAddress: '192.168.1.21', macAddress: '00:1A:2B:3C:4D:69', os: 'Windows 11', lastLogin: '2026-04-15 15:45', storageUsage: 52 },
        { id: 13, name: 'PC-13', assignedUser: 'Michael White', remainingTime: 7, cpuUsage: 33, ramUsage: 47, isOnline: true, ipAddress: '192.168.1.22', macAddress: '00:1A:2B:3C:4D:6A', os: 'Windows 10', lastLogin: '2026-04-16 09:45', storageUsage: 66 },
        { id: 14, name: 'PC-14', assignedUser: 'Jennifer Harris', remainingTime: 3, cpuUsage: 56, ramUsage: 68, isOnline: true, ipAddress: '192.168.1.23', macAddress: '00:1A:2B:3C:4D:6B', os: 'Windows 11', lastLogin: '2026-04-16 08:10', storageUsage: 73 },
        { id: 15, name: 'PC-15', assignedUser: 'Daniel Martin', remainingTime: 8, cpuUsage: 42, ramUsage: 53, isOnline: true, ipAddress: '192.168.1.24', macAddress: '00:1A:2B:3C:4D:6C', os: 'Windows 10', lastLogin: '2026-04-16 10:15', storageUsage: 59 },
        { id: 16, name: 'PC-16', assignedUser: 'Nancy Clark', remainingTime: 4, cpuUsage: 67, ramUsage: 79, isOnline: true, ipAddress: '192.168.1.25', macAddress: '00:1A:2B:3C:4D:6D', os: 'Windows 11', lastLogin: '2026-04-16 07:30', storageUsage: 82 },
        { id: 17, name: 'PC-17', assignedUser: 'Christopher Rodriguez', remainingTime: 6, cpuUsage: 39, ramUsage: 49, isOnline: true, ipAddress: '192.168.1.26', macAddress: '00:1A:2B:3C:4D:6E', os: 'Windows 10', lastLogin: '2026-04-16 09:20', storageUsage: 61 },
        { id: 18, name: 'PC-18', assignedUser: 'Linda Lewis', remainingTime: 5, cpuUsage: 71, ramUsage: 84, isOnline: true, ipAddress: '192.168.1.27', macAddress: '00:1A:2B:3C:4D:6F', os: 'Windows 11', lastLogin: '2026-04-16 08:55', storageUsage: 79 },
        { id: 19, name: 'PC-19', assignedUser: 'Mark Walker', remainingTime: 0, cpuUsage: 0, ramUsage: 0, isOnline: false, ipAddress: '192.168.1.28', macAddress: '00:1A:2B:3C:4D:70', os: 'Windows 10', lastLogin: '2026-04-15 14:20', storageUsage: 54 },
        { id: 20, name: 'PC-20', assignedUser: 'Barbara Hall', remainingTime: 7, cpuUsage: 45, ramUsage: 62, isOnline: true, ipAddress: '192.168.1.29', macAddress: '00:1A:2B:3C:4D:71', os: 'Windows 11', lastLogin: '2026-04-16 10:00', storageUsage: 68 },
        { id: 21, name: 'PC-21', assignedUser: 'Steven Allen', remainingTime: 8, cpuUsage: 54, ramUsage: 66, isOnline: true, ipAddress: '192.168.1.30', macAddress: '00:1A:2B:3C:4D:72', os: 'Windows 10', lastLogin: '2026-04-16 08:25', storageUsage: 70 },
        { id: 22, name: 'PC-22', assignedUser: 'Karen Young', remainingTime: 3, cpuUsage: 59, ramUsage: 75, isOnline: true, ipAddress: '192.168.1.31', macAddress: '00:1A:2B:3C:4D:73', os: 'Windows 11', lastLogin: '2026-04-16 09:35', storageUsage: 74 },
        { id: 23, name: 'PC-23', assignedUser: 'Andrew King', remainingTime: 6, cpuUsage: 36, ramUsage: 44, isOnline: true, ipAddress: '192.168.1.32', macAddress: '00:1A:2B:3C:4D:74', os: 'Windows 10', lastLogin: '2026-04-16 07:40', storageUsage: 57 },
        { id: 24, name: 'PC-24', assignedUser: 'Jessica Wright', remainingTime: 4, cpuUsage: 68, ramUsage: 81, isOnline: true, ipAddress: '192.168.1.33', macAddress: '00:1A:2B:3C:4D:75', os: 'Windows 11', lastLogin: '2026-04-16 10:10', storageUsage: 83 },
        { id: 25, name: 'PC-25', assignedUser: 'Paul Scott', remainingTime: 5, cpuUsage: 48, ramUsage: 59, isOnline: true, ipAddress: '192.168.1.34', macAddress: '00:1A:2B:3C:4D:76', os: 'Windows 10', lastLogin: '2026-04-16 08:40', storageUsage: 64 },
    ];
    
    // If stored data exists and has all 25 computers, use it. Otherwise use default data
    if (stored) {
        try {
            const parsedData = JSON.parse(stored);
            if (parsedData.length === 25) {
                return parsedData;
            }
        } catch (e) {
            console.log('localStorage data corrupted, using default');
        }
    }
    
    // Save default data to localStorage for future edits
    localStorage.setItem('computersData', JSON.stringify(defaultData));
    return defaultData;
}

function saveComputersData(data) {
    localStorage.setItem('computersData', JSON.stringify(data));
}

function renderComputers() {
    const computersData = getComputersData();
    const computersGrid = document.getElementById('computersGrid');
    
    if (!computersGrid) return;
    
    computersGrid.innerHTML = '';
    
    computersData.forEach(computer => {
        const computerCard = createComputerCard(computer);
        computersGrid.appendChild(computerCard);
    });
}

function createComputerCard(computer) {
    const card = document.createElement('div');
    card.className = 'computer-card';
    
    const statusClass = computer.isOnline ? 'status-online' : 'status-offline';
    const statusText = computer.isOnline ? 'Online' : 'Offline';
    
    card.innerHTML = `
        <div class="computer-header">
            <i class="bi bi-pc-display-horizontal computer-icon"></i>
            <span class="computer-name">${computer.name}</span>
            <span class="computer-status ${statusClass}">${statusText}</span>
        </div>
        
        <div class="computer-details">
            <div class="detail-row">
                <label class="detail-label">Assigned User</label>
                <input type="text" class="editable-input user-input" value="${computer.assignedUser}" data-computer-id="${computer.id}" placeholder="Enter username">
            </div>
            
            <div class="detail-row">
                <label class="detail-label">Remaining Time (Hours)</label>
                <input type="number" class="editable-input time-input" value="${computer.remainingTime}" data-computer-id="${computer.id}" min="0" max="24" placeholder="Enter hours">
            </div>
            
            <div class="detail-row two-column">
                <div>
                    <label class="detail-label">Operating System</label>
                    <div class="detail-value">${computer.os}</div>
                </div>
                <div>
                    <label class="detail-label">Last Login</label>
                    <div class="detail-value">${computer.lastLogin}</div>
                </div>
            </div>
            
            <div class="detail-row two-column">
                <div>
                    <label class="detail-label">IP Address</label>
                    <div class="detail-value mono">${computer.ipAddress}</div>
                </div>
                <div>
                    <label class="detail-label">MAC Address</label>
                    <div class="detail-value mono">${computer.macAddress}</div>
                </div>
            </div>
            
            <div class="detail-row">
                <label class="detail-label">CPU / RAM Usage</label>
                <div>
                    <div style="margin-bottom: 8px;">
                        <span style="font-size: 12px; color: #6b7280;">CPU: ${computer.cpuUsage}%</span>
                        <div class="usage-bar">
                            <div class="usage-fill" style="width: ${computer.cpuUsage}%"></div>
                        </div>
                    </div>
                    <div>
                        <span style="font-size: 12px; color: #6b7280;">RAM: ${computer.ramUsage}%</span>
                        <div class="usage-bar">
                            <div class="usage-fill" style="width: ${computer.ramUsage}%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detail-row">
                <label class="detail-label">Storage Usage</label>
                <div>
                    <span style="font-size: 12px; color: #6b7280;">Disk: ${computer.storageUsage}%</span>
                    <div class="usage-bar">
                        <div class="usage-fill" style="width: ${computer.storageUsage}%"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="computer-controls">
            ${computer.isOnline ? `
                <button class="control-btn btn-power-off" data-computer-id="${computer.id}" data-action="poweroff">
                    <i class="bi bi-power"></i> Power Off
                </button>
                <button class="control-btn btn-restart" data-computer-id="${computer.id}" data-action="restart">
                    <i class="bi bi-arrow-clockwise"></i> Restart
                </button>
            ` : `
                <button class="control-btn btn-power-on" data-computer-id="${computer.id}" data-action="poweron">
                    <i class="bi bi-lightning-charge-fill"></i> Power On
                </button>
            `}
        </div>
    `;
    
    return card;
}

// Handle user input changes
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('user-input') || e.target.classList.contains('time-input')) {
        const computerId = parseInt(e.target.dataset.computerId);
        const computersData = getComputersData();
        const computer = computersData.find(c => c.id === computerId);
        
        if (computer) {
            if (e.target.classList.contains('user-input')) {
                computer.assignedUser = e.target.value || 'Unknown User';
            } else if (e.target.classList.contains('time-input')) {
                computer.remainingTime = Math.max(0, parseInt(e.target.value) || 0);
            }
            saveComputersData(computersData);
        }
    }
});

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.control-btn');
    if (!btn) return;
    
    const computerId = parseInt(btn.dataset.computerId);
    const action = btn.dataset.action;
    const computersData = getComputersData();
    const computer = computersData.find(c => c.id === computerId);
    
    if (computer) {
        showActionModal(computer, action);
    }
});

function showActionModal(computer, action) {
    const modal = document.getElementById('actionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const btnConfirm = document.querySelector('.btn-confirm');
    
    let actionText = 'Power Off';
    let actionMessage = 'power off';
    if (action === 'restart') {
        actionText = 'Restart';
        actionMessage = 'restart';
    } else if (action === 'poweron') {
        actionText = 'Power On';
        actionMessage = 'power on';
    }
    modalTitle.textContent = `${actionText} ${computer.name}?`;
    modalMessage.textContent = `Are you sure you want to ${actionMessage} ${computer.name} (${computer.assignedUser})?`;
    
    modal.style.display = 'block';
    

    btnConfirm.onclick = null;
    btnConfirm.onclick = () => {
        performAction(computer, action);
        modal.style.display = 'none';
    };
}

function performAction(computer, action) {
    // Simulate action with a brief visual feedback
    const computersData = getComputersData();
    const comp = computersData.find(c => c.id === computer.id);
    
    if (comp) {
        if (action === 'poweroff') {
            comp.isOnline = false;
            comp.cpuUsage = 0;
            comp.ramUsage = 0;
            comp.remainingTime = 0;
        } else if (action === 'restart') {
            // Simulate restart - briefly go offline then online
            comp.cpuUsage = Math.floor(Math.random() * 50);
            comp.ramUsage = Math.floor(Math.random() * 50);
        } else if (action === 'poweron') {
            // Power on the computer
            comp.isOnline = true;
            comp.cpuUsage = Math.floor(Math.random() * 30) + 10; // 10-40%
            comp.ramUsage = Math.floor(Math.random() * 30) + 15; // 15-45%
        }
        saveComputersData(computersData);
        renderComputers();
        
        // Show notification
        let message = '';
        if (action === 'poweroff') {
            message = `${computer.name} powered off successfully.`;
        } else if (action === 'restart') {
            message = `${computer.name} restarted successfully.`;
        } else if (action === 'poweron') {
            message = `${computer.name} powered on successfully.`;
        }
        showNotification(message);
    }
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dcfce7;
        color: #166534;
        padding: 16px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


const modal = document.getElementById('actionModal');
const modalClose = document.querySelector('.modal-close');
const btnCancel = document.querySelector('.btn-cancel');

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

if (btnCancel) {
    btnCancel.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


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

// ========== QUICK ACTIONS FUNCTIONALITY ==========

function performBulkAction(action) {
    const computersData = getComputersData();
    let affectedCount = 0;
    
    if (action === 'restartall') {
        computersData.forEach(comp => {
            if (comp.isOnline) {
                comp.cpuUsage = Math.floor(Math.random() * 50) + 10;
                comp.ramUsage = Math.floor(Math.random() * 50) + 10;
                affectedCount++;
            }
        });
    } else if (action === 'poweronall') {
        computersData.forEach(comp => {
            if (!comp.isOnline) {
                comp.isOnline = true;
                comp.cpuUsage = Math.floor(Math.random() * 30) + 10;
                comp.ramUsage = Math.floor(Math.random() * 30) + 15;
                affectedCount++;
            }
        });
    } else if (action === 'poweroffall') {
        computersData.forEach(comp => {
            if (comp.isOnline) {
                comp.isOnline = false;
                comp.cpuUsage = 0;
                comp.ramUsage = 0;
                affectedCount++;
            }
        });
    }
    
    if (affectedCount > 0) {
        saveComputersData(computersData);
        renderComputers();
        
        let message = '';
        if (action === 'restartall') {
            message = `Restarted ${affectedCount} computer(s) successfully.`;
        } else if (action === 'poweronall') {
            message = `Powered on ${affectedCount} computer(s) successfully.`;
        } else if (action === 'poweroffall') {
            message = `Powered off ${affectedCount} computer(s) successfully.`;
        }
        showNotification(message);
    } else {
        let message = '';
        if (action === 'restartall') {
            message = 'No online computers to restart.';
        } else if (action === 'poweronall') {
            message = 'No offline computers to power on.';
        } else if (action === 'poweroffall') {
            message = 'No online computers to power off.';
        }
        showNotification(message);
    }
}

function showBulkActionModal(action) {
    const modal = document.getElementById('actionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const btnConfirm = document.querySelector('.btn-confirm');
    
    let title = '';
    let message = '';
    
    if (action === 'restartall') {
        title = 'Restart All Computers?';
        message = 'This will restart all online computers. Are you sure?';
    } else if (action === 'poweronall') {
        title = 'Power On All Computers?';
        message = 'This will power on all offline computers. Are you sure?';
    } else if (action === 'poweroffall') {
        title = 'Power Off All Computers?';
        message = 'This will power off all online computers. Are you sure?';
    }
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
    
    btnConfirm.onclick = null;
    btnConfirm.onclick = () => {
        performBulkAction(action);
        modal.style.display = 'none';
    };
}

// Event listeners for quick action buttons
document.addEventListener('DOMContentLoaded', () => {
    const restartAllBtn = document.querySelector('.restart-all');
    const powerOnAllBtn = document.querySelector('.power-on-all');
    const powerOffAllBtn = document.querySelector('.power-off-all');
    
    if (restartAllBtn) {
        restartAllBtn.addEventListener('click', () => showBulkActionModal('restartall'));
    }
    if (powerOnAllBtn) {
        powerOnAllBtn.addEventListener('click', () => showBulkActionModal('poweronall'));
    }
    if (powerOffAllBtn) {
        powerOffAllBtn.addEventListener('click', () => showBulkActionModal('poweroffall'));
    }
});

// Ensure renderComputers is called after DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderComputers);
} else {
    renderComputers();
}
