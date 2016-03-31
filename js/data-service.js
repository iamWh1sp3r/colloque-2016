var DataService = {};

(function() {

  DataService.stock = function(n) {
    var data;

    return { fetch: fetch };

    function fetch() {
      if (!data) {
        data = _.range(n).map(function(i) { return { id: i + 1 }; });
      }

      _.forEach(data, function(d) {
        d.value = Math.random();
      });

      return data;
    }
  };

  DataService.web = function(n) {
    var data;

    return { fetch: fetch };

    function fetch() {
      if (!data) {
        data = _.range(n).map(generate);
      }

      data.shift();
      data.push(generate);
    }

    function generate() {
      return {
        hits: chance.integer({ min: 30, max: 150 }),
        signups: chance.integer({ min: 0, max: 25 }),
        likes: chance.integer({ min: 0, max: 75 })
      }
    }
  }

})();
