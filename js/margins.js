var Margins = {
  set: function(chart) {
    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    chart.attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }
};
