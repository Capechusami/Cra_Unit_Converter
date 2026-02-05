// Temperature Conversion with Animation
function temperature() {
    const celsiusInput = document.getElementById("celsius");
    const fahrenheitInput = document.getElementById("fahrenheit");
    const celsius = celsiusInput.value;
    
    if (celsius === "" || celsius === null) {
        fahrenheitInput.value = "";
        return;
    }
    
    const c = parseFloat(celsius);
    const f = (c * 9/5) + 32;
    
    // Animate the result
    animateValue(fahrenheitInput, parseFloat(fahrenheitInput.value) || 0, f, 300);
    
    // Add success feedback
    addSuccessFeedback(fahrenheitInput);
}

// Weight Conversion with Animation
function weight() {
    const kiloInput = document.getElementById("kilo");
    const poundsInput = document.getElementById("pounds");
    const kilo = kiloInput.value;
    
    if (kilo === "" || kilo === null) {
        poundsInput.value = "";
        return;
    }
    
    const kg = parseFloat(kilo);
    const p = kg * 2.2;
    
    // Animate the result
    animateValue(poundsInput, parseFloat(poundsInput.value) || 0, p, 300);
    
    // Add success feedback
    addSuccessFeedback(poundsInput);
}

// Distance Conversion with Animation
function distance() {
    const kmInput = document.getElementById("km");
    const milesInput = document.getElementById("miles");
    const km = kmInput.value;
    
    if (km === "" || km === null) {
        milesInput.value = "";
        return;
    }
    
    const kilometers = parseFloat(km);
    const m = kilometers * 0.62137;
    
    // Animate the result
    animateValue(milesInput, parseFloat(milesInput.value) || 0, m, 300);
    
    // Add success feedback
    addSuccessFeedback(milesInput);
}

// Animate number values
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        element.value = current.toFixed(2);
    }, 16);
}

// Add success feedback animation
function addSuccessFeedback(element) {
    element.style.borderColor = '#10b981';
    element.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        element.style.borderColor = '';
        element.style.transform = '';
    }, 300);
}

// Add input validation and formatting
function validateNumberInput(event) {
    const input = event.target;
    const value = input.value;
    
    // Remove any non-numeric characters except decimal point and minus sign
    input.value = value.replace(/[^0-9.-]/g, '');
    
    // Prevent multiple decimal points
    const parts = input.value.split('.');
    if (parts.length > 2) {
        input.value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Prevent multiple minus signs
    if ((input.value.match(/-/g) || []).length > 1) {
        input.value = input.value.replace(/(?!^)-/g, '');
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('[v0] Unit Converter initialized');
    
    // Temperature real-time conversion
    const celsiusInput = document.getElementById("celsius");
    if (celsiusInput) {
        celsiusInput.addEventListener('input', function(e) {
            validateNumberInput(e);
            temperature();
        });
        
        // Add keyboard shortcuts
        celsiusInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                temperature();
            }
        });
    }
    
    // Weight real-time conversion
    const kiloInput = document.getElementById("kilo");
    if (kiloInput) {
        kiloInput.addEventListener('input', function(e) {
            validateNumberInput(e);
            weight();
        });
        
        kiloInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                weight();
            }
        });
    }
    
    // Distance real-time conversion
    const kmInput = document.getElementById("km");
    if (kmInput) {
        kmInput.addEventListener('input', function(e) {
            validateNumberInput(e);
            distance();
        });
        
        kmInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                distance();
            }
        });
    }
    
    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Add fade-in animation for cards on scroll
    observeElements();
    
    // Add particle effect on hover (optional enhancement)
    addCardHoverEffects();
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    console.log('[v0] All event listeners attached successfully');
});

// Scroll to top function with smooth animation
function scrollToTop() {
    const scrollDuration = 600;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// Observe elements for fade-in animation
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);
    
    const cards = document.querySelectorAll('.converter-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.converter-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
        
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add keyboard navigation support
function addKeyboardNavigation() {
    const inputs = document.querySelectorAll('.input-field:not([readonly])');
    
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            // Tab or Arrow Down: Move to next input
            if ((e.key === 'Tab' && !e.shiftKey) || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % inputs.length;
                inputs[nextIndex].focus();
            }
            
            // Shift+Tab or Arrow Up: Move to previous input
            if ((e.key === 'Tab' && e.shiftKey) || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + inputs.length) % inputs.length;
                inputs[prevIndex].focus();
            }
        });
    });
}

// Add clear button functionality (bonus feature)
function addClearButtons() {
    const converterCards = document.querySelectorAll('.converter-card');
    
    converterCards.forEach(card => {
        const inputs = card.querySelectorAll('.input-field');
        
        inputs.forEach(input => {
            if (!input.readOnly) {
                input.addEventListener('dblclick', function() {
                    this.value = '';
                    const card = this.closest('.converter-card');
                    const outputs = card.querySelectorAll('.output-field');
                    outputs.forEach(output => output.value = '');
                });
            }
        });
    });
}

// Initialize clear functionality
document.addEventListener('DOMContentLoaded', addClearButtons);

// Add copy to clipboard functionality
function addCopyFunctionality() {
    const outputFields = document.querySelectorAll('.output-field');
    
    outputFields.forEach(output => {
        output.addEventListener('click', function() {
            if (this.value) {
                navigator.clipboard.writeText(this.value).then(() => {
                    // Show temporary tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Copied!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background: #10b981;
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 0.5rem;
                        font-size: 0.875rem;
                        font-weight: 600;
                        pointer-events: none;
                        z-index: 1000;
                        animation: fadeInOut 2s ease;
                    `;
                    
                    const rect = this.getBoundingClientRect();
                    tooltip.style.top = `${rect.top - 40}px`;
                    tooltip.style.left = `${rect.left + rect.width / 2 - 30}px`;
                    
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            }
        });
        
        // Add visual hint on hover
        output.style.cursor = 'pointer';
        output.title = 'Click to copy';
    });
}

// Add fade in/out animation for tooltips
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Initialize copy functionality
document.addEventListener('DOMContentLoaded', addCopyFunctionality);

// Log successful initialization
console.log('[v0] Enhanced Unit Converter loaded successfully with all features');
