(function() {
  "use strict";

  var count = 20;
  var keys = ["hits", "signups", "likes"];
  var dataService = DataService.web(count);

  var margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var chart = d3.select("#chart").append("svg")
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

  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  update();
  window.up = update;

  function update() {
    var data = dataService.fetch();

    var layers = d3.layout.stack()(keys.map(function(k) {
      return data.map(function(d, i) {
        return { k: k, x: i, y: d[k] };
      });
    }));

    var layer = chart.selectAll(".layer")
        .data(layers)
      .enter().append("g")
        .attr("class", "layer");

    var layerUpdate = layer.selectAll("rect")
      .data(function(d) { return d; });

    layerUpdate
      .transition()
        .attr("x", function(d, i) { return x(i); });

    layerUpdate.enter().append("rect")
        .style("fill", function(d) { return color(d.k); })
        .attr("x", function(d, i) { return x(i) + x.rangeBand(); })
        .attr("y", function(d) { return y(d.y + d.y0); })
        .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
        .attr("width", 0)
      .transition()
        .attr("x", function(d, i) { return x(i); })
        .attr("width", x.rangeBand());

    // selection.enter().append("rect")
    //   .attr("class", "bar")
    //   .attr("x", function(d, i) { return x(i) + x.rangeBand(); })
    //   .attr("width", 0)
    //   .attr("height", function(d) { return height - y(d.total); })
    //   .attr("y", function(d) { return y(d.total); })
    //     .transition()
    //       .attr("x", function(d, i) { return x(i); })
    //       .attr("width", x.rangeBand());

    // selection.exit().transition().attr("width", 0).remove();

    //var frequency = document.getElementById("frequency").value;
    //setTimeout(update, frequency);
  }
})();
