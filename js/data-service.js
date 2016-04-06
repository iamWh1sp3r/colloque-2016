var DataService = {};

(function() {

  DataService.web = function(n) {
    var data = [],
        id = 1;

    return {
      count: function() { return data.length; },
      fetch: fetch,
      keys: function() { return ["hits", "signups", "likes"]; },
      size: function() { return n; }
    };

    function fetch() {
      if (data.length == n) {
        data.shift();
      }

      data.push(generate());

      return data;
    }

    // private
    function generate() {
      var hits = chance.integer({ min: 30, max: 150 });
      var signups = chance.integer({ min: 0, max: 25 });
      var likes = chance.integer({ min: 0, max: 75 });

      return {
        id: id++,
        hits: hits,
        signups: signups,
        likes: likes,
        total: hits + signups + likes
      };
    }
  };


  DataService.customers = function() {
    return { fetch: fetch };

    function fetch() {
      return {
        value: chance.integer({ min: 500, max: 1500 }),
        target: chance.integer({ min: 700, max: 1200 }),
        format: d3_locale_frCA.numberFormat("f")
      };
    }
  };


  DataService.sales = function() {
    return { fetch: fetch };

    function fetch() {
      return {
        value: chance.floating({ min: 15000, max: 50000 }),
        target: chance.floating({ min: 18000, max: 55000 }),
        format: d3_locale_frCA.numberFormat("$,.2f")
      };
    }
  };


  DataService.rating = function() {
    return { fetch: fetch };

    function fetch() {
      return {
        value: chance.floating({ min: 70, max: 95 }) / 100,
        target: chance.integer({ min: 80, max: 100 }) / 100,
        format: d3_locale_frCA.numberFormat(".1%")
      };
    }
  };

})();
