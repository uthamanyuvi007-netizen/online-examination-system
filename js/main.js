// js/main.js

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================
    // THEME TOGGLE FUNCTIONALITY
    // =====================================
    
    // Get the theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    
    // Only run if toggle button exists on this page
    if (themeToggle) {
        
        // Check if user had saved a theme before
        const savedTheme = localStorage.getItem('theme');
        
        // If they saved dark mode before, apply it
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        
        // When user clicks the toggle button
        themeToggle.addEventListener('click', function() {
            
            // Toggle dark mode class on body
            document.body.classList.toggle('dark-mode');
            
            // Check if dark mode is now active
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Save the preference
            if (isDarkMode) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // =====================================
    // SMOOTH SCROLLING
    // =====================================
    
    // Smooth scrolling for anchor links (skip empty anchors '#')
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; // skip placeholders
            e.preventDefault();
            let target = null;
            try {
                target = document.querySelector(href);
            } catch (err) {
                // invalid selector -> skip
                return;
            }
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // =====================================
    // ACTIVE NAVIGATION
    // =====================================
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a, .sidebar-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        }
    });
});