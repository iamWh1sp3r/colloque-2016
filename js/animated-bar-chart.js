(function() {
  "use strict";

  var data;
  var count = 15;
  var keys = ["hits", "signups", "likes"];
  var dataService = DataService.web(count);

  var margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var color = d3.scale.ordinal()
    .domain(keys)
    .range(["#4da6ff", "#66ff33", "#ff6666"]);

  var x = d3.scale.ordinal()
    .domain(d3.range(count))
    .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
    .domain([0, 250])
    .range([height, 0]);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  (function update() {
    data = dataService.fetch();
    var stat = svg.selectAll(".stat").data(data, function(d) { return d.id; });

    // UPDATE
    stat.transition().attr("transform", statTransform);

    // ENTER
    stat.enter().append("g")
        .attr("class", "stat")
        .attr("transform", statTransform)
      .selectAll("rect")
        .data(rectData)
      .enter().append("rect")
        .attr("width", 0)
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .attr("x", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .style("fill", function(d) { return color(d.name); })
      .transition()
        .attr("width", x.rangeBand())
        .attr("x", 0);

    // ENTER + UPDATE

    // EXIT
    stat.exit().selectAll("rect")
      .transition().attr("width", 0);
    stat.exit()
      .transition().remove();

    setTimeout(update, frequency());
  })();

  function rectData(d) {
    var y0 = 0;
    return color.domain().map(function(name) { return { name: name, y0: y0, y1: y0 += +d[name] }; });
  }

  function frequency() {
    return document.getElementById("frequency").value;
  }

  function statTransform(d, i) {
    return "translate(" + x(count + (i - data.length)) + ", 0)";
  }

})();
