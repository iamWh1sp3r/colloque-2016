(function() {
  "use strict";

  var web = DataService.web(30);

  var margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 640 - margin.left - margin.right,
      height = 480 - margin.top - margin.bottom;

  var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var color = d3.scale.ordinal()
    .domain(web.keys())
    .range(["#4da6ff", "#66ff33", "#ff6666"]);

  var x = d3.scale.ordinal()
    .domain(d3.range(web.size()))
    .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  svg.append("g").attr("class", "y axis");

  setInterval(update, 500);

  ////////////////

  function update() {
    var data = web.fetch();
    var bar = svg.selectAll(".bar").data(data, function(d) { return d.id; });

    var max = d3.max(data, function(d) { return d.total; });
    y.domain([0, max]);
    var t = svg.transition();
    t.select(".y.axis").call(yAxis);

    // UPDATE
    bar.transition()
        .attr("transform", barTransform)
      .selectAll("rect")
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .attr("y", function(d) { return y(d.y1); });

    // ENTER
    bar.enter().append("g")
        .attr("class", "bar")
        .attr("transform", barTransform)
      .selectAll("rect")
        .data(rectData)
      .enter().append("rect")
        .attr("width", 0)
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .attr("x", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .style("fill", function(d) { return color(d.key); })
      .transition()
        .attr("width", x.rangeBand())
        .attr("x", 0);

    // ENTER + UPDATE

    // EXIT
    bar.exit().selectAll("rect").transition().attr("width", 0);
    bar.exit().transition().remove();
  }

  function rectData(d) {
    var y0 = 0;
    return color.domain().map(function(key) { return { key: key, y0: y0, y1: y0 += +d[key] }; });
  }

  function barTransform(d, i) {
    var index = web.size() + i - web.count();
    return "translate(" + x(index) + ", 0)";
  }

})();
