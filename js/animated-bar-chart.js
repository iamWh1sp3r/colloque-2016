(function() {
  "use strict";

  var ds = DataService.web(20);

  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var chart = d3.select(".chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.ordinal()
    .domain(ds.fetch().map(function(d) { return d.id; }))
    .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  function draw() {
    var selection = chart.selectAll(".bar")
      .data(ds.fetch());

    selection.transition()
      .attr("height", function(d) { return height - y(d.value); })
      .attr("y", function(d) { return y(d.value); });

    selection.enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("y", function(d) { return y(d.value); });

    setTimeout(draw, 1000);
  }

  draw();

})();
