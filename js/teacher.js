// js/teacher.js
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
    }
    
    loadDashboard();
    
    // Menu clicks
    document.getElementById('dashboardBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActive(e.target);
        loadDashboard();
    });
    
    document.getElementById('createExamBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActive(e.target);
        loadCreateExam();
    });
    
    document.getElementById('manageExamsBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActive(e.target);
        loadManageExams();
    });
    
    document.getElementById('monitorBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActive(e.target);
        loadMonitor();
    });
    
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Profile clicked');
            setActive(this);
            loadProfile();
        });
    }

    const resultsBtn = document.getElementById('resultsBtn');
    if (resultsBtn) {
        console.log('Binding results button listener');
        resultsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Results clicked');
            setActive(this);
            try {
                if (typeof loadResults === 'function') {
                    loadResults();
                } else if (typeof window.loadResults === 'function') {
                    window.loadResults();
                } else {
                    console.error('loadResults is not defined');
                }
            } catch (err) {
                console.error('Error calling loadResults:', err);
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout clicked');
            sessionStorage.clear();
            window.location.href = '../login.html';
        });
    }
});

function setActive(element) {
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    element.closest('a').classList.add('active');
}

// TEACHER DASHBOARD
function loadDashboard() {
    const user = JSON.parse(sessionStorage.getItem('user')) || { name: 'Teacher' };
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>Welcome, Professor ${user.name}! 📚</h1>
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
        
        <!-- Stats -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
            <div class="stat-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white;">
                <i class="fas fa-pencil-alt" style="font-size: 30px;"></i>
                <h3 style="font-size: 28px; margin: 10px 0; color: white;">8</h3>
                <p style="color: rgba(255,255,255,0.9);">Total Exams</p>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 10px; color: white;">
                <i class="fas fa-users" style="font-size: 30px;"></i>
                <h3 style="font-size: 28px; margin: 10px 0; color: white;">45</h3>
                <p style="color: rgba(255,255,255,0.9);">Students</p>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 10px; color: white;">
                <i class="fas fa-clock" style="font-size: 30px;"></i>
                <h3 style="font-size: 28px; margin: 10px 0; color: white;">3</h3>
                <p style="color: rgba(255,255,255,0.9);">Active Exams</p>
            </div>
            <div class="stat-card" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 20px; border-radius: 10px; color: white;">
                <i class="fas fa-flag" style="font-size: 30px;"></i>
                <h3 style="font-size: 28px; margin: 10px 0; color: white;">2</h3>
                <p style="color: rgba(255,255,255,0.9);">Flagged</p>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="dashboard-card">
                <h3 style="margin-bottom: 20px; color: inherit;">📋 Recent Exams</h3>
                <div class="exam-item">
                    <p><strong>Mathematics Final</strong> - 25 students</p>
                    <small>Ends in 2 days</small>
                </div>
                <div class="exam-item">
                    <p><strong>Physics Quiz</strong> - 18 students</p>
                    <small>Active now</small>
                </div>
                <div class="exam-item">
                    <p><strong>Chemistry Mid-Term</strong> - 30 students</p>
                    <small>Starts tomorrow</small>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3 style="margin-bottom: 20px; color: inherit;">⚠️ Proctoring Alerts</h3>
                <div class="alert-item alert-warning">
                    <p><strong>John Doe</strong> - Multiple faces detected</p>
                    <small>Mathematics Exam - 2 min ago</small>
                </div>
                <div class="alert-item alert-warning">
                    <p><strong>Jane Smith</strong> - Tab switching</p>
                    <small>Physics Exam - 5 min ago</small>
                </div>
                <div class="alert-item alert-warning">
                    <p><strong>Mike Johnson</strong> - Phone detected</p>
                    <small>Chemistry Exam - 8 min ago</small>
                </div>
            </div>
        </div>
    `;
    
    initThemeToggle();
}

// CREATE EXAM PAGE
function loadCreateExam() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>✏️ Create New Exam</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <form id="createExamForm">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; color: inherit; font-weight: bold;">Exam Title</label>
                    <input type="text" placeholder="e.g., Mathematics Final Exam" class="form-input">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; color: inherit; font-weight: bold;">Description</label>
                    <textarea rows="4" placeholder="Exam details..." class="form-input"></textarea>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: inherit; font-weight: bold;">Duration (minutes)</label>
                        <input type="number" value="60" class="form-input">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: inherit; font-weight: bold;">Total Questions</label>
                        <input type="number" value="50" class="form-input">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: inherit; font-weight: bold;">Total Marks</label>
                        <input type="number" value="100" class="form-input">
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; color: inherit; font-weight: bold;">Schedule Date</label>
                    <input type="date" class="form-input">
                </div>
                
                <h3 style="margin: 30px 0 20px; color: inherit;">Add Questions</h3>
                
                <!-- Question 1 -->
                <div class="question-card">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: inherit;">Question 1</label>
                        <input type="text" placeholder="Enter question" class="form-input">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <input type="text" placeholder="Option A" class="form-input">
                        <input type="text" placeholder="Option B" class="form-input">
                        <input type="text" placeholder="Option C" class="form-input">
                        <input type="text" placeholder="Option D" class="form-input">
                    </div>
                    <select class="form-input" style="width: auto;">
                        <option>Correct Answer: A</option>
                        <option>Correct Answer: B</option>
                        <option>Correct Answer: C</option>
                        <option>Correct Answer: D</option>
                    </select>
                </div>
                
                <!-- Question 2 -->
                <div class="question-card">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: inherit;">Question 2</label>
                        <input type="text" placeholder="Enter question" class="form-input">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <input type="text" placeholder="Option A" class="form-input">
                        <input type="text" placeholder="Option B" class="form-input">
                        <input type="text" placeholder="Option C" class="form-input">
                        <input type="text" placeholder="Option D" class="form-input">
                    </div>
                    <select class="form-input" style="width: auto;">
                        <option>Correct Answer: A</option>
                        <option>Correct Answer: B</option>
                        <option>Correct Answer: C</option>
                        <option>Correct Answer: D</option>
                    </select>
                </div>
                
                <button type="button" class="btn-primary" style="margin: 20px 0; padding: 12px 30px;">
                    <i class="fas fa-plus"></i> Add More Questions
                </button>
                
                <hr style="margin: 30px 0; border-color: #404040;">
                
                <button type="submit" class="btn-primary" style="padding: 15px 40px; font-size: 18px; width: 100%;">
                    <i class="fas fa-save"></i> Create Exam
                </button>
            </form>
        </div>
    `;
    
    initThemeToggle();
}

// MANAGE EXAMS
function loadManageExams() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>📋 Manage Exams</h1>
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
                        <th>Exam Name</th>
                        <th>Date</th>
                        <th>Students</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mathematics Final</td>
                        <td>2024-01-20</td>
                        <td>25/30</td>
                        <td><span class="status-badge status-active">Active</span></td>
                        <td>
                            <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>Physics Quiz</td>
                        <td>2024-01-22</td>
                        <td>18/30</td>
                        <td><span class="status-badge status-upcoming">Upcoming</span></td>
                        <td>
                            <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>Chemistry Mid-Term</td>
                        <td>2024-01-15</td>
                        <td>28/30</td>
                        <td><span class="status-badge status-completed">Completed</span></td>
                        <td>
                            <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// MONITOR STUDENTS
function loadMonitor() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>🎥 Live Monitoring</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            <div class="monitor-card">
                <div class="camera-placeholder">
                    <i class="fas fa-video"></i>
                </div>
                <div class="monitor-info">
                    <h4>John Doe</h4>
                    <p>Mathematics Exam</p>
                    <div class="violation-badge warning">
                        ⚠️ 2 violations
                    </div>
                </div>
            </div>
            
            <div class="monitor-card">
                <div class="camera-placeholder">
                    <i class="fas fa-video"></i>
                </div>
                <div class="monitor-info">
                    <h4>Jane Smith</h4>
                    <p>Mathematics Exam</p>
                    <div class="violation-badge warning">
                        ⚠️ 1 violation
                    </div>
                </div>
            </div>
            
            <div class="monitor-card">
                <div class="camera-placeholder">
                    <i class="fas fa-video"></i>
                </div>
                <div class="monitor-info">
                    <h4>Bob Wilson</h4>
                    <p>Mathematics Exam</p>
                    <div class="violation-badge safe">
                        ✅ No violations
                    </div>
                </div>
            </div>
            
            <div class="monitor-card">
                <div class="camera-placeholder">
                    <i class="fas fa-video"></i>
                </div>
                <div class="monitor-info">
                    <h4>Alice Brown</h4>
                    <p>Physics Exam</p>
                    <div class="violation-badge warning">
                        ⚠️ 3 violations
                    </div>
                </div>
            </div>
            
            <div class="monitor-card">
                <div class="camera-placeholder">
                    <i class="fas fa-video"></i>
                </div>
                <div class="monitor-info">
                    <h4>Charlie Davis</h4>
                    <p>Physics Exam</p>
                    <div class="violation-badge safe">
                        ✅ No violations
                    </div>
                </div>
            </div>
            
            <div class="monitor-card">
                <div class="camera-placeholder">
                    <i class="fas fa-video"></i>
                </div>
                <div class="monitor-info">
                    <h4>Eve Wilson</h4>
                    <p>Chemistry Exam</p>
                    <div class="violation-badge warning">
                        ⚠️ 1 violation
                    </div>
                </div>
            </div>
        </div>
    `;
    
    initThemeToggle();
}

// RESULTS PAGE
function loadResults() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>📊 Exam Results</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <select class="form-input" style="width: 300px;">
                <option>Mathematics Final Exam</option>
                <option>Physics Quiz</option>
                <option>Chemistry Mid-Term</option>
            </select>
        </div>
        
        <div class="dashboard-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>85/100</td>
                        <td><span style="color: #10b981;">85%</span></td>
                        <td><span class="status-badge status-pass">Pass</span></td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>92/100</td>
                        <td><span style="color: #10b981;">92%</span></td>
                        <td><span class="status-badge status-pass">Pass</span></td>
                    </tr>
                    <tr>
                        <td>Bob Wilson</td>
                        <td>45/100</td>
                        <td><span style="color: #ef4444;">45%</span></td>
                        <td><span class="status-badge status-fail">Fail</span></td>
                    </tr>
                    <tr>
                        <td>Alice Brown</td>
                        <td>78/100</td>
                        <td><span style="color: #10b981;">78%</span></td>
                        <td><span class="status-badge status-pass">Pass</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// PROFILE PAGE
function loadProfile() {
    const user = JSON.parse(sessionStorage.getItem('user')) || { name: 'Teacher', email: 'teacher@example.com' };
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1>👤 My Profile</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
            <div class="dashboard-card" style="text-align: center;">
                <img src="../assets/images/avatar-placeholder.png" onerror="this.src='https://via.placeholder.com/150'" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;">
                <h3 style="margin-bottom: 5px;">${user.name}</h3>
                <p style="color: #666;">Teacher ID: TCH001</p>
                <button class="btn-primary" style="margin-top: 20px;">Change Photo</button>
            </div>
            
            <div class="dashboard-card">
                <h3 style="margin-bottom: 20px;">Personal Details</h3>
                <div class="profile-info">
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Role:</strong> Teacher</p>
                    <p><strong>Department:</strong> Mathematics</p>
                    <p><strong>Joined:</strong> Jan 2024</p>
                </div>
                <button class="btn-primary" style="margin-top: 20px;">Edit Profile</button>
            </div>
        </div>
    `;
    
    initThemeToggle();
}

function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
}