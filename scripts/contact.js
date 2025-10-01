
// Contact form functionality
(function() {
    'use strict';

    // Form elements
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    // Initialize contact form functionality
    function initContactForm() {
        if (!contactForm) return;

        // Ensure there's an aria-live region for screen readers
        ensureAriaLiveRegion();

        // Add form submission handler
        contactForm.addEventListener('submit', handleFormSubmission);

        // Add real-time validation
        addRealTimeValidation();

        // Add form enhancement features
        addFormEnhancements();

        // Add auto-save functionality
        addAutoSave();
    }

    // Handle form submission
    async function handleFormSubmission(e) {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            showFormError('Please fill in all required fields correctly.');
            return;
        }

        // Show loading state
        showLoadingState();

        try {
            // Submit form data
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormSuccess();
                clearForm();
                clearAutoSave();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('There was an error sending your message. Please try again.');
        } finally {
            hideLoadingState();
        }
    }

    // Real-time form validation
    function addRealTimeValidation() {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');

        formInputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });

            // Clear errors on input
            input.addEventListener('input', function() {
                clearFieldError(this);
            });

            // Add visual feedback
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value.trim()) {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
        });
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');

        // Clear previous validation state
        clearFieldError(field);

        // Check required fields
        if (isRequired && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }

        // Validate email
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Validate name (no numbers or special characters)
        if (field.name === 'name' && value) {
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!nameRegex.test(value)) {
                showFieldError(field, 'Name should only contain letters and spaces');
                return false;
            }
        }

        // Validate message length
        if (field.name === 'message' && value) {
            if (value.length < 10) {
                showFieldError(field, 'Message should be at least 10 characters long');
                return false;
            }
        }

        // Mark field as valid
        field.classList.add('valid');
        return true;
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('invalid');
        field.classList.remove('valid');

        // Remove existing error message
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);

        // Add shake animation
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 500);
    }

    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('invalid');
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Validate entire form
    function validateForm() {
        const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Show loading state
    function showLoadingState() {
        contactForm.classList.add('loading');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }
    }

    // Hide loading state
    function hideLoadingState() {
        contactForm.classList.remove('loading');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
        }
    }

    // Show success message
    function showFormSuccess() {
        hideMessages();
        successMessage.style.display = 'block';
        announceStatus('Message sent successfully');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Show error message
    function showFormError(message) {
        hideMessages();
        errorMessage.querySelector('p').textContent = message;
        announceStatus('There was an error sending your message. ' + message);
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Auto-hide error message after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    // Hide all messages
    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    // Clear form
    function clearForm() {
        contactForm.reset();
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('filled', 'focused');
        });
        contactForm.querySelectorAll('.valid, .invalid').forEach(field => {
            field.classList.remove('valid', 'invalid');
        });
    }

    // Add form enhancements
    function addFormEnhancements() {
        // Add character counter for message field
        const messageField = contactForm.querySelector('#message');
        if (messageField) {
            addCharacterCounter(messageField);
        }

        // Add form progress indicator
        addFormProgress();

        // Add smart suggestions for project type
        addSmartSuggestions();
    }

    // Add character counter
    function addCharacterCounter(field) {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = `0 / ${maxLength}`;
        field.parentElement.appendChild(counter);

        field.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength} / ${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        });
    }

    // Add form progress indicator
    function addFormProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        contactForm.insertBefore(progressBar, contactForm.firstChild);

        const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');
        
        function updateProgress() {
            let filledFields = 0;
            requiredFields.forEach(field => {
                if (field.value.trim()) filledFields++;
            });
            
            const progress = (filledFields / requiredFields.length) * 100;
            progressBar.querySelector('.progress-fill').style.width = progress + '%';
        }

        requiredFields.forEach(field => {
            field.addEventListener('input', updateProgress);
        });
    }

    // Add smart suggestions
    function addSmartSuggestions() {
        const projectTypeField = contactForm.querySelector('#project-type');
        const messageField = contactForm.querySelector('#message');

        if (projectTypeField && messageField) {
            projectTypeField.addEventListener('change', function() {
                const selectedType = this.value;
                const suggestions = getProjectSuggestions(selectedType);
                
                if (suggestions && !messageField.value.trim()) {
                    messageField.placeholder = suggestions;
                }
            });
        }
    }

    // Get project type suggestions
    function getProjectSuggestions(projectType) {
        const suggestions = {
            'web-development': 'Please describe your website requirements, target audience, desired features, and any design preferences...',
            'ai-automation': 'Tell me about the process you want to automate, the data you\'re working with, and your expected outcomes...',
            'image-editing': 'Describe the type of images, editing requirements, quantity, and your preferred style or outcome...',
            'audio-video': 'Specify the media format, processing needs, quality requirements, and intended use...',
            'pdf-manipulation': 'Explain what you need to do with your PDFs, file sizes, and any specific formatting requirements...',
            'other': 'Please provide detailed information about your project, timeline, and specific requirements...'
        };
        
        return suggestions[projectType] || '';
    }

    // Auto-save functionality
    function addAutoSave() {
        const STORAGE_KEY = 'contact-form-draft';
        const formInputs = contactForm.querySelectorAll('input, textarea, select');

        // Load saved data
        function loadSavedData() {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    Object.keys(data).forEach(key => {
                        const field = contactForm.querySelector(`[name="${key}"]`);
                        if (field && data[key]) {
                            field.value = data[key];
                            field.parentElement.classList.add('filled');
                        }
                    });
                } catch (e) {
                    console.error('Error loading saved form data:', e);
                }
            }
        }

        // Save form data
        function saveFormData() {
            const data = {};
            formInputs.forEach(input => {
                if (input.name && input.value.trim()) {
                    data[input.name] = input.value;
                }
            });
            
            if (Object.keys(data).length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            }
        }

        // Auto-save on input with debounce
        let saveTimeout;
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(saveFormData, 1000);
            });
        });

        // Load saved data on page load
        loadSavedData();
    }

    // Clear auto-save
    function clearAutoSave() {
        localStorage.removeItem('contact-form-draft');
    }

    // Add CSS for form enhancements
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-group.focused label {
            color: var(--text-primary);
            transform: scale(0.9);
        }
        
        .form-group.filled label {
            transform: scale(0.9) translateY(-10px);
        }
        
        .form-group input.invalid,
        .form-group textarea.invalid,
        .form-group select.invalid {
            border-color: #ef4444;
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
        }
        
        .form-group input.valid,
        .form-group textarea.valid,
        .form-group select.valid {
            border-color: #10b981;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
        }
        
        .field-error {
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            animation: slideInFromTop 0.3s ease;
        }
        
        @keyframes slideInFromTop {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
        }
        
        .form-progress {
            width: 100%;
            height: 4px;
            background: var(--border-color);
            border-radius: 2px;
            margin-bottom: 2rem;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--text-primary), var(--text-secondary));
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 2px;
        }
        
        .character-counter {
            font-size: 0.8rem;
            color: var(--text-muted);
            text-align: right;
            margin-top: 0.25rem;
        }
        
        .character-counter.warning {
            color: #f59e0b;
        }
        
        .contact-form.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .contact-form.loading button[type="submit"] {
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(formStyle);

    // Helper: create or find an aria-live region used for announcements
    function ensureAriaLiveRegion() {
        let live = document.getElementById('aria-live-status');
        if (!live) {
            live = document.createElement('div');
            live.id = 'aria-live-status';
            live.className = 'sr-only';
            live.setAttribute('aria-live', 'polite');
            live.setAttribute('aria-atomic', 'true');
            document.body.appendChild(live);
        }
    }

    // Announce a short status message via the aria-live region
    function announceStatus(msg) {
        const live = document.getElementById('aria-live-status');
        if (!live) return;
        // Clear then set to ensure change is detected by assistive tech
        live.textContent = '';
        setTimeout(() => { live.textContent = msg; }, 50);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }

    // Export functions for global use
    window.contactFormUtils = {
        clearForm,
        validateForm,
        showFormSuccess,
        showFormError
    };

})();
