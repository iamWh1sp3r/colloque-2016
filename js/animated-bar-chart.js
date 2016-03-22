(function() {
  "use strict";

  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var chart = d3.select(".chart")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.ordinal()
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


})();
