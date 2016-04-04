(function() {
  "use strict";

  var widget = d3.selectAll(".widget")
    .datum(function() {
      var key = this.classList[1];
      return DataService[key]().fetch();
    });

  var delay = 300;
  var height = widget.node().clientHeight;

  widget.append("h1").transition()
    .duration(1000)
    .delay(function(d, i) { return i * delay; })
      .tween("text", function(d) {
        var i = d3.interpolate(0, d.value);
        return function(t) {
          this.textContent = d.format(i(t));
        };
      });

  widget.insert("div", "h5")
    .classed("target", true)
    .style("height", 0)
    .style("margin-top", height + "px")
    .attr("title", function(d) {
      return "Objectif: " + d.format(d.target);
    })
    .transition()
    .duration(1000)
    .delay(function(d, i) { return i * delay; })
      .style("height", function(d) {
        return ratingToHeight(d.value, d.target) + "px";
      })
      .style("margin-top", function(d) {
        return (height - ratingToHeight(d.value, d.target)) + "px";
      });

  function ratingToHeight(value, target) {
    target = Math.max(value, target);
    return (value * height / target);
  }
})();
