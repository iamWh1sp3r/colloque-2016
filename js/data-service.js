var DataService = {};

(function() {

  DataService.web = function(n) {
    var data,
        id = 1;

    return { fetch: fetch };

    function fetch() {
      if (!data) {
        data = d3.range(n).map(generate);
      } else {
        data.shift();
        data.push(generate());
      }

      return data;
    }

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
    var format = d3_locale_frCA.numberFormat("f");

    return {
      value: chance.integer({ min: 500, max: 1500 }),
      target: chance.integer({ min: 700, max: 1200 }),
      format: format
    };
  };

  DataService.sales = function() {
    var format = d3_locale_frCA.numberFormat("$,.2f");

    return {
      value: chance.floating({ min: 15000, max: 50000 }),
      target: chance.floating({ min: 18000, max: 55000 }),
      format: format
    };
  };

  DataService.rating = function() {
    var format = d3_locale_frCA.numberFormat(".1%");

    return {
      value: chance.floating({ min: 70, max: 95 }) / 100,
      target: chance.integer({ min: 80, max: 100 }) / 100,
      format: format
    };
  };

})();
