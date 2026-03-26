document.addEventListener('DOMContentLoaded', () => {
    // Theme toggler
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-bs-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // RTL Toggler
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const bootstrapLink = document.getElementById('bootstrap-link');
    
    // Check for RTL preference
    const currentRtl = localStorage.getItem('rtl') === 'true';
    if (currentRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
        if (bootstrapLink) bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                document.documentElement.removeAttribute('dir');
                if (bootstrapLink) bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
                localStorage.setItem('rtl', 'false');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                if (bootstrapLink) bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
                localStorage.setItem('rtl', 'true');
            }
        });
    });

    // Active Menu Highlight Logic
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Intelligent Parent Mapping
    const parentMap = {
        'service-details.html': 'services.html',
        'blog-details.html': 'blog.html', // Highlight blog if detail is open
        'pricing.html': 'services.html',
        'home-2.html': 'home-2.html',
        'index.html': 'index.html'
    };

    const targetLink = parentMap[currentLocation] || currentLocation;

    navLinks.forEach(link => {
        link.classList.remove('active-page');
        link.classList.remove('text-primary-brand'); // Cleanup old classes if present
        
        const href = link.getAttribute('href');
        if (href === targetLink) {
            link.classList.add('active-page');
        }
    });

    // Scroll to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');

    const getScrollContainers = () => {
        return [
            window,
            document.querySelector('.scrollable-content'),
            document.querySelector('.portal-main-content')
        ].filter(el => el !== null);
    };

    const handleScroll = () => {
        const containers = getScrollContainers();
        let show = false;
        
        containers.forEach(container => {
            const scrollTop = container === window ? window.scrollY : container.scrollTop;
            if (scrollTop > 300) show = true;
        });

        if (show) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    if (backToTopBtn) {
        const containers = getScrollContainers();
        
        containers.forEach(container => {
            container.addEventListener('scroll', handleScroll);
        });

        backToTopBtn.addEventListener('click', () => {
            const containers = getScrollContainers();
            containers.forEach(container => {
                const scrollTop = container === window ? window.scrollY : container.scrollTop;
                if (scrollTop > 0) {
                    container.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
});
