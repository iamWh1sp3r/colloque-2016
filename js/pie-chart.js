(function() {
  "use strict";

  var data = [{ key: "sky", value: 75, label: "Ciel" },
              { key: "shady", value: 5, label: "Côté sombre de la pyramide" },
              { key: "sunny", value: 20, label: "Côté éclairé de la pyramide" }];

  var svg = d3.select("svg")
      .attr("width", 800)
      .attr("height", 480);

  var chart = svg.append("g")
      .attr("transform", "translate(" + 240 + "," + 240 + ") rotate(225)");

  var color = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.key; }))
    .range(["#6D9EED", "#7E5F02", "#FFD866"]);

  var arc = d3.svg.arc()
    .outerRadius(230);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });

  var g = chart.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  var path = g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.key); });

  var legend = svg.selectAll(".legend")
      .data(data)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + 525 + "," + (i*60+20) + ")"; });

  legend.append("circle")
      .attr("cx", 20)
      .attr("cy", 20)
      .attr("r", 20)
      .style("fill", function(d) { return color(d.key); });
  legend.append("text")
      .attr("x", 50)
      .attr("y", 25)
      .text(function(d) { return d.label; });
})();
