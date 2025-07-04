// Dashboard JavaScript for EduTech LMS

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('-translate-x-full');
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('hidden');
        });
        
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('open');
            sidebarOverlay.classList.add('hidden');
        });
    }

    // User menu dropdown
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userMenu = document.getElementById('user-menu');
    
    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
            userMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.add('hidden');
                userMenu.classList.remove('show');
            }
        });
    }

    // Active sidebar link management
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile sidebar if open
            if (window.innerWidth < 1024) {
                sidebar.classList.add('-translate-x-full');
                sidebar.classList.remove('open');
                sidebarOverlay.classList.add('hidden');
            }
        });
    });

    // Progress bar animations
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('[style*="width"]');
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'width 1s ease-in-out';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 200);
        });
    }

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.text-3xl');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 30; // Animation duration frames
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Initialize animations
    setTimeout(() => {
        animateProgressBars();
        animateCounters();
    }, 500);

    // Course card interactions
    const courseCards = document.querySelectorAll('.course-card, .flex.items-center.space-x-4');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Stats card hover effects
    const statsCards = document.querySelectorAll('.bg-white.rounded-xl.shadow-sm');
    statsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Table row hover effects
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9fafb';
            this.style.cursor = 'pointer';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Filter table rows if this is a search in a table context
            const table = this.closest('main')?.querySelector('table');
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    });

    // Filter functionality
    const filterSelects = document.querySelectorAll('select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterValue = this.value.toLowerCase();
            
            // Implement filtering logic based on selected option
            console.log('Filter applied:', filterValue);
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('[role="tab"], .px-4.py-2.text-sm');
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(tab => {
                tab.classList.remove('bg-blue-500', 'text-white');
                tab.classList.add('text-gray-600', 'hover:text-gray-900');
            });
            
            // Add active class to clicked tab
            this.classList.add('bg-blue-500', 'text-white');
            this.classList.remove('text-gray-600', 'hover:text-gray-900');
            
            // Show corresponding content
            // This would be implemented based on specific tab content structure
        });
    });

    // Notification handling
    const notificationBell = document.querySelector('.fa-bell');
    if (notificationBell) {
        notificationBell.parentElement.addEventListener('click', function() {
            // Show notifications dropdown or modal
            alert('Notifications feature coming soon!');
        });
    }

    // Real-time updates simulation
    function simulateRealTimeUpdates() {
        // Simulate updating progress bars
        const progressBars = document.querySelectorAll('[style*="width"]');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            if (currentWidth < 100) {
                const newWidth = Math.min(currentWidth + Math.random() * 2, 100);
                bar.style.width = newWidth + '%';
            }
        });
        
        // Update notification count occasionally
        const notificationBadge = document.querySelector('.bg-red-500.text-white');
        if (notificationBadge && Math.random() < 0.1) {
            const currentCount = parseInt(notificationBadge.textContent);
            notificationBadge.textContent = currentCount + 1;
        }
    }

    // Run real-time updates every 30 seconds
    setInterval(simulateRealTimeUpdates, 30000);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="text"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals/dropdowns
        if (e.key === 'Escape') {
            userMenu?.classList.add('hidden');
            userMenu?.classList.remove('show');
            
            if (sidebar?.classList.contains('open')) {
                sidebar.classList.add('-translate-x-full');
                sidebar.classList.remove('open');
                sidebarOverlay?.classList.add('hidden');
            }
        }
    });

    // Data persistence
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    function loadFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Save user preferences
    function saveUserPreferences() {
        const preferences = {
            sidebarCollapsed: sidebar?.classList.contains('-translate-x-full'),
            theme: document.body.classList.contains('dark') ? 'dark' : 'light'
        };
        saveToLocalStorage('userPreferences', preferences);
    }

    // Load user preferences
    function loadUserPreferences() {
        const preferences = loadFromLocalStorage('userPreferences');
        if (preferences) {
            if (preferences.sidebarCollapsed && window.innerWidth < 1024) {
                sidebar?.classList.add('-translate-x-full');
            }
            if (preferences.theme === 'dark') {
                document.body.classList.add('dark');
            }
        }
    }

    // Initialize preferences
    loadUserPreferences();
    
    // Save preferences on page unload
    window.addEventListener('beforeunload', saveUserPreferences);

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Dashboard error:', e.error);
        // Could implement error reporting here
    });

    console.log('EduTech Dashboard loaded successfully!');
});
