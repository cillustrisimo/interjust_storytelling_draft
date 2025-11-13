// --- 2. DEFINE CHART-DRAWING FUNCTIONS ---
// Each function is self-contained. It clears the container
// and then draws the new chart.
// THIS IS WHERE WE NEED TO ADD ALL OUR CHART FUNCTIONS!!!!

/**
 * EXAMPLE CHART: DRAW CIRCLE
 */
function drawSimpleCircle(container, w, h, color, radius) {
    // 1. Clear the container of old elements
    container.selectAll("*").remove();

    // 2. Draw the new chart
    container.append("circle")
        .attr("cx", w / 2)
        .attr("cy", h / 2)
        .attr("r", radius)
        .attr("fill", color);
}

/**
 * EXAMPLE CHART: DRAW RECTANGLE
 */
function drawSimpleRect(container, w, h, color, size) {
    // 1. Clear the container
    container.selectAll("*").remove();
    
    // 2. Draw the new chart
    container.append("rect")
        .attr("x", w / 2 - size / 2)
        .attr("y", h / 2 - size / 2)
        .attr("width", size)
        .attr("height", size)
        .attr("fill", color);
}

// --- ADD MORE CHART FUNCTIONS HERE ---
// e.g., function drawBarChart(container, w, h, data) { ... }