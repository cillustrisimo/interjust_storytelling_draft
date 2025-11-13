// --- 1. SETUP THE D3 VISUALIZATION  ---
const svg = d3.select("#chart");

// Get the container's dimensions
const graphicContainer = d3.select("#graphic");

// Use clientWidth/clientHeight to get inner dimensions
const width = graphicContainer.node().clientWidth;
const height = graphicContainer.node().clientHeight;

// Set the SVG's viewBox to scale
svg.attr("viewBox", `0 0 ${width} ${height}`)
   .attr("preserveAspectRatio", "xMidYMid meet");

// Create a single group to hold all our charts
// This 'g' element will be the container we add/remove charts from
const chartContainer = svg.append("g")
    .attr("id", "chart-container");

// Define a standard transition speed
const t = () => d3.transition().duration(400); // 400ms fade


// --- 2. DEFINE CHART-DRAWING FUNCTIONS ---
// REFER TO CHARTS.js FOR THIS SECTION


// --- 3. DEFINE THE MASTER CHART UPDATE/CONTROLLER  ---
function updateChart(step) {
    console.log("Updating chart to step:", step);

    // 1. Fade out the whole container
    chartContainer.transition(t())
        .style("opacity", 0)
        .end() // Wait for the fade-out to finish
        .then(() => {
            // 2. Now that it's invisible, clear it and draw the new chart
            // Switch statement acts as a router to select new charts (call function in them)
            // Functions are called from charts.js and we pass in the container and dimensions.
            switch (step) {
                // Section 1 (1 graph)
                case "1":
                    drawSimpleCircle(chartContainer, width, height, "#cccccc", 50);
                    break;
                
                // Section 2 (2 graphs)
                case "2":
                    drawSimpleCircle(chartContainer, width, height, "cornflowerblue", 50);
                    break;
                case "3":
                    drawSimpleCircle(chartContainer, width, height, "cornflowerblue", 75);
                    break;
        
                // Section 3 (1 graph)
                case "4":
                    drawSimpleCircle(chartContainer, width, height, "seagreen", 75);
                    break;

                // Section 4 (7 graphs) 
                case "5":
                    drawSimpleRect(chartContainer, width, height, "gold", 40);
                    break;
                case "6":
                    drawSimpleRect(chartContainer, width, height, "gold", 80);
                    break;
                case "7":
                    drawSimpleRect(chartContainer, width, height, "gold", 120);
                    break;
                case "8":
                    drawSimpleRect(chartContainer, width, height, "gold", 160);
                    break;
                case "9":
                    drawSimpleRect(chartContainer, width, height, "gold", 200);
                    break;
                case "10":
                    drawSimpleRect(chartContainer, width, height, "gold", 240);
                    break;
                case "11":
                    drawSimpleRect(chartContainer, width, height, "gold", 280);
                    break;

                // Section 5 (2 graphs)
                case "12":
                    drawSimpleCircle(chartContainer, width, height, "darkred", 140);
                    break;
                case "13":
                    drawSimpleCircle(chartContainer, width, height, "darkred", 140);
                    break;
                
                // Default fallback
                default:
                    drawSimpleCircle(chartContainer, width, height, "grey", 50);
            }
            
            // 3. Fade the container back in to show the new chart
            chartContainer.transition(t())
                .style("opacity", 1);
        });
}


// --- 4. SETUP SCROLLYTELLING OBSERVER (for chart & fades) ---
const steps = d3.selectAll(".step");

function handleIntersect(entries) {
    entries.forEach(entry => {
        const stepElement = d3.select(entry.target);
        const isActive = entry.isIntersecting;
        
        stepElement.classed("is-active", isActive);
        
        if (isActive) {
            // Check if the 'data-step' attribute exists before updating
            const currentStep = entry.target.dataset.step;
            if (currentStep) {
                updateChart(currentStep);
            }
        }
    });
}

const scrollerObserver = new IntersectionObserver(handleIntersect, {
    threshold: 0.5 
});

steps.each(function() {
    scrollerObserver.observe(this);
});

// --- 5. INITIALIZE SCROLLER ---
d3.select('#section-1').classed('is-active', true);


//
// --- 6. HOME/NAV OBSERVER (controls nav collapse) ---
//
const homeSection = d3.select("#home");

function handleHomeIntersect(entries) {
    entries.forEach(entry => {
        const isVisible = entry.isIntersecting;
        d3.select("body").classed("home-is-visible", isVisible);
    });
}

const homeObserver = new IntersectionObserver(handleHomeIntersect, {
    threshold: 0.1 // 10% visible
});

homeObserver.observe(homeSection.node());


//
// --- 7. NAV SECTION OBSERVER (highlights active nav link) ---
//
const navLinks = d3.selectAll("#side-nav li a");
const allSections = d3.selectAll("#home, #scroller .step-full[data-nav-section]");

function handleNavIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let sectionId;
            
            if (entry.target.id === "home") {
                sectionId = "home";
            } else {
                sectionId = entry.target.dataset.navSection;
            }
            
            navLinks.classed("active-nav", false);
            
            d3.select(`#side-nav a[data-nav-target="${sectionId}"]`)
              .classed("active-nav", true);
        }
    });
}

const navObserver = new IntersectionObserver(handleNavIntersect, {
    rootMargin: "-30% 0px -30% 0px"
});

allSections.each(function() {
    navObserver.observe(this);
});