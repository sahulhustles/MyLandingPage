
// Theme switching functionality
(function() {
    'use strict';

    // Theme configuration
    const themes = {
        light: {
            name: 'light',
            icon: 'fas fa-moon',
            title: 'Switch to dark mode'
        },
        dark: {
            name: 'dark',
            icon: 'fas fa-sun',
            title: 'Switch to light mode'
        }
    };

    // Get theme elements
    const themeToggle = document.getElementById('theme-btn');
    const body = document.body;
    const html = document.documentElement;

    // Initialize theme
    function initTheme() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let currentTheme = 'light';
        
        if (savedTheme) {
            currentTheme = savedTheme;
        } else if (prefersDark) {
            currentTheme = 'dark';
        }
        
        setTheme(currentTheme);
    }

    // Set theme function
    function setTheme(themeName) {
        const theme = themes[themeName];
        
        if (!theme) return;
        
        // Update HTML data attribute
        html.setAttribute('data-theme', theme.name);
        
        // Update button icon and title
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme.name === 'light' ? themes.dark.icon : themes.light.icon;
            }
            themeToggle.setAttribute('title', theme.name === 'light' ? themes.dark.title : themes.light.title);
            themeToggle.setAttribute('aria-label', theme.name === 'light' ? themes.dark.title : themes.light.title);
        }
        
        // Save theme preference
        localStorage.setItem('portfolio-theme', theme.name);
        
        // Dispatch custom event for theme change
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme.name }
        }));
        
        // Add animation class for smooth transition
        body.classList.add('theme-transitioning');
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 300);
    }

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        
        // Add visual feedback
        if (themeToggle) {
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        }
    }

    // Event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Keyboard support
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (!savedTheme) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Initialize theme when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Add CSS for theme transitions
    const style = document.createElement('style');
    style.textContent = `
        .theme-transitioning * {
            transition: background-color 0.3s ease, 
                       color 0.3s ease, 
                       border-color 0.3s ease,
                       box-shadow 0.3s ease !important;
        }
        
        #theme-btn {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Smooth theme transition for specific elements */
        .navbar,
        .hero-section,
        .page-content,
        .footer,
        .card,
        .btn,
        .form-group input,
        .form-group textarea,
        .form-group select {
            transition: background-color 0.3s ease, 
                       color 0.3s ease, 
                       border-color 0.3s ease,
                       box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Advanced theme features
    const themeUtils = {
        // Get current theme
        getCurrentTheme: function() {
            return html.getAttribute('data-theme') || 'light';
        },
        
        // Check if dark mode is active
        isDarkMode: function() {
            return this.getCurrentTheme() === 'dark';
        },
        
        // Set theme with animation options
        setThemeWithAnimation: function(themeName, animationType = 'fade') {
            if (animationType === 'slide') {
                body.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    setTheme(themeName);
                    body.style.transform = 'translateX(0)';
                }, 150);
            } else {
                setTheme(themeName);
            }
        },
        
        // Auto theme based on time
        setAutoTheme: function() {
            const hour = new Date().getHours();
            const isDayTime = hour >= 6 && hour < 18;
            setTheme(isDayTime ? 'light' : 'dark');
        }
    };

    // Expose theme utilities globally
    window.themeUtils = themeUtils;

    // Add theme-based particle effects
    function addThemeParticles() {
        const currentTheme = themeUtils.getCurrentTheme();
        const particleColor = currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
        
        // Create particle container if it doesn't exist
        let particleContainer = document.querySelector('.theme-particles');
        if (!particleContainer) {
            particleContainer = document.createElement('div');
            particleContainer.className = 'theme-particles';
            particleContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.5;
            `;
            document.body.appendChild(particleContainer);
        }
        
        // Clear existing particles
        particleContainer.innerHTML = '';
        
        // Add new particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: ${particleColor};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${5 + Math.random() * 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) scale(1);
                opacity: 0.5;
            }
            25% { 
                transform: translateY(-20px) translateX(10px) scale(1.2);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-40px) translateX(-5px) scale(0.8);
                opacity: 0.3;
            }
            75% { 
                transform: translateY(-20px) translateX(-15px) scale(1.1);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Listen for theme changes to update particles
    window.addEventListener('themeChanged', function(e) {
        setTimeout(addThemeParticles, 300); // Delay to allow theme transition
    });

    // Add particles on initial load
    setTimeout(addThemeParticles, 1000);

    // Accessibility improvements
    function announceThemeChange(themeName) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = `Theme switched to ${themeName} mode`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Listen for theme changes to announce them
    window.addEventListener('themeChanged', function(e) {
        announceThemeChange(e.detail.theme);
    });

})();
