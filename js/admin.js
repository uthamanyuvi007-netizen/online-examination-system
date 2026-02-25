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
async function loadDashboard() {
    console.log('Loading dashboard');

    const user = JSON.parse(sessionStorage.getItem('user')) || { name: 'Admin' };

    const mainContent = document.getElementById('mainContent');

    // Fetch users from API
    let students = 0, teachers = 0, admins = 0, totalUsers = 0;
    let users = [];
    try {
        const res = await API.users.getAll();
        if (res.success) {
            users = Array.isArray(res.data) ? res.data : (res.data?.data || []);
            students = users.filter(u => u.role === 'student').length;
            teachers = users.filter(u => u.role === 'teacher').length;
            admins = users.filter(u => u.role === 'admin').length;
            totalUsers = users.length;
        } else {
            console.error('Failed to load users for dashboard', res.error || res.data);
        }
    } catch (err) {
        console.error('Error loading users for dashboard', err);
    }

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
                    ${ (Array.isArray(users) ? users.slice(-5) : []).map(user => `
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
    // populate users table
    try {
        const res = await API.users.getAll();
        const tbody = document.getElementById('allUsersTableBody');
        if (res.success && tbody) {
            const users = res.data || [];
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name || 'N/A'}</td>
                    <td>${user.email}</td>
                    <td><span class="role-badge role-${user.role || 'student'}">${user.role || 'student'}</span></td>
                    <td><span style="color: #10b981;">●</span> Active</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="alert('Edit user: ${user.email}')"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" onclick="if(confirm('Delete user?')) deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } else if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">No users found or failed to load.</td></tr>`;
        }
    } catch (err) {
        console.error('Error populating users table', err);
    }
}

// Delete user helper
async function deleteUser(userId) {
    if (!confirm('Delete user permanently?')) return;
    try {
        const res = await API.users.delete(userId);
        if (res.success) {
            alert('User deleted');
            loadAllUsers();
        } else {
            alert('Delete failed: ' + (res.data?.error || res.error || 'Unknown'));
        }
    } catch (err) {
        alert('Error deleting user: ' + err.message);
    }
}

// =====================================
// ALL USERS FUNCTION
// =====================================
async function loadAllUsers() {
    console.log('Loading all users');

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
                <tbody id="allUsersTableBody">
                    <tr><td colspan="5" style="text-align:center;">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    try {
        const res = await API.users.getAll();
        const tbody = document.getElementById('allUsersTableBody');
        if (res.success && tbody) {
            const users = res.data || [];
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name || 'N/A'}</td>
                    <td>${user.email}</td>
                    <td><span class="role-badge role-${user.role || 'student'}">${user.role || 'student'}</span></td>
                    <td><span style="color: #10b981;">●</span> Active</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="alert('Edit user: ${user.email}')"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" onclick="if(confirm('Delete user?')) deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } else if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">No users found or failed to load.</td></tr>`;
        }
    } catch (err) {
        console.error('Error populating users table', err);
    }
}

// =====================================
// TEACHERS FUNCTION
// =====================================
async function loadTeachers() {
    console.log('Loading teachers');

    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>👩‍🏫 Teachers</h1>
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
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="teachersTableBody">
                    <tr><td colspan="5" style="text-align:center;">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    try {
        const res = await API.users.getTeachers();
        const tbody = document.getElementById('teachersTableBody');
        if (res.success && tbody) {
            const users = res.data || [];
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name || 'N/A'}</td>
                    <td>${user.email}</td>
                    <td><span class="role-badge role-${user.role || 'teacher'}">${user.role || 'teacher'}</span></td>
                    <td><span style="color: #10b981;">●</span> Active</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="alert('Edit teacher: ${user.email}')"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" onclick="if(confirm('Delete teacher?')) deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } else if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">No teachers found or failed to load.</td></tr>`;
        }
    } catch (err) {
        console.error('Error populating teachers table', err);
    }
}

// =====================================
// STUDENTS FUNCTION
// =====================================
async function loadStudents() {
    console.log('Loading students');

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

        <div style="margin-bottom: 20px;">
            <button class="btn-primary" onclick="alert('Add student feature coming soon!')">
                <i class="fas fa-plus"></i> Add New Student
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
                <tbody id="studentsTableBody">
                    <tr><td colspan="5" style="text-align:center;">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    try {
        const res = await API.users.getStudents();
        const tbody = document.getElementById('studentsTableBody');
        if (res.success && tbody) {
            const users = res.data || [];
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name || 'N/A'}</td>
                    <td>${user.email}</td>
                    <td><span class="role-badge role-${user.role || 'student'}">${user.role || 'student'}</span></td>
                    <td><span style="color: #10b981;">●</span> Active</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="alert('Edit student: ${user.email}')"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" onclick="if(confirm('Delete student?')) deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } else if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">No students found or failed to load.</td></tr>`;
        }
    } catch (err) {
        console.error('Error populating students table', err);
    }
}

// =====================================
// ALL EXAMS FUNCTION
// =====================================
async function loadAllExams() {
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
                <tbody id="allExamsTableBody">
                    <tr><td colspan="6" style="text-align:center;">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    `;

    try {
        const res = await API.exams.getAll();
        const tbody = document.getElementById('allExamsTableBody');
        if (res.success && tbody) {
            const exams = res.data || [];
            tbody.innerHTML = exams.map(exam => `
                <tr>
                    <td>${exam.name || 'N/A'}</td>
                    <td>${exam.createdBy || 'N/A'}</td>
                    <td>${new Date(exam.date).toLocaleDateString()}</td>
                    <td>${exam.students || '0'}</td>
                    <td><span class="status-badge status-${exam.status || 'inactive'}">${exam.status || 'Inactive'}</span></td>
                    <td>
                        <button class="action-btn edit-btn" onclick="alert('Edit exam: ${exam.name}')"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" onclick="if(confirm('Delete exam?')) deleteExam(${exam.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } else if (tbody) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px;">No exams found or failed to load.</td></tr>`;
        }
    } catch (err) {
        console.error('Error populating exams table', err);
    }
}

// Delete exam helper
async function deleteExam(examId) {
    if (!confirm('Delete exam permanently?')) return;
    try {
        const res = await API.exams.delete(examId);
        if (res.success) {
            alert('Exam deleted');
            loadAllExams();
        } else {
            alert('Delete failed: ' + (res.data?.error || res.error || 'Unknown'));
        }
    } catch (err) {
        alert('Error deleting exam: ' + err.message);
    }
}

// =====================================
// REPORTS FUNCTION
// =====================================
async function loadReports() {
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

    // Additional logic for dynamic data can be added here
}

// =====================================
// SETTINGS FUNCTION
// =====================================
async function loadSettings() {
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
        
        <div style="margin-top: 20px;">
            <h3>General Settings</h3>
            <div style="margin-bottom: 15px;">
                <label for="theme">Theme:</label>
                <select id="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div style="margin-bottom: 15px;">
                <label for="notifications">Notifications:</label>
                <input type="checkbox" id="notifications" checked /> Enable Notifications
            </div>
        </div>
        
        <div style="margin-top: 20px;">
            <button class="btn-primary" onclick="alert('Save settings feature coming soon!')">
                <i class="fas fa-save"></i> Save Settings
            </button>
        </div>
    `;

    // Additional logic for dynamic settings can be added here
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