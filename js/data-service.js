var DataService = {};

(function() {

  DataService.web = function(n) {
    var data = [],
        id = 1;

    return { fetch: fetch };

    function fetch() {
      if (data.length == n) {
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
        hits: hits,
        signups: signups,
        likes: likes,
        total: hits + signups + likes
      };
    }
  };

})();
