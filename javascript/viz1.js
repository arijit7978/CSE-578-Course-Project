var container;
var text;
var width;
var height;

function drawFilters() {
    var svg = filterSvg
        .selectAll("svg")
        .data(filterAttributes)
        .enter()
        .append("svg");


    container = svg.append("g")

    .attr("transform", function(d, i) {
        return "translate(" + (i + 1.5) * width + "," + height / 2 + ")"
    });

    addRatingText();
    addFilterLabel();
    var circumference = container.append('circle')
        .attr('r', circumference_r)
        .attr('fill-opacity', 0.2)
        .attr('class', 'circumference');

    var dotAttributes = [{
        x: 0,
        y: -circumference_r
    }];


    var drag = d3.drag()
        .subject(function(d) {
            return d;
        })
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    var dot_circle = container.append("g")
        .attr("class", "dot")
        .selectAll('circle')
        .data(dotAttributes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .call(drag);

}

function addRatingLabel() {
    var textLabels = text.text(function(d) {
        return d['value'];
    });
}

function addRatingText() {
    text = container
        .append("text");
    addRatingLabel();
}

function addFilterLabel() {
    var filterLabel = container.append("text")
        .attr('y', 70)
        .style("text-anchor", "middle")
        .text(function(d) {
            return d['key'];
        })
}