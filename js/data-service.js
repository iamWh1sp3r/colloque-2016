var DataService = {};

(function() {
   var animatedBarsData;

   DataService.animatedBars = function() {
    if (!animatedBarsData) {
      animatedBarsData = _.range(20).map(function(i) { return { id: i + 1 }; });
    }

    _.forEach(animatedBarsData, function(d) {
      d.value = Math.random();
    });

    return animatedBarsData;
   };

})();
