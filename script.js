document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link'); // For closing menu on link click
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown .dropdown-toggle');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded.toString());

            // Close any open mobile dropdowns when main menu is closed
            if (!isExpanded) {
                document.querySelectorAll('.nav-item.dropdown.open').forEach(openDropdown => {
                    openDropdown.classList.remove('open');
                    const toggle = openDropdown.querySelector('.dropdown-toggle');
                    const submenu = openDropdown.querySelector('.dropdown-menu');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    if (submenu) submenu.classList.remove('open'); // Ensure submenu is also closed
                });
            }
        });
    }

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) { // Only if mobile menu is active
                // If it's not a dropdown toggle, close the menu
                if (!link.classList.contains('dropdown-toggle')) {
                    if (hamburger) {
                        hamburger.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                    }
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Mobile Dropdown Toggle (click to open/close)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only activate this behavior for mobile view (when hamburger is visible)
            if (hamburger && window.getComputedStyle(hamburger).display !== 'none') {
                e.preventDefault(); // Prevent link navigation
                const parentDropdown = toggle.parentElement; // .nav-item.dropdown
                const submenu = parentDropdown.querySelector('.dropdown-menu');
                
                if (parentDropdown && submenu) {
                    parentDropdown.classList.toggle('open');
                    submenu.classList.toggle('open'); // This class controls display in CSS for mobile
                    
                    const isSubmenuOpen = parentDropdown.classList.contains('open');
                    toggle.setAttribute('aria-expanded', isSubmenuOpen.toString());
                }
            }
        });
    });
    
    // Close mobile menu if clicked outside of it
    document.addEventListener('click', (event) => {
        if (navMenu && hamburger && navMenu.classList.contains('active')) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                 // Close any open mobile dropdowns
                document.querySelectorAll('.nav-item.dropdown.open').forEach(openDropdown => {
                    openDropdown.classList.remove('open');
                    const toggle = openDropdown.querySelector('.dropdown-toggle');
                    const submenu = openDropdown.querySelector('.dropdown-menu');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    if (submenu) submenu.classList.remove('open');
                });
            }
        }
    });

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
