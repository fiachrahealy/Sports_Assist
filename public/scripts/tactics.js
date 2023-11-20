var tacticsModel = d3.select("#tacticsBoard")
    .append("svg")
    .attr("width", 1050)
    .attr("height", 680)
    .attr("viewBox", "-23 -30 1095 750")
    .attr("preserveAspectRatio", "none");


tacticsModel.append("rect")
    .attr("x", -5)
    .attr("y", -10)
    .attr("height", 695)
    .attr("width", 1080)
    .style("stroke", "#142D48")
    .style("fill", "none")
    .style("stroke-width", 50);


tacticsModel.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 680)
    .attr("width", 1050)
    .style("stroke-width", 5)
    .style("stroke", "#ffffff")
    .style("fill", "#2FE94A");


tacticsModel.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 680)
    .attr("width", 525)
    .style("stroke-width", 5)
    .style("stroke", "#ffffff")
    .style("fill", "#2FE94A");


tacticsModel.append("circle")
    .attr("cx", 525)
    .attr("cy", 340)
    .attr("r", 91.5)
    .style("stroke-width", 5)
    .style("stroke", "#ffffff")
    .style("fill", "none");



tacticsModel.append("rect")
    .attr("x", 0)
    .attr("y", 138.5)
    .attr("height", 403)
    .attr("width", 165)
    .style("stroke-width", 5)
    .style("stroke", "#ffffff")
    .style("fill", "#2FE94A");


tacticsModel.append("rect")
    .attr("x", 885)
    .attr("y", 138.5)
    .attr("height", 403)
    .attr("width", 165)
    .style("stroke-width", 5)
    .style("stroke", "#ffffff")
    .style("fill", "#2FE94A");


tacticsModel.append("rect")
    .attr("x", 0)
    .attr("y", 248.5)
    .attr("height", 183)
    .attr("width", 55)
    .style("stroke-width", 5)
    .style("stroke", "#ffffff")
    .style("fill", "#2FE94A");


tacticsModel.append("rect")
    .attr("x", 995)
    .attr("y", 248.5)
    .attr("height", 183)
    .attr("width", 55)
    .style("stroke-width", 5)
    .style("stroke", "#ffffff")
    .style("fill", "#2FE94A");




tacticsModel.append("circle")
    .attr("cx", 110)
    .attr("cy", 340)
    .attr("r", 5)
    .style("fill", "#ffffff");


tacticsModel.append("circle")
    .attr("cx", 940)
    .attr("cy", 340)
    .attr("r", 5)
    .style("fill", "#ffffff");




tacticsModel.append("circle")
    .attr("cx", 525)
    .attr("cy", 340)
    .attr("r", 5)
    .style("fill", "#ffffff");



var vis = d3.select("body").append("svg")
var pi = Math.PI;

var arc = d3.svg.arc()
    .innerRadius(89)
    .outerRadius(94)
    .startAngle(0.64)
    .endAngle(2.5)

var arc2 = d3.svg.arc()
    .innerRadius(89)
    .outerRadius(94)
    .startAngle(-0.64)
    .endAngle(-2.5)
tacticsModel.append("path")
    .attr("d", arc)
    .attr("fill", "#ffffff")
    .attr("transform", "translate(110,340)")
tacticsModel.append("path")
    .attr("d", arc2)
    .attr("fill", "#ffffff")
    .attr("transform", "translate(940,340)");



var color = d3.scale.ordinal().range(["navy", "lightblue", "white"]);
var color1 = d3.scale.ordinal().range(["white", "white", "black"]);
var size = d3.scale.ordinal().range([16, 16, 12]);

var drag = d3.behavior.drag()
    .origin(d => d)
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);


d3.csv("/dots.txt", dottype, (error, oldDots) => {
    dot = tacticsModel.append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data(dots)
        .enter().append("circle")
        .attr("r", d => size(d.team))
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .style("fill", d => color(d.team))
        .style("stroke", d => color1(d.team))
        .style("stroke-width", 3)
        .call(drag);
});




function dottype(d) {
    d.x = +d.x;
    d.y = +d.y;
    return d;
}


function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this)

}

function dragged(d) {
    d3.select(this)
        .attr("cx", d.x = d3.event.x)
        .attr("cy", d.y = d3.event.y)
        .style("opacity", .5);
}

function dragended(d) {
    updateDots(d);
    d3.select(this)
        .style("opacity", 1);
    modified = true;
}

function addDot() {
    dot = tacticsModel.append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data(dots)
        .enter().append("circle")
        .attr("r", d => size(d.team))
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .style("fill", d => color(d.team))
        .style("stroke", d => color1(d.team))
        .style("stroke-width", 3)
        .call(drag);
    modified = true;
}