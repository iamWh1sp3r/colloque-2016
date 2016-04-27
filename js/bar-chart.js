(function() {
  "use strict";

  var sales = [{ month: 0, label: "Janvier", amount: 96593.09 },
               { month: 1, label: "Février", amount: 91497.40 },
               { month: 2, label: "Mars", amount: 86103.59 },
               { month: 3, label: "Avril", amount: 93047.56 },
               { month: 4, label: "Mai", amount: 90068.35 },
               { month: 5, label: "Juin", amount: 64490.62 },
               { month: 6, label: "Juillet", amount: 72018.68 },
               { month: 7, label: "Août", amount: 104085.93 },
               { month: 8, label: "Septembre", amount: 88279.88 },
               { month: 9, label: "Octobre", amount: 91519.51 },
               { month: 10, label: "Novembre", amount: 81577.94 },
               { month: 11, label: "Décembre", amount: 89835.24 }];

  var margin = {top: 20, right: 20, bottom: 30, left: 90},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([50000, d3.max(sales, function(d) { return d.amount; })]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10)
      .tickFormat(d3_locale_frCA.numberFormat("$,.2f"));

  var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  d3.selectAll("input").on("change", update);

  update();

  function update() {
    var data = process(sales);

    x.domain(data.map(function(d) { return d.label; }));

    var bar = svg.selectAll(".bar").data(data, function(d) { return d.month; });

    bar.enter().append("rect")
        .attr("class", "bar")
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return height - y(d.amount); });

    bar.sort(function(a, b) { return x(a.label) - x(b.label); });

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 25; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x(d.label); })
        .attr("width", x.rangeBand());

    bar.exit().remove();

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }

  function process(data) {
    var clone = data.slice(0);
    var sort = d3.select("input[name=sort]:checked").node().value;
    var filters = {
      summer: d3.selectAll("#filter-summer:checked").node(),
      j: d3.selectAll("#filter-letter-j:checked").node()
    };

    clone = clone.sort(function(a, b) { return d3.ascending(a[sort], b[sort]); });
    if (filters.summer) clone = clone.filter(function(d) { return ["Juin", "Juillet", "Août"].indexOf(d.label) > -1; });
    if (filters.j) clone = clone.filter(function(d) { return d.label[0].toUpperCase() === "J"; });
    return clone;
  }

})();