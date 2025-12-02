// Script.js - Logic for Premium Laser Hair Removal Landing Page

// Custom Alert Function with "sk epil" title
function showCustomAlert(message) {
    const alertModal = document.getElementById('customAlertModal');
    const alertMessage = document.getElementById('alertMessage');
    const alertOkButton = document.getElementById('alertOkButton');
    
    if (!alertModal || !alertMessage || !alertOkButton) {
        // Fallback to browser alert if modal doesn't exist
        alert(message);
        return;
    }
    
    alertMessage.textContent = message;
    alertModal.classList.add('active');
    
    // Close modal when OK button is clicked
    alertOkButton.onclick = () => {
        alertModal.classList.remove('active');
    };
    
    // Close modal when clicking outside
    alertModal.onclick = (e) => {
        if (e.target === alertModal) {
            alertModal.classList.remove('active');
        }
    };
}

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

    // Modal Elements
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    const bookingDetails = document.getElementById('bookingDetails');

    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar(date) {
        calendarGrid.innerHTML = `
            <div class="mock-day-name">LUN</div>
            <div class="mock-day-name">MAR</div>
            <div class="mock-day-name">MER</div>
            <div class="mock-day-name">JEU</div>
            <div class="mock-day-name">VEN</div>
            <div class="mock-day-name">SAM</div>
            <div class="mock-day-name">DIM</div>
        `;

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
        // Adjust for Monday start (0 = Mon, 6 = Sun)
        const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
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
                selectedDate = new Date(year, month, i);
                renderTimeSlots(); // Render slots for today by default
            }

            day.addEventListener('click', () => {
                document.querySelectorAll('.mock-day').forEach(d => d.classList.remove('active'));
                day.classList.add('active');
                selectedDate = new Date(year, month, i);
                renderTimeSlots();
            });

            calendarGrid.appendChild(day);
        }
    }

    function renderTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        const startTime = 10; // 10:00
        const endTime = 19; // 19:00 (last slot will be 18:30)

        for (let hour = startTime; hour < endTime; hour++) {
            for (let min = 0; min < 60; min += 30) {
                // Skip 19:00 and 19:30 - they are after endTime anyway since hour < 19
                const timeSlot = document.createElement('div');
                timeSlot.classList.add('mock-time');

                const displayHour = hour;
                const displayMin = min === 0 ? '00' : min;
                const timeString = `${displayHour}:${displayMin}`;

                timeSlot.textContent = timeString;

                timeSlot.addEventListener('click', () => {
                    document.querySelectorAll('.mock-time').forEach(t => t.classList.remove('active'));
                    timeSlot.classList.add('active'); // Use class for active state

                    // Open Modal
                    if (selectedDate) {
                        const dateString = selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                        bookingDetails.textContent = `Vous réservez une consultation pour le ${dateString} à ${timeString}.`;
                        bookingModal.classList.add('active');
                    }
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

    // Modal Logic
    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const bookingDetailsText = bookingDetails.textContent;
        
        // Get selected date and time
        const selectedTime = document.querySelector('.mock-time.active');
        const timeString = selectedTime ? selectedTime.textContent : 'Non sélectionné';
        
        // Prepare email content
        const emailSubject = `Nouvelle réservation - ${name}`;
        const emailBody = `Nouvelle réservation reçue :

Nom complet : ${name}
Email : ${email}
Téléphone : ${phone}
${bookingDetailsText}
Heure sélectionnée : ${timeString}

---
Message envoyé depuis le site web skepil`;

        // Disable submit button to prevent double submission
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        try {
            // Extract date from bookingDetailsText
            const dateOnly = bookingDetailsText.replace('Vous réservez une consultation pour le ', '').replace(' à ' + timeString, '');
            
            // Submit to Fillout - This will automatically trigger your "Thank you email" workflow
            // The workflow will send the email automatically!
            const filloutFormUrl = 'https://forms.fillout.com/t/96f4jpqvt1us';
            
            // Create hidden iframe to submit to Fillout
            const iframe = document.createElement('iframe');
            iframe.name = 'filloutFrame';
            iframe.style.display = 'none';
            iframe.style.width = '0';
            iframe.style.height = '0';
            document.body.appendChild(iframe);
            
            // Create hidden form that submits to Fillout
            const hiddenForm = document.createElement('form');
            hiddenForm.method = 'POST';
            hiddenForm.action = filloutFormUrl;
            hiddenForm.target = 'filloutFrame';
            hiddenForm.style.display = 'none';
            
            // Add all fields matching your Fillout form exactly:
            // Based on your form: "Nom complet", "Email", "Phone number", "Date", "message"
            const filloutFields = [
                { name: 'Nom complet', value: name },
                { name: 'Email', value: email },
                { name: 'Phone number', value: phone },
                { name: 'Date', value: `${dateOnly} à ${timeString}` },
                { name: 'message', value: `Réservation pour le ${bookingDetailsText}\nHeure: ${timeString}\n\nClient: ${name}\nEmail: ${email}\nTéléphone: ${phone}` }
            ];
            
            filloutFields.forEach(field => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = field.name;
                input.value = field.value;
                hiddenForm.appendChild(input);
            });
            
            document.body.appendChild(hiddenForm);
            
            // Submit to Fillout - This triggers your workflow automatically!
            hiddenForm.submit();
            
            // Also send backup email via FormSubmit to ensure delivery
            const emailResponse = await fetch('https://formsubmit.co/ajax/skepilaser@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    subject: emailSubject,
                    message: emailBody,
                    _captcha: false,
                    _template: 'box'
                })
            });

            // Clean up hidden form and iframe after submission
            setTimeout(() => {
                if (document.body.contains(hiddenForm)) {
                    document.body.removeChild(hiddenForm);
                }
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 3000);

            // Show success message with custom alert
            showCustomAlert(`Merci ${name} ! Votre demande de réservation a été envoyée avec succès. Nous vous contacterons bientôt pour confirmer votre rendez-vous.`);
            bookingModal.classList.remove('active');
            bookingForm.reset();
            document.querySelectorAll('.mock-time').forEach(t => t.classList.remove('active'));
            
        } catch (error) {
            console.error('Error:', error);
            showCustomAlert(`Désolé, une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter directement à skepilaser@gmail.com ou +212 772 316 201`);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Initial render
    renderCalendar(currentDate);
});
