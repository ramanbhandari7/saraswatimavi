document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link"); // Get all nav links
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Close hamburger menu when a link is clicked (for single-page navigation)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
            // For dropdowns, don't close if it's just the toggle
            if (link.classList.contains('dropdown-toggle')) {
                // This logic is now handled by the dropdown toggle below
            }
        });
    });

    // Dropdown toggle for mobile (click instead of hover)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) { // Only apply click toggle on mobile
                event.preventDefault(); // Prevent default link behavior
                const dropdown = this.parentElement; // The .dropdown li element
                dropdown.classList.toggle('open');
                
                // Optional: Close other open dropdowns
                document.querySelectorAll('.dropdown.open').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('open');
                    }
                });
            }
        });
    });

    // Section entry transitions
    const sections = document.querySelectorAll('.page-section');

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve the element after it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Active link highlighting based on scroll (optional but nice)
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (var(--nav-height) + 50) ) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section (ignoring the #)
            if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');

                // Also activate parent dropdown toggle if the active link is inside a dropdown
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
                }
            }
            // If the link is a dropdown toggle itself, remove active state unless one of its children is active
            if (link.classList.contains('dropdown-toggle') && !link.classList.contains('active')) {
                // Check if any child is active
                let childActive = false;
                const dropdownMenu = link.nextElementSibling;
                if (dropdownMenu) {
                    dropdownMenu.querySelectorAll('a').forEach(childLink => {
                        if(childLink.getAttribute('href') && childLink.getAttribute('href').substring(1) === current) {
                            childActive = true;
                        }
                    });
                }
                if (childActive) {
                    link.classList.add('active');
                } else {
                     link.classList.remove('active'); // Ensure other dropdown toggles lose active state
                }
            }
        });
    });
});
