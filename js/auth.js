// js/auth.js - Using Backend API

// Login handler
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    if (!email || !password) {
        alert('❌ Please fill in all fields');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    try {
        const result = await API.auth.login(email, password);
        
        if (result.success) {
            const user = result.data.user;
            
            // Redirect based on role
            if (user.role === 'admin') {
                window.location.href = 'pages/admin-dashboard.html';
            } else if (user.role === 'teacher') {
                window.location.href = 'pages/teacher-dashboard.html';
            } else {
                window.location.href = 'pages/student-dashboard.html';
            }
        } else {
            alert(`❌ ${result.data.error || 'Login failed'}`);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
    } catch (err) {
        alert(`❌ Error: ${err.message}`);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
});

// Check authentication
function checkAuth() {
    const user = sessionStorage.getItem('user');
    const currentPage = window.location.pathname.split('/').pop();
    const publicPages = ['index.html', 'login.html', 'register.html'];
    const token = localStorage.getItem('token');

    if ((!user || !token) && !publicPages.includes(currentPage)) {
        window.location.href = '../login.html';
    }
}

if (window.location.pathname.includes('pages/')) {
    checkAuth();
}