/**
 * CHARTS.JS 
 * ==================================================
 * NOTES FROM CARL:
 * 
 * TO SWAP OUT A GRAPH:
 * 1. Find the function for your chart (e.g., createChart_Section2A)
 * 2. Replace the D3 code inside with your own chart code
 * 3. Keep the containerId parameter the same
 * 4. The chart will automatically render in the correct location
 * 
 * ==================================================
 */

/* ===============================================
   SECTION 1: HORIZONTAL TIMELINE LOGIC (CURRENTLY DEFINED IN SEPERATE TIMELINE_JS DOC)
   =============================================== */



/* ===============================================
   SECTION 2A: SCROLLYTELLING - Line Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section2A(containerId) {
    console.log("Rendering Chart: Section 2A (Scrollytelling Line Chart)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const width = 600;  // Reduced from 800
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    
    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto")
        .style("display", "block")
        .style("max-width", "none")
        .style("background", "#1A202C");
    
    // Generate time series data
    const data = d3.range(20).map(i => ({
        x: i,
        y: 50 + Math.sin(i * 0.5) * 30 + Math.random() * 10
    }));
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
        .domain([0, 19])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Line generator
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX);
    
    // Draw line
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#63B3ED")
        .attr("stroke-width", 3)
        .attr("d", line);
    
    // Draw points
    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 4)
        .attr("fill", "#63B3ED");
    
    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
    
    // Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .style("fill", "#A0AEC0")
        .text("Temporal Progression");
}

/* ===============================================
   SECTION 2B: STATIC - Scatter Plot
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section2B(containerId) {
    console.log("Rendering Chart: Section 2B (Static Scatter)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Generate scatter data
    const data = d3.range(50).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 2
    }));
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);
    
    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", d => d.size)
        .attr("fill", "#63B3ED")
        .attr("opacity", 0.6);
    
    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
}

/* ===============================================
   SECTION 3: STATIC - Area Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section3(containerId) {
    console.log("Rendering Chart: Section 3 (Static Area)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const data = d3.range(30).map(i => ({
        x: i,
        y: 30 + Math.sin(i * 0.3) * 20 + Math.random() * 15
    }));
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear().domain([0, 29]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 80]).range([innerHeight, 0]);
    
    const area = d3.area()
        .x(d => xScale(d.x))
        .y0(innerHeight)
        .y1(d => yScale(d.y))
        .curve(d3.curveMonotoneX);
    
    g.append("path")
        .datum(data)
        .attr("fill", "#63B3ED")
        .attr("opacity", 0.5)
        .attr("d", area);
    
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX);
    
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#63B3ED")
        .attr("stroke-width", 2)
        .attr("d", line);
    
    const xAxis = d3.axisBottom(xScale).ticks(6);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
}

/* ===============================================
   SECTION 4A: SCROLLYTELLING - Radial Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section4A(containerId) {
    console.log("Rendering Chart: Section 4A (Scrolly Radial)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const width = 600;  // Reduced from 800
    const height = 400;

    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto")
        .style("display", "block")
        .style("max-width", "none")
        .style("background", "#1A202C");
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 120;
    
    const data = d3.range(12).map(i => ({
        angle: (i * 30) * Math.PI / 180,
        value: Math.random() * 80 + 20
    }));
    
    const g = svg.append("g")
        .attr("transform", `translate(${centerX}, ${centerY})`);
    
    data.forEach(d => {
        const length = d.value;
        g.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", Math.cos(d.angle) * length)
            .attr("y2", Math.sin(d.angle) * length)
            .attr("stroke", "#63B3ED")
            .attr("stroke-width", 3);
        
        g.append("circle")
            .attr("cx", Math.cos(d.angle) * length)
            .attr("cy", Math.sin(d.angle) * length)
            .attr("r", 5)
            .attr("fill", "#63B3ED");
    });
    
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .style("fill", "#A0AEC0")
        .text("Radial Distribution");
}

/* ===============================================
   SECTION 4B: STATIC - Bar Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section4B(containerId) {
    console.log("Rendering Chart: Section 4B (Static Bar)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    const margin = { top: 30, right: 20, bottom: 40, left: 50 };
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const data = d3.range(8).map(i => ({
        label: `Cat ${i + 1}`,
        value: Math.random() * 100
    }));
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerWidth])
        .padding(0.2);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([innerHeight, 0]);
    
    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.label))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.value))
        .attr("fill", "#63B3ED");
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
}

/* ===============================================
   SECTION 4C: STATIC - Donut Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section4C(containerId) {
    console.log("Rendering Chart: Section 4C (Static Donut)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const radius = Math.min(width, height) / 2 - 40;
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    const data = [30, 25, 20, 15, 10];
    const color = d3.scaleOrdinal()
        .domain(data)
        .range(["#63B3ED", "#4299E1", "#3182CE", "#2B6CB0", "#2C5282"]);
    
    const pie = d3.pie();
    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius);
    
    g.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#1A202C")
        .attr("stroke-width", 2);
}

/* ===============================================
   SECTION 4D: SCROLLYTELLING - Network/Bubble Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section4D(containerId) {
    console.log("Rendering Chart: Section 4D (Scrolly Network)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const width = 600;  // Reduced from 800
    const height = 400;
    
    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto")
        .style("display", "block")
        .style("max-width", "none")
        .style("background", "#1A202C");
    
    const nodes = d3.range(15).map(i => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 20 + 10
    }));
    
    const g = svg.append("g");
    
    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.7) {
                g.append("line")
                    .attr("x1", nodes[i].x)
                    .attr("y1", nodes[i].y)
                    .attr("x2", nodes[j].x)
                    .attr("y2", nodes[j].y)
                    .attr("stroke", "#4A5568")
                    .attr("stroke-width", 1)
                    .attr("opacity", 0.3);
            }
        }
    }
    
    g.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", "#63B3ED")
        .attr("opacity", 0.7);
    
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .style("fill", "#A0AEC0")
        .text("Network Connections");
}

/* ===============================================
   SECTION 4E: STATIC - Stacked Bar Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section4E(containerId) {
    console.log("Rendering Chart: Section 4E (Static Stacked Bar)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    const margin = { top: 30, right: 80, bottom: 40, left: 50 };
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const categories = ["Q1", "Q2", "Q3", "Q4"];
    const series = ["Series A", "Series B", "Series C"];
    
    const data = categories.map(cat => {
        const obj = { category: cat };
        series.forEach(s => {
            obj[s] = Math.random() * 50 + 10;
        });
        return obj;
    });
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleBand()
        .domain(categories)
        .range([0, innerWidth])
        .padding(0.3);
    
    const yScale = d3.scaleLinear()
        .domain([0, 150])
        .range([innerHeight, 0]);
    
    const color = d3.scaleOrdinal()
        .domain(series)
        .range(["#63B3ED", "#4299E1", "#3182CE"]);
    
    const stack = d3.stack()
        .keys(series);
    
    const stackedData = stack(data);
    
    g.selectAll("g")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.data.category))
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth());
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
    
    // Legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right + 10}, ${margin.top})`);
    
    series.forEach((s, i) => {
        legend.append("rect")
            .attr("y", i * 20)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", color(s));
        
        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 20 + 12)
            .style("font-size", "12px")
            .style("fill", "#A0AEC0")
            .text(s);
    });
}

/* ===============================================
   SECTION 4F: SCROLLYTELLING - Heatmap Grid
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section4F(containerId) {
    console.log("Rendering Chart: Section 4F (Scrolly Heatmap)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const width = 600;  // Reduced from 800
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 20, left: 20 };
    
    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto")
        .style("display", "block")
        .style("max-width", "none")
        .style("background", "#1A202C");
    
    const rows = 10;
    const cols = 15;
    const cellWidth = (width - margin.left - margin.right) / cols;
    const cellHeight = (height - margin.top - margin.bottom) / rows;
    
    const data = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            data.push({ r, c, value: Math.random() * 100 });
        }
    }
    
    const colorScale = d3.scaleSequential()
        .domain([0, 100])
        .interpolator(d3.interpolateRdYlBu);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => d.c * cellWidth)
        .attr("y", d => d.r * cellHeight)
        .attr("width", cellWidth - 1)
        .attr("height", cellHeight - 1)
        .attr("fill", d => colorScale(d.value));
    
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .style("fill", "#A0AEC0")
        .text("Correlation Matrix");
}

/* ===============================================
   SECTION 4G: STATIC - Horizontal Bar Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section4G(containerId) {
    console.log("Rendering Chart: Section 4G (Static Horizontal Bar)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 40, left: 80 };
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const data = [
        { label: "Category Alpha", value: 85 },
        { label: "Category Beta", value: 72 },
        { label: "Category Gamma", value: 68 },
        { label: "Category Delta", value: 54 },
        { label: "Category Epsilon", value: 42 }
    ];
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerHeight])
        .padding(0.2);
    
    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d.label))
        .attr("width", d => xScale(d.value))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#63B3ED");
    
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
}

/* ===============================================
   SECTION 5A: STATIC - Multi-Line Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section5A(containerId) {
    console.log("Rendering Chart: Section 5A (Static Multi-Line)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    const margin = { top: 30, right: 80, bottom: 40, left: 50 };
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const series = ["Series 1", "Series 2", "Series 3"];
    const data = series.map(name => ({
        name: name,
        values: d3.range(15).map(i => ({
            x: i,
            y: 50 + Math.sin(i * 0.5 + series.indexOf(name)) * 20 + Math.random() * 10
        }))
    }));
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
        .domain([0, 14])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);
    
    const color = d3.scaleOrdinal()
        .domain(series)
        .range(["#63B3ED", "#48BB78", "#ED8936"]);
    
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX);
    
    data.forEach(s => {
        g.append("path")
            .datum(s.values)
            .attr("fill", "none")
            .attr("stroke", color(s.name))
            .attr("stroke-width", 2)
            .attr("d", line);
    });
    
    const xAxis = d3.axisBottom(xScale).ticks(7);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
    
    // Legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right + 10}, ${margin.top})`);
    
    series.forEach((s, i) => {
        legend.append("line")
            .attr("x1", 0)
            .attr("x2", 20)
            .attr("y1", i * 20 + 10)
            .attr("y2", i * 20 + 10)
            .attr("stroke", color(s))
            .attr("stroke-width", 2);
        
        legend.append("text")
            .attr("x", 25)
            .attr("y", i * 20 + 14)
            .style("font-size", "12px")
            .style("fill", "#A0AEC0")
            .text(s);
    });
}

/* ===============================================
   SECTION 5B: STATIC - Grouped Bar Chart
   TO MODIFY: Replace with your chart
   =============================================== */
function createChart_Section5B(containerId) {
    console.log("Rendering Chart: Section 5B (Static Grouped Bar)");
    
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    
    const bbox = container.node().getBoundingClientRect();
    const width = bbox.width;
    const height = 400;
    const margin = { top: 30, right: 80, bottom: 40, left: 50 };
    
    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const categories = ["A", "B", "C", "D", "E"];
    const groups = ["Group 1", "Group 2"];
    
    const data = categories.map(cat => ({
        category: cat,
        values: groups.map(g => ({
            group: g,
            value: Math.random() * 80 + 20
        }))
    }));
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const x0 = d3.scaleBand()
        .domain(categories)
        .range([0, innerWidth])
        .padding(0.2);
    
    const x1 = d3.scaleBand()
        .domain(groups)
        .range([0, x0.bandwidth()])
        .padding(0.05);
    
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);
    
    const color = d3.scaleOrdinal()
        .domain(groups)
        .range(["#63B3ED", "#48BB78"]);
    
    data.forEach(d => {
        const gCategory = g.append("g")
            .attr("transform", `translate(${x0(d.category)}, 0)`);
        
        d.values.forEach(v => {
            gCategory.append("rect")
                .attr("x", x1(v.group))
                .attr("y", y(v.value))
                .attr("width", x1.bandwidth())
                .attr("height", innerHeight - y(v.value))
                .attr("fill", color(v.group));
        });
    });
    
    const xAxis = d3.axisBottom(x0);
    const yAxis = d3.axisLeft(y).ticks(5);
    
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    g.append("g")
        .call(yAxis)
        .selectAll("text").style("fill", "#A0AEC0");
    
    svg.selectAll("line").style("stroke", "#4A5568");
    svg.selectAll("path.domain").style("stroke", "#4A5568");
    
    // Legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right + 10}, ${margin.top})`);
    
    groups.forEach((gr, i) => {
        legend.append("rect")
            .attr("y", i * 20)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", color(gr));
        
        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 20 + 12)
            .style("font-size", "12px")
            .style("fill", "#A0AEC0")
            .text(gr);
    });
}

/* ===============================================
   DATA TABLE 
   =============================================== */
function generateRegionalData(count = 15) {
    const prefixes = ["Regio", "Provincia", "Districtus", "Ager", "Civitas"];
    const suffixes = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa"];
    
    return Array.from({length: count}, (_, i) => ({
        name: `${prefixes[i % prefixes.length]} ${suffixes[i % suffixes.length]}`,
        metric1: Math.floor(Math.random() * 1000),
        metric2: Math.floor(Math.random() * 100),
        score: (Math.random() * 10).toFixed(1)
    }));
}

function initDataTable() {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    let regionalData = generateRegionalData(10);

    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.metric1}</td>
                <td>${row.metric2}%</td>
                <td><strong>${row.score}</strong></td>
            `;
            tableBody.appendChild(tr);
        });
    }

    renderTable(regionalData);

    document.querySelectorAll("th.sortable").forEach(th => {
        th.addEventListener("click", function() {
            const field = this.dataset.sort;
            const isAsc = this.classList.contains("asc");
            document.querySelectorAll("th").forEach(h => h.classList.remove("asc", "desc"));
            
            regionalData.sort((a, b) => {
                let valA = a[field];
                let valB = b[field];
                if (!isNaN(parseFloat(valA))) {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }
                return isAsc ? valA - valB : valB - valA;
            });

            this.classList.add(isAsc ? "desc" : "asc");
            renderTable(regionalData);
        });
    });

    document.getElementById("reset-sort")?.addEventListener("click", () => {
        renderTable(regionalData); 
    });
}

/* ===============================================
   MASTER INITIALIZATION
   ==================================================
   THIS IS WHERE ALL CHARTS ARE REGISTERED
   
   TO ADD A NEW CHART:
   1. Create a function above (e.g., createChart_Section6A)
   2. Add it to this initialization list
   3. Make sure the containerId matches your HTML
   ==================================================
*/
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing all charts...");
    
    // SECTION 1: HORIZONTAL TIMELINE (handled by its own script, currently)
    // initTimeline_Section1();
    
    // SECTION 2
    createChart_Section2A('chart-section-2a');
    createChart_Section2B('chart-section-2b');
    
    // SECTION 3
    createChart_Section3('chart-section-3');
    
    // SECTION 4
    createChart_Section4A('chart-section-4a');
    createChart_Section4B('chart-section-4b');
    createChart_Section4C('chart-section-4c');
    createChart_Section4D('chart-section-4d');
    createChart_Section4E('chart-section-4e');
    createChart_Section4F('chart-section-4f');
    createChart_Section4G('chart-section-4g');
    
    // SECTION 5
    createChart_Section5A('chart-section-5a');
    createChart_Section5B('chart-section-5b');
    
    // DATA TABLE
    initDataTable();
    
    console.log("All charts initialized!");
});