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

// ========== USERS MANAGEMENT FUNCTIONALITY ==========

// Sample user data
const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Amanda', 'Joseph'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];

// Generate user data
function generateUsersData() {
  const storedData = localStorage.getItem('usersData');
  if (storedData) {
    const parsed = JSON.parse(storedData);
    if (Array.isArray(parsed) && parsed.length === 20) {
      return parsed;
    }
  }

  const users = [];
  for (let i = 1; i <= 20; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = i <= 3 ? 'Admin' : 'Student';
    const isOnline = Math.random() > 0.4;
    
    users.push({
      id: i,
      name: `${firstName} ${lastName}`,
      username: `user${String(i).padStart(3, '0')}`,
      email: `user${i}@lab.edu`,
      role: role,
      isOnline: isOnline,
      currentPC: isOnline ? `PC-${String(Math.floor(Math.random() * 25) + 1).padStart(2, '0')}` : 'N/A',
      loginTime: isOnline ? new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString() : 'N/A',
      sessionDuration: isOnline ? Math.floor(Math.random() * 180) : 0,
      totalHoursToday: Math.floor(Math.random() * 8) + 1,
      totalHoursWeek: Math.floor(Math.random() * 40) + 5,
      totalHoursMonth: Math.floor(Math.random() * 160) + 20,
      isLocked: false,
      timeLimit: 2
    });
  }

  localStorage.setItem('usersData', JSON.stringify(users));
  return users;
}

let usersData = generateUsersData();

// Update date/time
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

// Render users table
function renderUsersTable(filter = '') {
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';

  const filtered = usersData.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><span class="user-name">${user.name}</span></td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><span class="role-badge role-${user.role.toLowerCase()}">${user.role}</span></td>
      <td><span class="status-${user.isOnline ? 'active' : 'inactive'}">${user.isOnline ? '● Online' : '● Offline'}</span></td>
      <td>
        <div class="table-actions">
          <button class="table-action-btn btn-edit" onclick="openUserModal(${user.id})">Edit</button>
          <button class="table-action-btn btn-lock" onclick="toggleLockUser(${user.id})">${user.isLocked ? 'Unlock' : 'Lock'}</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Render login activity
function renderLoginActivity() {
  const grid = document.getElementById('loginActivityGrid');
  grid.innerHTML = '';

  const onlineUsers = usersData.filter(u => u.isOnline).slice(0, 6);

  onlineUsers.forEach(user => {
    const card = document.createElement('div');
    card.className = 'login-card';
    const initials = user.name.split(' ').map(n => n[0]).join('');
    card.innerHTML = `
      <div class="login-user-info">
        <div class="login-avatar">${initials}</div>
        <div class="login-details">
          <div class="login-username">${user.name}</div>
          <div class="login-role">${user.role}</div>
        </div>
      </div>
      <div class="login-data">
        <div class="login-data-row">
          <span class="login-data-label">PC:</span>
          <span class="login-data-value">${user.currentPC}</span>
        </div>
        <div class="login-data-row">
          <span class="login-data-label">Login Time:</span>
          <span class="login-data-value">${user.loginTime}</span>
        </div>
        <div class="login-data-row">
          <span class="login-data-label">Duration:</span>
          <span class="login-data-value">${user.sessionDuration} min</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Update statistics
function updateStatistics() {
  const onlineUsers = usersData.filter(u => u.isOnline);
  const avgSession = (usersData.reduce((acc, u) => acc + u.totalHoursToday, 0) / usersData.length).toFixed(1);
  const totalHours = usersData.reduce((acc, u) => acc + u.totalHoursToday, 0).toFixed(1);

  document.getElementById('avgSessionStat').textContent = avgSession + ' hrs';
  document.getElementById('totalHoursStat').textContent = totalHours;
  document.getElementById('activeUsersStat').textContent = onlineUsers.length;
  document.getElementById('peakHoursStat').textContent = '12 PM - 1 PM';
}

// Render top users
function renderTopUsers() {
  const list = document.getElementById('topUsersList');
  list.innerHTML = '';

  const sorted = [...usersData].sort((a, b) => b.totalHoursMonth - a.totalHoursMonth).slice(0, 5);

  sorted.forEach((user, index) => {
    const item = document.createElement('div');
    item.className = 'top-user-item';
    item.innerHTML = `
      <div class="user-rank">#${index + 1}</div>
      <div class="user-info-col">
        <div class="user-name-label">${user.name}</div>
        <div class="user-hours-label">Username: ${user.username}</div>
      </div>
      <div class="user-hours-value">${user.totalHoursMonth}h</div>
    `;
    list.appendChild(item);
  });
}

// Render controls
function renderControls() {
  const grid = document.getElementById('controlsGrid');
  grid.innerHTML = '';

  usersData.forEach(user => {
    if (user.isOnline) {
      const card = document.createElement('div');
      card.className = 'control-card';
      card.innerHTML = `
        <div class="control-user-header">
          <span class="control-username">${user.name}</span>
          <span class="control-role-badge">${user.role}</span>
        </div>
        <div class="control-buttons-group">
          <button class="control-btn lock-btn" onclick="lockUserConfirm(${user.id})">
            <i class="bi bi-lock"></i> Lock Account
          </button>
          <button class="control-btn reset-btn" onclick="resetPasswordConfirm(${user.id})">
            <i class="bi bi-arrow-repeat"></i> Reset Password
          </button>
          <button class="control-btn logout-btn" onclick="logoutUserConfirm(${user.id})">
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      `;
      grid.appendChild(card);
    }
  });
}

// Modal functions
let currentUserId = null;

function openUserModal(userId) {
  currentUserId = userId;
  const user = usersData.find(u => u.id === userId);
  
  const userInfo = document.getElementById('userInfo');
  userInfo.innerHTML = `
    <div class="info-item">
      <div class="info-label">Name</div>
      <div class="info-value">${user.name}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Username</div>
      <div class="info-value">${user.username}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Role</div>
      <div class="info-value">${user.role}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Email</div>
      <div class="info-value">${user.email}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Status</div>
      <div class="info-value">${user.isOnline ? 'Online' : 'Offline'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Total Hours Today</div>
      <div class="info-value">${user.totalHoursToday}h</div>
    </div>
  `;

  document.getElementById('timeLimitInput').value = user.timeLimit;
  document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
  document.getElementById('userModal').classList.remove('active');
  currentUserId = null;
}

// Confirmation modal functions
let confirmAction = null;

function showConfirmation(title, message, action) {
  confirmAction = action;
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmationModal').classList.add('active');
}

function lockUserConfirm(userId) {
  showConfirmation('Lock Account', 'Are you sure you want to lock this user account?', () => lockUser(userId));
}

function resetPasswordConfirm(userId) {
  showConfirmation('Reset Password', 'Reset password for this user? They will receive an email with new credentials.', () => resetPassword(userId));
}

function logoutUserConfirm(userId) {
  showConfirmation('Logout User', 'This will immediately log out the user from all sessions.', () => logoutUser(userId));
}

function lockUser(userId) {
  const user = usersData.find(u => u.id === userId);
  user.isLocked = !user.isLocked;
  user.isOnline = false;
  localStorage.setItem('usersData', JSON.stringify(usersData));
  renderAll();
  closeConfirmation();
  alert(`User ${user.name} has been ${user.isLocked ? 'locked' : 'unlocked'}.`);
}

function resetPassword(userId) {
  const user = usersData.find(u => u.id === userId);
  closeConfirmation();
  alert(`Password reset email sent to ${user.email}`);
}

function logoutUser(userId) {
  const user = usersData.find(u => u.id === userId);
  user.isOnline = false;
  localStorage.setItem('usersData', JSON.stringify(usersData));
  renderAll();
  closeConfirmation();
  alert(`${user.name} has been logged out.`);
}

function closeConfirmation() {
  document.getElementById('confirmationModal').classList.remove('active');
  confirmAction = null;
}

// Save time limit
document.getElementById('saveTimeLimitBtn')?.addEventListener('click', () => {
  if (currentUserId) {
    const user = usersData.find(u => u.id === currentUserId);
    user.timeLimit = parseFloat(document.getElementById('timeLimitInput').value);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    alert(`Time limit set to ${user.timeLimit} hours for ${user.name}`);
    closeUserModal();
  }
});

// Search functionality
document.getElementById('userSearch')?.addEventListener('input', (e) => {
  renderUsersTable(e.target.value);
});

// Export to CSV
document.getElementById('exportCSVBtn')?.addEventListener('click', () => {
  let csv = 'Name,Username,Email,Role,Status,Total Hours Today,Total Hours Month\n';
  usersData.forEach(user => {
    csv += `"${user.name}","${user.username}","${user.email}","${user.role}","${user.isOnline ? 'Online' : 'Offline'}","${user.totalHoursToday}","${user.totalHoursMonth}"\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  alert('CSV file downloaded successfully!');
});

// Export to PDF (simplified)
document.getElementById('exportPDFBtn')?.addEventListener('click', () => {
  alert('PDF export functionality requires a PDF library. Opening text version...\n\nUser Export Report\n' + new Date().toLocaleString() + '\n\n' + usersData.map(u => `${u.name} (${u.username}) - ${u.role}`).join('\n'));
});

// Attendance report
document.getElementById('attendanceReportBtn')?.addEventListener('click', () => {
  const onlineCount = usersData.filter(u => u.isOnline).length;
  const totalCount = usersData.length;
  const reportDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  alert(`Lab Attendance Report\nDate: ${reportDate}\n\nOnline Users: ${onlineCount}/${totalCount}\n\nOnline Users:\n${usersData.filter(u => u.isOnline).map(u => u.name).join('\n')}`);
});

// Modal close buttons
document.querySelector('.close')?.addEventListener('click', closeUserModal);
document.getElementById('confirmBtn')?.addEventListener('click', () => {
  if (confirmAction) confirmAction();
});
document.getElementById('cancelBtn')?.addEventListener('click', closeConfirmation);

// Click outside modal to close
window.addEventListener('click', (event) => {
  const userModal = document.getElementById('userModal');
  const confirmModal = document.getElementById('confirmationModal');
  
  if (event.target === userModal) closeUserModal();
  if (event.target === confirmModal) closeConfirmation();
});

// Render all sections
function renderAll() {
  renderUsersTable();
  renderLoginActivity();
  updateStatistics();
  renderTopUsers();
  renderControls();
}

// Initialize on page load
window.addEventListener('load', () => {
  renderAll();
});
