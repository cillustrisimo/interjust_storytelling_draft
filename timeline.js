// Timeline data - replace with your actual data
const timelineData = [
    {
        year: '2010',
        title: 'Lorem ipsum dolor',
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim et mauris at mauris egestas. Leo egestas erat purus elit ultrices armet ac. Congue porttitor non velit mattis sed.',
        fullText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        side: 'right'
    },
    {
        year: '2015',
        title: 'Lorem ipsum dolor',
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim et mauris at mauris egestas. Leo egestas erat purus elit ultrices armet ac. Congue porttitor non velit mattis sed.',
       fullText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        year: '2016',
        title: 'Lorem ipsum dolor',
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim et mauris at mauris egestas. Leo egestas erat purus elit ultrices armet ac. Congue porttitor non velit mattis sed.',
fullText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        side: 'right'
    },
    {
        year: '2017',
        title: 'Lorem ipsum dolor',
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim et mauris at mauris egestas. Leo egestas erat purus elit ultrices armet ac. Congue porttitor non velit mattis sed.',
fullText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        side: 'left'
    },
    {
        year: '2018',
        title: 'Lorem ipsum dolor',
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim et mauris at mauris egestas. Leo egestas erat purus elit ultrices armet ac. Congue porttitor non velit mattis sed.',
fullText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        side: 'right'
    },
    {
        year: '2019',
        title: 'Lorem ipsum dolor',
        shortText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim et mauris at mauris egestas. Leo egestas erat purus elit ultrices armet ac. Congue porttitor non velit mattis sed.',
        fullText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        side: 'left'
    }
];

// Initialize timeline
function initTimeline() {
    const container = document.getElementById('timeline-container');
    const eventsContainer = document.getElementById('timeline-events');
    const svg = d3.select('#timeline-svg');
    
    // Calculate timeline height based on events
    // Increase spacing significantly so events aren't all visible at once
    const eventHeight = 400; // Increased from 150 to 400
    const lastEventPosition = (timelineData.length - 1) * eventHeight;
    const totalHeight = lastEventPosition + 100; // Line extends to last event + small margin
    
    // Update container height to match
    container.style.minHeight = `${totalHeight + 100}px`;
    
    svg.attr('height', totalHeight);
    
    // Create the vertical line path
    const lineData = [
        { x: 2, y: 0 },
        { x: 2, y: totalHeight }
    ];
    
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    
    const path = svg.append('path')
        .datum(lineData)
        .attr('class', 'timeline-line')
        .attr('d', line);
    
    // Get the total length of the path for animation
    const pathLength = path.node().getTotalLength();
    
    path.attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength);
    
    // Create timeline events
    timelineData.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = `timeline-event event-${event.side}`;
        
        // Position each event at specific vertical location
        eventDiv.style.position = 'absolute';
        eventDiv.style.top = `${index * eventHeight}px`;
        eventDiv.style.width = '100%';
        
        eventDiv.innerHTML = `
            <div class="timeline-circle"></div>
            <div class="event-content">
                <div class="event-year">${event.year}</div>
                <div class="event-title">${event.title}</div>
                <div class="event-description">${event.shortText}</div>
                <button class="read-more-btn" data-index="${index}">Read More</button>
            </div>
        `;
        
        eventsContainer.appendChild(eventDiv);
    });
    
    // Setup Intersection Observer for scroll animations
    setupScrollAnimations(path, pathLength);
    
    // Setup modal functionality
    setupModal();
}

// Setup scroll-based animations
function setupScrollAnimations(path, pathLength) {
    const events = document.querySelectorAll('.timeline-event');
    const circles = document.querySelectorAll('.timeline-circle');
    
    // Observer for events and circles
    // Each will animate independently as it enters viewport
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -200px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    events.forEach(event => observer.observe(event));
    circles.forEach(circle => observer.observe(circle));
    
    // Animate timeline line on scroll
    const updateLineAnimation = () => {
        const container = document.getElementById('timeline-container');
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerHeight = containerRect.height;
        const viewportBottom = window.scrollY + window.innerHeight;
        
        // Calculate how much of the timeline is visible
        // Start drawing when container enters viewport, finish when it exits
        const startPoint = containerTop;
        const endPoint = containerTop + containerHeight;
        
        let scrollProgress = 0;
        if (viewportBottom > startPoint) {
            scrollProgress = Math.min(1, (viewportBottom - startPoint) / containerHeight);
        }
        
        // Animate the line drawing
        const drawLength = pathLength * scrollProgress;
        path.attr('stroke-dashoffset', pathLength - drawLength);
    };
    
    // Add scroll listener
    window.addEventListener('scroll', updateLineAnimation);
    
    // Trigger once on load
    setTimeout(updateLineAnimation, 100);
}

// Setup modal popup functionality
function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const event = timelineData[index];
            
            document.getElementById('modal-title').textContent = event.title;
            document.getElementById('modal-year').textContent = event.year;
            document.getElementById('modal-text').textContent = event.fullText;
            
            modal.style.display = 'block';
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTimeline);

// Optional: Re-initialize on window resize for responsiveness
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Could add resize logic here if needed
    }, 250);
});