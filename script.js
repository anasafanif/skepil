// Script.js - Logic for Premium Laser Hair Removal Landing Page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully.');

    // Smooth scrolling for anchor links (if not handled by CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Script.js - Logic for Premium Laser Hair Removal Landing Page

            document.addEventListener('DOMContentLoaded', () => {
                console.log('Website loaded successfully.');

                // Smooth scrolling for anchor links (if not handled by CSS)
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        document.querySelector(this.getAttribute('href')).scrollIntoView({
                            behavior: 'smooth'
                        });
                    });
                });

                // Tabs Logic
                const tabBtns = document.querySelectorAll('.tab-btn');
                const tabPanes = document.querySelectorAll('.tab-pane');

                tabBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Remove active class from all buttons and panes
                        tabBtns.forEach(b => b.classList.remove('active'));
                        tabPanes.forEach(p => p.classList.remove('active'));

                        // Add active class to clicked button
                        btn.classList.add('active');

                        // Show corresponding tab pane
                        const tabId = btn.getAttribute('data-tab');
                        document.getElementById(tabId).classList.add('active');
                    });
                });

                // Intersection Observer for Scroll Animations
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.1
                };

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target); // Only animate once
                        }
                    });
                }, observerOptions);

                const animatedElements = document.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach(el => observer.observe(el));
            });
