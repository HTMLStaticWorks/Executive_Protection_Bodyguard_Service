document.addEventListener('DOMContentLoaded', () => {
    // Theme toggler
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Check local storage for existing preference
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Security sites default dark
    document.documentElement.setAttribute('data-bs-theme', currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-bs-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // Active Menu Highlight Logic
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remove hardcoded active classes if any
        link.classList.remove('text-primary-brand');
        
        // Add active-page class if the href matches the current file
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active-page');
        }
    });
});
