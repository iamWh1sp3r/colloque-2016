(function() {
  "use strict";

  var widgets = [{ label: "Nouveaux clients", klass: "customers", value: 981, target: 1081, format: d3_locale_frCA.numberFormat("f") },
                 { label: "Ventes mensuelles", klass: "sales", value: 32540.31, target: 40878.20, format: d3_locale_frCA.numberFormat("$,.2f") },
                 { label: "Taux de satisfaction", klass: "rating", value: 0.707, target: 0.7, format: d3_locale_frCA.numberFormat(".1%") }];

  var widget = d3.selectAll("#widgets").selectAll(".widget")
      .data(widgets)
    .enter().append("div")
      .attr("class", classes);

  widget.append("h5")
    .text(function(d) { return d.label; });

  widget.append("h1")
    .transition().duration(1000)
      .delay(delay)
      .tween("text", function(d) {
        var i = d3.interpolate(0, d.value);
        return function(t) {
          this.textContent = d.format(i(t));
        };
      });

  widget.append("div")
      .attr("class", "target")
      .style("width", 0)
      .attr("title", function(d) { return "Objectif: " + d.format(d.target); })
    .transition().duration(1000)
      .delay(delay)
      .style("width", width);

  function classes(d, i) { return ["widget", d.klass].join(" "); }
  function delay(d, i) { return i * 300; }
  function width(d) { return (d.value * 100 / Math.max(d.value, d.target)) + "%"; }
})();
