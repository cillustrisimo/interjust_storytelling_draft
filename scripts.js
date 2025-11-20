/**
 * SCRIPTS.JS 
 * Logic for Scrollytelling (Focus/Zoom) and Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ===============================================
    GLOSSARY TO SIDEBAR TRANSITION LOGIC
    =============================================== */
    const glossarySection = document.getElementById('glossary');
    const sideNav = document.getElementById('side-nav');

    if (glossarySection && sideNav) {
        const glossaryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Logic: If the glossary is NO LONGER intersecting 
                // and we are below it (boundingClientRect.top is negative), show sidebar.
                const isBelow = entry.boundingClientRect.top < 0;
                
                if (!entry.isIntersecting && isBelow) {
                    sideNav.classList.add('is-visible');
                } else {
                    sideNav.classList.remove('is-visible');
                }
            });
        }, {
            root: null,
            /* CHANGED: 
               -100px at the top creates a "buffer zone". 
               The observer considers the glossary "invisible" 
               once it enters the top 100px of the screen. 
               This ensures the sidebar triggers trigger BEFORE 
               the glossary is 100% gone. */
            rootMargin: "-100px 0px 0px 0px", 
            threshold: 0 
        });

        glossaryObserver.observe(glossarySection);
    }
    
    /* ===============================================
       SCROLLYTELLING LOGIC 
       =============================================== */
    
    // Find all scrollytelling sections
    const scrollySections = document.querySelectorAll('[id^="scrolly-section-"]');
    
    scrollySections.forEach(section => {
        const sectionId = section.id;
        const chartWrapper = section.querySelector('.chart-wrapper');
        const steps = section.querySelectorAll('.step');
        
        if (!chartWrapper || steps.length === 0) return;
        
        console.log(`Initializing scrollytelling for ${sectionId}`);

        const config = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    const action = step.getAttribute('data-action');
                    const target = step.getAttribute('data-target');
                    
                    // Find the correct chart wrapper for this step
                    const targetWrapper = target ? 
                        document.getElementById(target)?.closest('.chart-wrapper') : 
                        chartWrapper;
                    
                    if (targetWrapper) {
                        // Apply zoom/reset action
                        if (action === 'zoom') {
                            targetWrapper.classList.add('is-zoomed');
                        } else if (action === 'reset') {
                            targetWrapper.classList.remove('is-zoomed');
                        }
                    }

                    // Update active card styling
                    steps.forEach(s => {
                        const card = s.querySelector('.card');
                        if (card) card.classList.remove('is-active');
                    });
                    
                    const card = step.querySelector('.card');
                    if (card) card.classList.add('is-active');
                }
            });
        }, config);

        steps.forEach(step => observer.observe(step));
    });

    /* ===============================================
       SMOOTH SCROLL
       =============================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});