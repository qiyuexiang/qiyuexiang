/**
 * QIYUEXIANG - Main JavaScript
 * Global Trading & Mobile Solutions
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const animatedElements = document.querySelectorAll('[data-animate]');
    const faqItems = document.querySelectorAll('.faq-item');
    const newsletterForm = document.querySelector('.newsletter-form');
    const contactForm = document.querySelector('.contact-form');

    // ========================================
    // Header Scroll Effect
    // ========================================
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            animatedElements.forEach(el => {
                el.classList.add('animated');
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ========================================
    // FAQ Accordion
    // ========================================
    function initFAQ() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    // Close other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }

    // ========================================
    // Newsletter Form
    // ========================================
    function initNewsletterForm() {
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                if (emailInput && emailInput.value) {
                    // Simulate form submission
                    alert('Thank you for subscribing! We will keep you updated.');
                    emailInput.value = '';
                }
            });
        }
    }

    // ========================================
    // Contact Form
    // ========================================
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#ff4444';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                // Email validation
                const emailField = this.querySelector('input[type="email"]');
                if (emailField && emailField.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(emailField.value)) {
                        isValid = false;
                        emailField.style.borderColor = '#ff4444';
                    }
                }
                
                if (isValid) {
                    // Simulate form submission
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    this.reset();
                } else {
                    alert('Please fill in all required fields correctly.');
                }
            });
        }
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // Active Navigation Link
    // ========================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (navMenu) {
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage || 
                    (currentPage === '' && linkPage === 'index.html') ||
                    (currentPage === '/' && linkPage === 'index.html')) {
                    link.classList.add('active');
                }
            });
        }
    }

    // ========================================
    // Products Auto-Scroll
    // ========================================
    function initProductsScroll() {
        const track = document.querySelector('.products-track');
        if (track) {
            // Clone items for infinite scroll effect
            const items = track.innerHTML;
            track.innerHTML = items + items;
        }
    }

    // ========================================
    // Phone Mockup Animation
    // ========================================
    function initPhoneAnimations() {
        const phones = document.querySelectorAll('.showcase-phone, .phone-mockup');
        phones.forEach((phone, index) => {
            // Add staggered animation delay
            phone.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // ========================================
    // Counter Animation
    // ========================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => {
                observer.observe(counter);
            });
        }
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }

    // ========================================
    // Chart Bar Animation
    // ========================================
    function initChartAnimations() {
        const bars = document.querySelectorAll('.chart-bar, .showcase-chart .bar');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            bars.forEach(bar => {
                observer.observe(bar);
            });
        }
    }

    // ========================================
    // Lazy Load Images
    // ========================================
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback: load all images immediately
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ========================================
    // Form Input Validation Styles
    // ========================================
    function initFormValidation() {
        const formInputs = document.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '';
                }
            });
        });
    }

    // ========================================
    // Keyboard Navigation for FAQ
    // ========================================
    function initKeyboardNav() {
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.classList.toggle('active');
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextItem = faqItems[index + 1];
                        if (nextItem) {
                            nextItem.querySelector('.faq-question').focus();
                        }
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevItem = faqItems[index - 1];
                        if (prevItem) {
                            prevItem.querySelector('.faq-question').focus();
                        } else {
                            question.blur();
                        }
                    }
                });
            }
        });
    }

    // ========================================
    // Performance: Throttle Scroll Events
    // ========================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ========================================
    // Initialize All Functions
    // ========================================
    function init() {
        handleScroll();
        initScrollAnimations();
        initFAQ();
        initNewsletterForm();
        initContactForm();
        initSmoothScroll();
        setActiveNavLink();
        initProductsScroll();
        initPhoneAnimations();
        initCounterAnimation();
        initChartAnimations();
        initLazyLoad();
        initFormValidation();
        initKeyboardNav();
        
        // Log initialization
        console.log('QIYUEXIANG website initialized successfully');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
