(function() {
  "use strict";

  var delay = 300;
  var widgets = [{ label: "Nouveaux clients", klass: "customers", data: DataService.customers().fetch() },
                 { label: "Ventes mensuelles", klass: "sales", data: DataService.sales().fetch() },
                 { label: "Taux de satisfaction", klass: "rating", data: DataService.rating().fetch() }];

  var widget = d3.selectAll("#widgets").selectAll(".widget")
      .data(widgets)
    .enter().append("div")
      .attr("class", function(d) { return ["widget", d.klass].join(" "); });

  widget.append("h5")
    .text(function(d) { return d.label; });

  widget.append("h1")
    .transition().duration(1000)
      .delay(function(d, i) { return i * delay; })
      .tween("text", function(d) {
        var i = d3.interpolate(0, d.data.value);
        return function(t) {
          this.textContent = d.data.format(i(t));
        };
      });

  widget.append("div")
      .attr("class", "target")
      .style("width", 0)
      .attr("title", function(d) { return "Objectif: " + d.data.format(d.data.target); })
    .transition().duration(1000)
      .delay(function(d, i) { return i * delay; })
      .style("width", function(d) { return ratingPct(d.data.value, d.data.target) + "%"; });

  function ratingPct(value, target) {
    var max = Math.max(value, target);
    return (value * 100 / max);
  }
})();
