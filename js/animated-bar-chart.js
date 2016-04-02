(function() {
  "use strict";

  var dataService = DataService.web(20);

  var margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var chart = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.ordinal()
    .domain(d3.range(20))
    .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
    .domain([0, 250])
    .range([height, 0]);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  refresh();

  function draw(data, frequency) {
    var selection = chart.selectAll(".bar")
      .data(data, function(d) { return d.id; });

    selection.transition()
      .attr("x", function(d, i) { return x(i); });

    selection.enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return x(i) + x.rangeBand(); })
      .attr("width", 0)
      .attr("height", function(d) { return height - y(d.total); })
      .attr("y", function(d) { return y(d.total); })
        .transition()
          .attr("x", function(d, i) { return x(i); })
          .attr("width", x.rangeBand());

    selection.exit().transition().attr("width", 0).remove();

    setTimeout(refresh, frequency);
  }

  function refresh() {
    var data = dataService.fetch();
    var frequency = document.getElementById("frequency").value;
    draw(data, frequency);
  }
})();
