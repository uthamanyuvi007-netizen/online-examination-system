// js/student.js - COMPLETE FIXED VERSION

document.addEventListener('DOMContentLoaded', function() {
    console.log('Student dashboard loaded');
    
    // Add student-dashboard class to body
    document.body.classList.add('student-dashboard');
    
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
    
    // Available Exams button
    const availableExamsBtn = document.getElementById('availableExamsBtn');
    if (availableExamsBtn) {
        availableExamsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Available Exams clicked');
            setActive(this);
            loadAvailableExams();
        });
    }
    
    // Exam History button
    const examHistoryBtn = document.getElementById('examHistoryBtn');
    if (examHistoryBtn) {
        examHistoryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Exam History clicked');
            setActive(this);
            loadExamHistory();
        });
    }
    
    // Results button
    const myResultsBtn = document.getElementById('myResultsBtn');
    if (myResultsBtn) {
        console.log('Binding results button listener');
        myResultsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Results button clicked');
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
                console.error('Error running loadResults:', err);
            }
        });
    }
    
    // Profile button
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Profile clicked');
            setActive(this);
            loadProfile();
        });
    }
    
    // Logout button
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

// Function to set active menu item
function setActive(clickedElement) {
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    clickedElement.classList.add('active');
}

// Function to load dashboard
function loadDashboard() {
    console.log('Loading dashboard');
    
    const user = JSON.parse(sessionStorage.getItem('user')) || { name: 'John Student' };
    const firstName = user.name.split(' ')[0];
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1 class="dark-visible">Welcome back, <span class="dark-highlight">${firstName}</span>!</h1>
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
        
        <!-- Stats Cards -->
        <div class="stats-grid">
            <div class="stat-card">
                <i class="fas fa-clock"></i>
                <div>
                    <h3 class="dark-visible">2</h3>
                    <p class="dark-text">Upcoming Exams</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h3 class="dark-visible">5</h3>
                    <p class="dark-text">Completed Exams</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-star"></i>
                <div>
                    <h3 class="dark-visible">85%</h3>
                    <p class="dark-text">Average Score</p>
                </div>
            </div>
        </div>
        
        <!-- Available Exams -->
        <section class="exams-section">
            <h2 class="dark-visible">📝 Available Exams</h2>
            <div class="exams-grid">
                <div class="exam-card">
                    <div class="exam-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <h3>Mathematics</h3>
                        <span class="exam-badge">Today</span>
                    </div>
                    <div class="exam-body">
                        <p class="dark-text"><i class="fas fa-clock"></i> Duration: 60 mins</p>
                        <p class="dark-text"><i class="fas fa-question-circle"></i> Total Questions: 50</p>
                        <p class="dark-text"><i class="fas fa-star"></i> Total Marks: 100</p>
                        <button class="btn-start-exam" onclick="location.href='take-exam.html'">Start Exam</button>
                    </div>
                </div>
                
                <div class="exam-card">
                    <div class="exam-header" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                        <h3>Physics</h3>
                        <span class="exam-badge">Tomorrow</span>
                    </div>
                    <div class="exam-body">
                        <p class="dark-text"><i class="fas fa-clock"></i> Duration: 90 mins</p>
                        <p class="dark-text"><i class="fas fa-question-circle"></i> Total Questions: 40</p>
                        <p class="dark-text"><i class="fas fa-star"></i> Total Marks: 80</p>
                        <button class="btn-start-exam" onclick="alert('Physics exam will be available tomorrow!')">View Details</button>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    initThemeToggle();
}

// Function to load available exams
function loadAvailableExams() {
    console.log('Loading available exams');
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1 class="dark-visible">📚 Available Exams</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div class="exams-grid">
            <div class="exam-card">
                <div class="exam-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <h3>Mathematics Final</h3>
                </div>
                <div class="exam-body">
                    <p class="dark-text"><i class="fas fa-calendar"></i> Date: Today</p>
                    <p class="dark-text"><i class="fas fa-clock"></i> Duration: 60 mins</p>
                    <p class="dark-text"><i class="fas fa-question-circle"></i> Questions: 50</p>
                    <p class="dark-text"><i class="fas fa-star"></i> Marks: 100</p>
                    <button class="btn-start-exam" onclick="location.href='take-exam.html'">Start Exam</button>
                </div>
            </div>
            
            <div class="exam-card">
                <div class="exam-header" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <h3>Physics Quiz</h3>
                </div>
                <div class="exam-body">
                    <p class="dark-text"><i class="fas fa-calendar"></i> Date: Tomorrow</p>
                    <p class="dark-text"><i class="fas fa-clock"></i> Duration: 90 mins</p>
                    <p class="dark-text"><i class="fas fa-question-circle"></i> Questions: 40</p>
                    <p class="dark-text"><i class="fas fa-star"></i> Marks: 80</p>
                    <button class="btn-start-exam" onclick="alert('Physics exam starts tomorrow!')">Notify Me</button>
                </div>
            </div>
            
            <div class="exam-card">
                <div class="exam-header" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <h3>Chemistry Mid-Term</h3>
                </div>
                <div class="exam-body">
                    <p class="dark-text"><i class="fas fa-calendar"></i> Date: Next Week</p>
                    <p class="dark-text"><i class="fas fa-clock"></i> Duration: 75 mins</p>
                    <p class="dark-text"><i class="fas fa-question-circle"></i> Questions: 45</p>
                    <p class="dark-text"><i class="fas fa-star"></i> Marks: 90</p>
                    <button class="btn-start-exam" onclick="alert('Chemistry exam will be available next week!')">Remind Me</button>
                </div>
            </div>
        </div>
    `;
    
    initThemeToggle();
}

// Function to load exam history
function loadExamHistory() {
    console.log('Loading exam history');
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1 class="dark-visible">📋 Exam History</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div class="exams-section" style="padding: 0; overflow: hidden;">
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="dark-text">Mathematics Final</td>
                        <td class="dark-text">2024-01-10</td>
                        <td class="dark-text" style="color: #10b981;">85%</td>
                        <td><span class="status-badge status-pass">Passed</span></td>
                        <td><button class="action-btn edit-btn" onclick="location.href='exam-results.html'">View</button></td>
                    </tr>
                    <tr>
                        <td class="dark-text">Physics Quiz</td>
                        <td class="dark-text">2024-01-05</td>
                        <td class="dark-text" style="color: #ef4444;">45%</td>
                        <td><span class="status-badge status-fail">Failed</span></td>
                        <td><button class="action-btn edit-btn" onclick="alert('Retake available next week!')">Retake</button></td>
                    </tr>
                    <tr>
                        <td class="dark-text">Chemistry Mid-Term</td>
                        <td class="dark-text">2023-12-20</td>
                        <td class="dark-text" style="color: #10b981;">92%</td>
                        <td><span class="status-badge status-pass">Passed</span></td>
                        <td><button class="action-btn edit-btn" onclick="location.href='exam-results.html'">View</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// Function to load results - FIXED VERSION
function loadResults() {
    console.log('Loading results page');
    
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) {
        console.error('Main content not found');
        return;
    }
    
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1 class="dark-visible">📊 My Results</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <i class="fas fa-chart-line"></i>
                <div>
                    <h3 class="dark-visible">85%</h3>
                    <p class="dark-text">Average Score</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-trophy"></i>
                <div>
                    <h3 class="dark-visible">3</h3>
                    <p class="dark-text">Certificates</p>
                </div>
            </div>
        </div>
        
        <div class="exams-section">
            <h2 class="dark-visible">📈 Performance Overview</h2>
            <div style="padding: 1rem;">
                <div style="margin-bottom: 1rem;">
                    <span class="dark-text">Mathematics</span>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <progress value="85" max="100" style="flex: 1; height: 10px;"></progress>
                        <span class="dark-visible" style="font-weight: bold;">85%</span>
                    </div>
                </div>
                <div style="margin-bottom: 1rem;">
                    <span class="dark-text">Physics</span>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <progress value="45" max="100" style="flex: 1; height: 10px;"></progress>
                        <span class="dark-visible" style="font-weight: bold;">45%</span>
                    </div>
                </div>
                <div style="margin-bottom: 1rem;">
                    <span class="dark-text">Chemistry</span>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <progress value="92" max="100" style="flex: 1; height: 10px;"></progress>
                        <span class="dark-visible" style="font-weight: bold;">92%</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Recent Results Table -->
        <div class="exams-section" style="margin-top: 20px;">
            <h2 class="dark-visible">📋 Recent Exam Results</h2>
            <table style="width: 100%; margin-top: 15px;">
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="dark-text">Mathematics Final</td>
                        <td class="dark-text">2024-01-10</td>
                        <td class="dark-text" style="color: #10b981;">85/100</td>
                        <td><span class="status-badge status-pass">Pass</span></td>
                    </tr>
                    <tr>
                        <td class="dark-text">Physics Quiz</td>
                        <td class="dark-text">2024-01-05</td>
                        <td class="dark-text" style="color: #ef4444;">45/100</td>
                        <td><span class="status-badge status-fail">Fail</span></td>
                    </tr>
                    <tr>
                        <td class="dark-text">Chemistry Mid-Term</td>
                        <td class="dark-text">2023-12-20</td>
                        <td class="dark-text" style="color: #10b981;">92/100</td>
                        <td><span class="status-badge status-pass">Pass</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    initThemeToggle();
}

// Expose function on window to avoid name resolution issues across pages
if (typeof window !== 'undefined') window.loadResults = loadResults;

// Function to load profile
function loadProfile() {
    console.log('Loading profile');
    
    const user = JSON.parse(sessionStorage.getItem('user')) || { name: 'John Student', email: 'student@example.com' };
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="dashboard-header">
            <h1 class="dark-visible">👤 My Profile</h1>
            <div class="header-actions">
                <div class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-sun"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
            <div class="exams-section" style="text-align: center;">
                <img src="../assets/images/avatar-placeholder.png" onerror="this.src='https://via.placeholder.com/150'" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 1rem;">
                <h3 class="dark-visible">${user.name}</h3>
                <p class="dark-text">Student ID: STU001</p>
                <button class="btn-start-exam" style="margin-top: 1rem;" onclick="alert('Profile picture upload feature coming soon!')">Change Photo</button>
            </div>
            
            <div class="exams-section">
                <h2 class="dark-visible">📋 Personal Information</h2>
                <div style="padding: 1rem;">
                    <div style="margin-bottom: 1rem;">
                        <label style="font-weight: bold; display: block; color: inherit;">Full Name</label>
                        <p class="dark-text">${user.name}</p>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="font-weight: bold; display: block; color: inherit;">Email</label>
                        <p class="dark-text">${user.email}</p>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="font-weight: bold; display: block; color: inherit;">Phone</label>
                        <p class="dark-text">+91 98765 43210</p>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="font-weight: bold; display: block; color: inherit;">Date of Birth</label>
                        <p class="dark-text">01/01/2000</p>
                    </div>
                    <button class="btn-start-exam" onclick="alert('Edit profile feature coming soon!')">Edit Profile</button>
                </div>
            </div>
        </div>
    `;
    
    initThemeToggle();
}

// Function to initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Remove existing listeners
        const newToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newToggle, themeToggle);
        
        newToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}