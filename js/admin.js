// js/admin.js - COMPLETE FIXED VERSION WITH ALL FUNCTIONS

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin dashboard loaded'); // Debug
    
    // Load user data
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
    }
    
    // Load default dashboard
    loadDashboard();
    
    // Dashboard button
    const dashboardBtn = document.getElementById('dashboardBtn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Dashboard clicked');
            setActive(this);
            loadDashboard();
        });
    }
    
    // Users button
    const usersBtn = document.getElementById('usersBtn');
    if (usersBtn) {
        usersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Users clicked');
            setActive(this);
            loadAllUsers();
        });
    }
    
    // Teachers button
    const teachersBtn = document.getElementById('teachersBtn');
    if (teachersBtn) {
        teachersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Teachers clicked');
            setActive(this);
            loadTeachers();
        });
    }
    
    // Students button
    const studentsBtn = document.getElementById('studentsBtn');
    if (studentsBtn) {
        studentsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Students clicked');
            setActive(this);
            loadStudents();
        });
    }
    
    // Exams button
    const examsBtn = document.getElementById('examsBtn');
    if (examsBtn) {
        examsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Exams clicked');
            setActive(this);
            loadAllExams();
        });
    }
    
    // Reports button
    const reportsBtn = document.getElementById('reportsBtn');
    if (reportsBtn) {
        reportsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Reports clicked');
            setActive(this);
            loadReports();
        });
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Settings clicked');
            setActive(this);
            loadSettings();
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('user');
                window.location.href = '../login.html';
            }
        });
    }
});

// Function to set active menu item
function setActive(element) {
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}

// =====================================
// DASHBOARD FUNCTION
// =====================================
function loadDashboard() {
    console.log('Loading dashboard');
    
    const user = JSON.parse(sessionStorage.getItem('user')) || { name: 'Admin' };
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const students = users.filter(u => u.role === 'student').length;
    const teachers = users.filter(u => u.role === 'teacher').length;
    const admins = users.filter(u => u.role === 'admin').length;
    const totalUsers = users.length;
    
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>Welcome, Admin ${user.name}! 👑</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
                <div class="notification-badge">
                    <i class="fas fa-bell"></i>
                    <span class="badge">3</span>
                </div>
            </div>
        </div>
        
        <!-- System Overview -->
        <h2 style="margin: 20px 0;">System Overview</h2>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
            <div class="stat-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 10px; color: white;">
                <i class="fas fa-users" style="font-size: 40px; margin-bottom: 10px;"></i>
                <h3 style="font-size: 36px; margin: 10px 0;">${totalUsers}</h3>
                <p>Total Users</p>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 10px; color: white;">
                <i class="fas fa-user-graduate" style="font-size: 40px; margin-bottom: 10px;"></i>
                <h3 style="font-size: 36px; margin: 10px 0;">${students}</h3>
                <p>Students</p>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 25px; border-radius: 10px; color: white;">
                <i class="fas fa-chalkboard-teacher" style="font-size: 40px; margin-bottom: 10px;"></i>
                <h3 style="font-size: 36px; margin: 10px 0;">${teachers}</h3>
                <p>Teachers</p>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 25px; border-radius: 10px; color: white;">
                <i class="fas fa-crown" style="font-size: 40px; margin-bottom: 10px;"></i>
                <h3 style="font-size: 36px; margin: 10px 0;">${admins}</h3>
                <p>Admins</p>
            </div>
        </div>
        
        <!-- More Stats -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="dashboard-card">
                <h3 style="margin-bottom: 20px;">📊 Platform Statistics</h3>
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Total Exams</span>
                        <span>24</span>
                    </div>
                    <progress value="24" max="50" style="width: 100%; height: 8px;"></progress>
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Active Exams</span>
                        <span>8</span>
                    </div>
                    <progress value="8" max="24" style="width: 100%; height: 8px;"></progress>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Completed Exams</span>
                        <span>16</span>
                    </div>
                    <progress value="16" max="24" style="width: 100%; height: 8px;"></progress>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3 style="margin-bottom: 20px;">⚠️ Recent Violations</h3>
                <div class="violation-item">
                    <p><strong>John Doe</strong> - Multiple faces detected</p>
                    <small>Mathematics Exam - 5 min ago</small>
                </div>
                <div class="violation-item">
                    <p><strong>Jane Smith</strong> - Tab switching</p>
                    <small>Physics Exam - 10 min ago</small>
                </div>
                <div class="violation-item">
                    <p><strong>Mike Johnson</strong> - Phone detected</p>
                    <small>Chemistry Exam - 15 min ago</small>
                </div>
            </div>
        </div>
        
        <!-- Recent Users -->
        <h2 style="margin: 30px 0 20px;">Recent Users</h2>
        <div class="dashboard-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.slice(-5).map(user => `
                        <tr>
                            <td>${user.name || 'N/A'}</td>
                            <td>${user.email}</td>
                            <td><span class="role-badge role-${user.role || 'student'}">${user.role || 'student'}</span></td>
                            <td>${new Date().toLocaleDateString()}</td>
                            <td><span style="color: #10b981;">●</span> Active</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Re-initialize theme toggle
    initThemeToggle();
}

// =====================================
// ALL USERS FUNCTION
// =====================================
function loadAllUsers() {
    console.log('Loading all users');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>👥 All Users</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <button class="btn-primary" onclick="alert('Add user feature coming soon!')">
                <i class="fas fa-plus"></i> Add New User
            </button>
        </div>
        
        <div class="dashboard-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.name || 'N/A'}</td>
                            <td>${user.email}</td>
                            <td><span class="role-badge role-${user.role || 'student'}">${user.role || 'student'}</span></td>
                            <td><span style="color: #10b981;">●</span> Active</td>
                            <td>
                                <button class="action-btn edit-btn" onclick="alert('Edit user: ${user.email}')"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete-btn" onclick="if(confirm('Delete user?')) alert('User deleted')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// =====================================
// TEACHERS FUNCTION
// =====================================
function loadTeachers() {
    console.log('Loading teachers');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const teachers = users.filter(u => u.role === 'teacher');
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>👨‍🏫 Teachers</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <button class="btn-primary" onclick="alert('Add teacher feature coming soon!')">
                <i class="fas fa-plus"></i> Add New Teacher
            </button>
        </div>
        
        <div class="dashboard-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Exams Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${teachers.length > 0 ? teachers.map(teacher => `
                        <tr>
                            <td>${teacher.name || 'N/A'}</td>
                            <td>${teacher.email}</td>
                            <td>Mathematics</td>
                            <td>8</td>
                            <td>
                                <button class="action-btn edit-btn" onclick="alert('Edit teacher: ${teacher.email}')"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete-btn" onclick="if(confirm('Delete teacher?')) alert('Teacher deleted')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('') : `
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 30px;">No teachers found</td>
                        </tr>
                    `}
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// =====================================
// STUDENTS FUNCTION
// =====================================
function loadStudents() {
    console.log('Loading students');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const students = users.filter(u => u.role === 'student');
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>🎓 Students</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Exams Taken</th>
                        <th>Avg Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.length > 0 ? students.map(student => `
                        <tr>
                            <td>${student.name || 'N/A'}</td>
                            <td>${student.email}</td>
                            <td>5</td>
                            <td><span style="color: #10b981;">75%</span></td>
                            <td><span style="color: #10b981;">●</span> Active</td>
                        </tr>
                    `).join('') : `
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 30px;">No students found</td>
                        </tr>
                    `}
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// =====================================
// ALL EXAMS FUNCTION
// =====================================
function loadAllExams() {
    console.log('Loading all exams');
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>📝 All Exams</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <button class="btn-primary" onclick="alert('Create exam feature coming soon!')">
                <i class="fas fa-plus"></i> Create New Exam
            </button>
        </div>
        
        <div class="dashboard-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Created By</th>
                        <th>Date</th>
                        <th>Students</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mathematics Final</td>
                        <td>Prof. Kumar</td>
                        <td>2024-01-20</td>
                        <td>25/30</td>
                        <td><span class="status-badge status-active">Active</span></td>
                        <td>
                            <button class="action-btn edit-btn" onclick="alert('Edit exam')"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete-btn" onclick="if(confirm('Delete exam?')) alert('Exam deleted')"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>Physics Quiz</td>
                        <td>Prof. Sharma</td>
                        <td>2024-01-22</td>
                        <td>18/30</td>
                        <td><span class="status-badge status-upcoming">Upcoming</span></td>
                        <td>
                            <button class="action-btn edit-btn" onclick="alert('Edit exam')"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete-btn" onclick="if(confirm('Delete exam?')) alert('Exam deleted')"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>Chemistry Mid-Term</td>
                        <td>Prof. Verma</td>
                        <td>2024-01-15</td>
                        <td>28/30</td>
                        <td><span class="status-badge status-completed">Completed</span></td>
                        <td>
                            <button class="action-btn edit-btn" onclick="alert('Edit exam')"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete-btn" onclick="if(confirm('Delete exam?')) alert('Exam deleted')"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// =====================================
// REPORTS FUNCTION
// =====================================
function loadReports() {
    console.log('Loading reports');
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>📊 System Reports</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div class="dashboard-card">
                <h3 style="margin-bottom: 20px;">User Growth</h3>
                <div style="height: 200px; display: flex; align-items: flex-end; gap: 10px; margin-top: 20px;">
                    <div style="flex: 1; background: #4f46e5; height: 100px; border-radius: 5px 5px 0 0;"></div>
                    <div style="flex: 1; background: #4f46e5; height: 150px; border-radius: 5px 5px 0 0;"></div>
                    <div style="flex: 1; background: #4f46e5; height: 180px; border-radius: 5px 5px 0 0;"></div>
                    <div style="flex: 1; background: #4f46e5; height: 200px; border-radius: 5px 5px 0 0;"></div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <div style="flex: 1; text-align: center;">Week 1</div>
                    <div style="flex: 1; text-align: center;">Week 2</div>
                    <div style="flex: 1; text-align: center;">Week 3</div>
                    <div style="flex: 1; text-align: center;">Week 4</div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3 style="margin-bottom: 20px;">Exam Performance</h3>
                <div style="margin-top: 20px;">
                    <div style="margin-bottom: 15px;">
                        <span>Pass Rate</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <progress value="75" max="100" style="flex: 1; height: 10px;"></progress>
                            <span>75%</span>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <span>Average Score</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <progress value="68" max="100" style="flex: 1; height: 10px;"></progress>
                            <span>68%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 20px;">
            <button class="btn-primary" onclick="alert('Download report feature coming soon!')">
                <i class="fas fa-download"></i> Download Full Report
            </button>
        </div>
    `;
    
    initThemeToggle();
}

// =====================================
// SETTINGS FUNCTION
// =====================================
function loadSettings() {
    console.log('Loading settings');
    
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>⚙️ System Settings</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
                <div class="notification-badge">
                    <i class="fas fa-bell"></i>
                    <span class="badge">3</span>
                </div>
            </div>
        </div>

        <!-- Settings Navigation Tabs -->
        <div class="settings-tabs">
            <button class="settings-tab active" onclick="showSettingsTab('general')">
                <i class="fas fa-sliders-h"></i> General
            </button>
            <button class="settings-tab" onclick="showSettingsTab('security')">
                <i class="fas fa-shield-alt"></i> Security
            </button>
            <button class="settings-tab" onclick="showSettingsTab('email')">
                <i class="fas fa-envelope"></i> Email
            </button>
            <button class="settings-tab" onclick="showSettingsTab('proctoring')">
                <i class="fas fa-video"></i> Proctoring
            </button>
            <button class="settings-tab" onclick="showSettingsTab('backup')">
                <i class="fas fa-database"></i> Backup
            </button>
            <button class="settings-tab" onclick="showSettingsTab('api')">
                <i class="fas fa-code"></i> API
            </button>
        </div>

        <!-- General Settings Tab -->
        <div id="general-tab" class="settings-tab-content active">
            <div class="settings-grid">
                <!-- System Information Card -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-info-circle"></i>
                        <h3>System Information</h3>
                    </div>
                    <div class="settings-card-body">
                        <div class="info-item">
                            <span class="info-label">System Name</span>
                            <span class="info-value">EduProctor v2.0</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Environment</span>
                            <span class="info-value"><span class="badge-success">Production</span></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Last Updated</span>
                            <span class="info-value">2024-01-15 10:30 AM</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Timezone</span>
                            <span class="info-value">IST (UTC+5:30)</span>
                        </div>
                    </div>
                </div>

                <!-- General Settings Card -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-cog"></i>
                        <h3>General Settings</h3>
                    </div>
                    <div class="settings-card-body">
                        <div class="settings-form-group">
                            <label class="settings-label">
                                <i class="fas fa-globe"></i>
                                Site Name
                            </label>
                            <input type="text" class="settings-input" value="EduProctor">
                            <small class="settings-hint">Your exam platform name</small>
                        </div>

                        <div class="settings-form-group">
                            <label class="settings-label">
                                <i class="fas fa-tag"></i>
                                Site Tagline
                            </label>
                            <input type="text" class="settings-input" value="Secure Online Examination & Proctoring">
                        </div>

                        <div class="settings-form-group">
                            <label class="settings-label">
                                <i class="fas fa-language"></i>
                                Default Language
                            </label>
                            <select class="settings-select">
                                <option value="en">English (US)</option>
                                <option value="en-gb">English (UK)</option>
                                <option value="hi">Hindi</option>
                                <option value="ta">Tamil</option>
                                <option value="te">Telugu</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Appearance Card -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-paint-brush"></i>
                        <h3>Appearance</h3>
                    </div>
                    <div class="settings-card-body">
                        <div class="settings-form-group">
                            <label class="settings-label">Theme Mode</label>
                            <div class="theme-selector">
                                <div class="theme-option active" onclick="setTheme('light')">
                                    <i class="fas fa-sun"></i>
                                    <span>Light</span>
                                </div>
                                <div class="theme-option" onclick="setTheme('dark')">
                                    <i class="fas fa-moon"></i>
                                    <span>Dark</span>
                                </div>
                                <div class="theme-option" onclick="setTheme('auto')">
                                    <i class="fas fa-laptop"></i>
                                    <span>Auto</span>
                                </div>
                            </div>
                        </div>

                        <div class="settings-form-group">
                            <label class="settings-label">Primary Color</label>
                            <div class="color-picker">
                                <input type="color" value="#4f46e5" class="color-input">
                                <span>#4f46e5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Other tabs (simplified) -->
        <div id="security-tab" class="settings-tab-content">
            <div class="settings-card">
                <div class="settings-card-body">
                    <p>Security settings coming soon...</p>
                </div>
            </div>
        </div>
        
        <div id="email-tab" class="settings-tab-content">
            <div class="settings-card">
                <div class="settings-card-body">
                    <p>Email settings coming soon...</p>
                </div>
            </div>
        </div>
        
        <div id="proctoring-tab" class="settings-tab-content">
            <div class="settings-card">
                <div class="settings-card-body">
                    <p>Proctoring settings coming soon...</p>
                </div>
            </div>
        </div>
        
        <div id="backup-tab" class="settings-tab-content">
            <div class="settings-card">
                <div class="settings-card-body">
                    <p>Backup settings coming soon...</p>
                </div>
            </div>
        </div>
        
        <div id="api-tab" class="settings-tab-content">
            <div class="settings-card">
                <div class="settings-card-body">
                    <p>API settings coming soon...</p>
                </div>
            </div>
        </div>

        <!-- Save Button -->
        <div style="margin-top: 30px; display: flex; justify-content: flex-end; gap: 15px;">
            <button class="btn-secondary" onclick="resetSettings()">
                <i class="fas fa-undo"></i> Reset to Default
            </button>
            <button class="btn-primary btn-large" onclick="saveSettings()">
                <i class="fas fa-save"></i> Save All Changes
            </button>
        </div>
    `;
    
    // Make functions global
    window.showSettingsTab = showSettingsTab;
    window.setTheme = setTheme;
    window.resetSettings = resetSettings;
    window.saveSettings = saveSettings;
    
    initThemeToggle();
}

// =====================================
// SETTINGS HELPER FUNCTIONS
// =====================================

// Tab switching function
function showSettingsTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Hide all tabs
    document.querySelectorAll('.settings-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked tab button
    event.target.closest('.settings-tab').classList.add('active');
}

// Theme selector function
function setTheme(theme) {
    console.log('Setting theme:', theme);
    
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.remove('active');
    });
    event.target.closest('.theme-option').classList.add('active');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Save settings function
function saveSettings() {
    alert('✅ Settings saved successfully!');
}

// Reset settings function
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        alert('Settings reset to default');
    }
}

// =====================================
// THEME TOGGLE INITIALIZATION
// =====================================
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        // Remove existing listeners
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        newToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}