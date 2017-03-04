var axios = require("axios");

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var helpers = {

  runQuery: function(topic, startYear, endYear) {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" 
    + authKey + "&q=" + topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "0101";

    return axios.get(queryURL).then(function(response) {

      console.log(response.data.response.docs);

      return response.data.response.docs;

    });
  }
};

// We export the helpers object (which contains runQuery)
module.exports = helpers;
