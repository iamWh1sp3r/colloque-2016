var DataService = {};

(function() {

  DataService.stock = function(n) {
    var data;

    return { fetch: fetch };

    function fetch() {
      if (!data) {
        data = d3.range(n).map(function(i) { return { id: i + 1 }; });
      }

      data.forEach(function(d) {
        d.value = Math.random();
      });

      return data;
    }
  };

  DataService.web = function(n) {
    var data = [],
        id = 1;

    return { fetch: fetch };

    function fetch() {
      if (data.length == n - 1) {
        data.shift();
      }

      data.push(generate());

      return data;
    }

    function generate() {
      var hits = chance.integer({ min: 30, max: 150 });
      var signups = chance.integer({ min: 0, max: 25 });
      var likes = chance.integer({ min: 0, max: 75 });

      return {
        id: id++,
        date: new Date(),
        hits: hits,
        signups: signups,
        likes: likes,
        total: hits + signups + likes
      };
    }
  };

})();
