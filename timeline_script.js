document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const eventsContainer = document.getElementById('events-container');
    const labelsContainer = document.getElementById('labels-container');
    const timelineContainer = document.querySelector('.timeline-container');
    const progressIndicator = document.querySelector('.progress-indicator');

    // =====================================================
    // 1. FETCH AND PROCESS DATA
    // =====================================================
    
    fetch('timeline_data.json')
        .then(response => response.json())
        .then(data => {
            initTimeline(data);
        })
        .catch(error => {
            console.error('Error loading timeline data:', error);
            eventsContainer.innerHTML = '<p style="color:white; text-align:center;">Error loading data.</p>';
        });

    function initTimeline(data) {
        if (progressIndicator && timelineContainer) {
            timelineContainer.appendChild(progressIndicator);
        }

        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Group data into CLUSTERS by Year
        const clusters = [];
        let currentCluster = null;

        sortedData.forEach(item => {
            const itemYear = item.year || new Date(item.date).getFullYear().toString();
            if (!currentCluster || currentCluster.year !== itemYear) {
                currentCluster = { year: itemYear, items: [] };
                clusters.push(currentCluster);
            }
            currentCluster.items.push(item);
        });

        const totalClusters = clusters.length;
        const startTime = new Date(sortedData[0].date).getTime();
        const endTime = new Date(sortedData[sortedData.length - 1].date).getTime();
        const totalDuration = endTime - startTime;

        clusters.forEach((cluster, clusterIndex) => {
            const clusterDate = new Date(cluster.items[0].date).getTime();

            // Calculate Position
            let linearPct = totalDuration > 0 ? (clusterDate - startTime) / totalDuration : 0;
            const sequencePct = clusterIndex / (totalClusters - 1);
            const weightedPos = (sequencePct * 0.85) + (linearPct * 0.15);
            const finalPercent = weightedPos * 100;

            // Determine Position (Above/Below) based on Cluster Index
            const positionClass = clusterIndex % 2 === 0 ? 'above' : 'below';

            // --- RENDER LOGIC ---
            
            if (cluster.items.length === 1) {
                // CASE A: SINGLE EVENT
                const item = cluster.items[0];
                const lengthClass = 'len-med'; 
                const contentHtml = generateCardHtml(item);

                const eventEl = document.createElement('div');
                eventEl.classList.add('timeline-event');
                eventEl.dataset.position = finalPercent;
                
                eventEl.innerHTML = `
                    <div class="event-marker"></div>
                    <div class="event-content standalone-card ${positionClass} ${lengthClass} card-collapsed">
                        ${contentHtml}
                    </div>
                `;
                eventsContainer.appendChild(eventEl);
            } else {
                // CASE B: MULTI-EVENT
                const clusterEl = document.createElement('div');
                clusterEl.classList.add('timeline-event', 'cluster-wrapper'); 
                clusterEl.dataset.position = finalPercent;
                
                let branchesHtml = '';
                cluster.items.forEach((item, index) => {
                    const contentHtml = generateCardHtml(item);
                    const staggerPattern = ['len-short', 'len-long', 'len-med'];
                    const lengthClass = staggerPattern[index % staggerPattern.length];

                    branchesHtml += `
                        <div class="branch-node">
                            <div class="event-content ${lengthClass} card-collapsed">
                                ${contentHtml}
                            </div>
                        </div>
                    `;
                });

                clusterEl.innerHTML = `
                    <div class="event-marker"></div>
                    <div class="cluster-stem ${positionClass}"></div>
                    <div class="cluster-branches ${positionClass}">
                        ${branchesHtml}
                    </div>
                `;
                eventsContainer.appendChild(clusterEl);
            }

            // Render Year Label
            if (cluster.year) {
                const labelEl = document.createElement('span');
                labelEl.classList.add('year-label');
                labelEl.dataset.position = finalPercent;
                labelEl.textContent = cluster.year;
                labelsContainer.appendChild(labelEl);
            }
        });

        setupAnimations();
        setupInteractivity();
        setupScrollHeader(); 
    }

    function generateCardHtml(item) {
        let mediaHtml = '';
        if (item.isVideo && item.videoSrc) {
            mediaHtml = `<div class="event-media"><iframe src="${item.videoSrc}" allowfullscreen loading="lazy"></iframe></div>`;
        } else if (item.hasImage && item.imgSrc) {
            mediaHtml = `<div class="event-media"><img src="${item.imgSrc}" alt="${item.title}" loading="lazy"></div>`;
        }
        const extraHtml = item.extra ? `<div class="event-extra">${item.extra}</div>` : '';

        return `
            ${mediaHtml}
            <span class="event-date">${item.date}</span>
            <h3 class="event-title">${item.title}</h3>
            <button class="read-more-btn">Read More</button>
            <div class="card-hidden-content">
                <p class="event-description">${item.text}</p>
                ${extraHtml}
            </div>
        `;
    }

    // =====================================================
    // INTERACTIVITY (UPDATED: TIMING FIX & Z-INDEX LAYERING)
    // =====================================================
    function setupInteractivity() {
        const eventsContainer = document.getElementById('events-container');
        
        eventsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                const card = e.target.closest('.event-content');
                const isExpanded = card.classList.contains('expanded');
                const isStandalone = card.classList.contains('standalone-card');

                // 1. CLOSE OTHERS
                document.querySelectorAll('.event-content.expanded').forEach(c => {
                    c.classList.remove('expanded');
                    c.style.top = '';
                    c.style.left = '';
                    const btn = c.querySelector('.read-more-btn');
                    if(btn) btn.textContent = 'Read More';
                    const wrapper = c.closest('.timeline-event');
                    if(wrapper) {
                        wrapper.style.zIndex = ''; 
                        wrapper.classList.remove('has-expanded'); // Remove fix class
                    }
                });
                
                // 2. OPEN CLICKED
                if (!isExpanded) {
                    const parentWrapper = card.closest('.timeline-event');
                    
                    // Capture visual center (Anchor) BEFORE expansion
                    const startRect = card.getBoundingClientRect();
                    const anchorX = startRect.left + (startRect.width / 2);
                    const anchorY = startRect.top + (startRect.height / 2);

                    // Expand trigger
                    card.classList.add('expanded');
                    e.target.textContent = 'Close';
                    
                    if(parentWrapper) {
                        parentWrapper.style.zIndex = '1000';
                        parentWrapper.classList.add('has-expanded'); // Add fix class
                    }

                    // --- THE FIX: DELAY CALCULATION ---
                    // We must wait a few milliseconds for the browser to re-calculate
                    // the layout and determine the true expanded width/height.
                    setTimeout(() => {
                         // Dimensions of the expanded card (now accurate)
                        const newWidth = card.offsetWidth; 
                        const newHeight = card.offsetHeight;
                        
                        // --- INTELLIGENT BOUNDARY DETECTION ---
                        const padding = 20; // Minimum distance from screen edge
                        const winWidth = window.innerWidth;
                        const winHeight = window.innerHeight;

                        // 1. Calculate the ideal "Visual Left Edge" (centered on anchor)
                        let visualLeft = anchorX - (newWidth / 2);
                        let visualTop = anchorY - (newHeight / 2);

                        // 2. CLAMP HORIZONTAL (Prevents Right-Side Cutoff)
                        if (visualLeft + newWidth > winWidth - padding) {
                            // If it goes off the right, snap the right edge to the padding
                            visualLeft = winWidth - padding - newWidth;
                        }
                        if (visualLeft < padding) {
                            // If it goes off the left, snap to padding
                            visualLeft = padding;
                        }

                        // 3. CLAMP VERTICAL
                        if (visualTop + newHeight > winHeight - padding) {
                            visualTop = winHeight - padding - newHeight;
                        }
                        if (visualTop < padding) {
                            visualTop = padding;
                        }

                        // 4. CONVERT TO RELATIVE COORDINATES
                        const parentRect = parentWrapper.getBoundingClientRect();

                        if (isStandalone) {
                            // Standalone has translate(-50%, -50%). 'left' sets the CENTER.
                            // Convert our clamped Left Edge back to a Center coordinate.
                            const targetCenterX = visualLeft + (newWidth / 2);
                            const targetCenterY = visualTop + (newHeight / 2);

                            card.style.left = `${targetCenterX - parentRect.left}px`;
                            card.style.top = `${targetCenterY - parentRect.top}px`;
                        } else {
                            // Standard branches. 'left' sets the LEFT edge.
                            card.style.left = `${visualLeft - parentRect.left}px`;
                            card.style.top = `${visualTop - parentRect.top}px`;
                        }
                    }, 20); // 20ms delay gives the browser time to update layout

                } else {
                    // CLOSE LOGIC
                    card.classList.remove('expanded');
                    card.style.top = '';
                    card.style.left = '';
                    e.target.textContent = 'Read More';
                    const parentWrapper = card.closest('.timeline-event');
                    if(parentWrapper) {
                        parentWrapper.style.zIndex = '';
                        parentWrapper.classList.remove('has-expanded'); // Remove fix class
                    }
                }
            }
        });
    }

    // =====================================================
    // ANIMATIONS
    // =====================================================

    function positionElement(element, position) {
        const leftPadding = 5; 
        const availableWidth = 85; 
        const leftPercent = leftPadding + (position / 100) * availableWidth;
        element.style.left = `${leftPercent}vw`;
    }

    function setupAnimations() {
        const timelineSection = document.querySelector('.timeline-section');
        const timelineLine = document.querySelector('.timeline-line');
        const timelineEvents = document.querySelectorAll('.timeline-event');
        const yearLabels = document.querySelectorAll('.year-label');
        const progressFill = document.querySelector('.progress-fill');

        timelineEvents.forEach(el => positionElement(el, parseFloat(el.dataset.position)));
        yearLabels.forEach(el => positionElement(el, parseFloat(el.dataset.position)));

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: timelineSection,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    if(progressFill) progressFill.style.width = `${self.progress * 100}%`;
                }
            }
        });

        tl.to(timelineLine, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'none' }, 0);

        const paddingOffset = 0.05; 
        const widthFactor = 0.85;   

        timelineEvents.forEach(event => {
            const position = parseFloat(event.dataset.position);
            const startTime = paddingOffset + (position / 100) * widthFactor;
            tl.to(event, { opacity: 1, duration: 0.05, ease: 'power1.out' }, startTime);
        });

        yearLabels.forEach(label => {
            const position = parseFloat(label.dataset.position);
            const startTime = paddingOffset + (position / 100) * widthFactor;
            tl.to(label, { opacity: 1, duration: 0.05 }, startTime);
        });

        setupIntroAnimation();
        setupConclusionAnimation();
    }

    function setupIntroAnimation() {
        const introTl = gsap.timeline();
        introTl.from('.main-title', { opacity: 0, y: 50, duration: 1 })
               .from('.intro-text', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
               .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4');
    }

    function setupConclusionAnimation() {
        gsap.from('.conclusion-content', {
            scrollTrigger: {
                trigger: '.conclusion-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0, y: 50, duration: 1
        });
    }

    function setupScrollHeader() {
        ScrollTrigger.create({
            trigger: ".intro-section",
            start: "bottom top", 
            onEnter: () => document.body.classList.add("scrolled-past-intro"),
            onLeaveBack: () => document.body.classList.remove("scrolled-past-intro")
        });
    }
});
