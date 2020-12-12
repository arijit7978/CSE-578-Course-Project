var opt;
var svg = d3.select("div")
.append("svg")
.attr("width",1000)
.attr("height",300)

var x=d3.scaleBand()
.domain(["17/03/2014", "24/08/2014", "28/11/2014", "30/12/2014", "15/02/2015", "24/06/2015", "12/09/2015", "15/11/2015", "06/03/2016", "26/06/2016", "06/09/2016", "19/12/2016"])
.range([50,900])
.padding([0.4])

svg
.append("g")
.attr("transform", "translate(0,80)")
.call(d3.axisBottom(x));

var line = svg
.append('g')
.append('line')
.style("stroke", "blue")
.style("stroke-width",10)
.attr("transform", "translate(0,80)")
.attr("x1",50)
.attr("y1",0)
.attr("x2",100)
.attr("y2",0);




dict = {"17/03/2014":100,"24/08/2014":170,"28/11/2014":240,"30/12/2014":310,"15/02/2015":380, "24/06/2015":440,"12/09/2015":510,"15/11/2015":580, "06/03/2016":650, "26/06/2016":720,"06/09/2016":790,"19/12/2016":860}

option = d3.select('#Date').on('change',function(d){
opt = d3.select('#Date').node().value;
temp = dict[opt]
update(temp)
})

function update(data){
line
.datum(data)
.transition()
.duration(1000)
.style("stroke", "blue")
.style("stroke-width",10)
.attr("transform", "translate(0,80)")
.attr("x1",50)
.attr("y1",0)
.attr("x2",data)
.attr("y2",0);

}