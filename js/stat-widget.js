(function() {
  "use strict";

  var widget = d3.selectAll(".widget")
    .datum(function() {
      var key = this.classList[1];
      return DataService[key]();
    });

  var stat = widget.append("h1")
    .text(0)
    .transition().duration(1000)
      .tween("text", function(d) {
        var i = d3.interpolate(0, d.value);
        return function(t) {
          this.textContent = d.format(i(t));
        };
      });

  var target = widget.append("div")
    .classed("target", true)
    .style("width", 0)
    .attr("title", function(d) {
      return "Objectif: " + d.format(d.target);
    })
    .transition().duration(1000)
      .style("width", function(d) {
        var x0 = d.value;
        var x1 = d3.max([d.value, d.target]);
        return (x0 * 100 / x1) + "%";
      });
})();
