// Script.js - Logic for Premium Laser Hair Removal Landing Page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully.');

    // Smooth scrolling for anchor links (if not handled by CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
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
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
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

    // Calendar Logic
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const calendarLabel = document.getElementById('calendarLabel');
    const timeSlotsContainer = document.getElementById('timeSlots');

    let currentDate = new Date();

    function renderCalendar(date) {
        calendarGrid.innerHTML = `
            <div class="mock-day-name">MON</div>
            <div class="mock-day-name">TUE</div>
            <div class="mock-day-name">WED</div>
            <div class="mock-day-name">THU</div>
            <div class="mock-day-name">FRI</div>
            <div class="mock-day-name">SAT</div>
            <div class="mock-day-name">SUN</div>
        `;

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
        // Adjust for Monday start (0 = Mon, 6 = Sun)
        const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        calendarLabel.textContent = `${monthNames[month]} ${year}`;

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('mock-day', 'empty');
            calendarGrid.appendChild(emptyDay);
        }

        // Days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('mock-day');
            day.textContent = i;

            // Highlight today
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                day.classList.add('active');
                renderTimeSlots(); // Render slots for today by default
            }

            day.addEventListener('click', () => {
                document.querySelectorAll('.mock-day').forEach(d => d.classList.remove('active'));
                day.classList.add('active');
                renderTimeSlots();
            });

            calendarGrid.appendChild(day);
        }
    }

    function renderTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        const startTime = 10; // 10:00 AM
        const endTime = 20; // 08:00 PM

        for (let hour = startTime; hour < endTime; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const timeSlot = document.createElement('div');
                timeSlot.classList.add('mock-time');

                const displayHour = hour > 12 ? hour - 12 : hour;
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const displayMin = min === 0 ? '00' : min;

                timeSlot.textContent = `${displayHour}:${displayMin} ${ampm}`;

                timeSlot.addEventListener('click', () => {
                    document.querySelectorAll('.mock-time').forEach(t => t.classList.remove('active')); // Assuming active style for time slot exists or re-using hover style logic
                    timeSlot.style.backgroundColor = 'var(--color-accent)';
                    timeSlot.style.color = 'var(--color-white)';
                    // Reset others
                    Array.from(timeSlotsContainer.children).forEach(child => {
                        if (child !== timeSlot) {
                            child.style.backgroundColor = '';
                            child.style.color = '';
                        }
                    });
                });

                timeSlotsContainer.appendChild(timeSlot);
            }
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Initial render
    renderCalendar(currentDate);
});
