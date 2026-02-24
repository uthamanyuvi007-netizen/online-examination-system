// js/auth.js
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store user info
        sessionStorage.setItem('user', JSON.stringify({
            id: user.id || Date.now(),
            name: user.name,
            email: user.email,
            role: user.role
        }));
        
        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = 'pages/admin-dashboard.html';
        } else if (user.role === 'teacher') {
            window.location.href = 'pages/teacher-dashboard.html';
        } else {
            window.location.href = 'pages/student-dashboard.html';
        }
    } 
    else {
        // Demo accounts
        if (email === 'admin@example.com' && password === 'admin123') {
            sessionStorage.setItem('user', JSON.stringify({
                name: 'Admin User',
                email: email,
                role: 'admin'
            }));
            window.location.href = 'pages/admin-dashboard.html';
        } 
        else if (email === 'teacher@example.com' && password === 'teacher123') {
            sessionStorage.setItem('user', JSON.stringify({
                name: 'Professor Kumar',
                email: email,
                role: 'teacher'
            }));
            window.location.href = 'pages/teacher-dashboard.html';
        }
        else if (email === 'student@example.com' && password === 'password123') {
            sessionStorage.setItem('user', JSON.stringify({
                name: 'John Student',
                email: email,
                role: 'student'
            }));
            window.location.href = 'pages/student-dashboard.html';
        } 
        else {
            alert('❌ Invalid credentials');
        }
    }
});

// Check authentication
function checkAuth() {
    const user = sessionStorage.getItem('user');
    const currentPage = window.location.pathname.split('/').pop();
    const publicPages = ['index.html', 'login.html', 'register.html'];
    
    if (!user && !publicPages.includes(currentPage)) {
        window.location.href = '../login.html';
    }
}

if (window.location.pathname.includes('pages/')) {
    checkAuth();
}