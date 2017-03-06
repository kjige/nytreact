var axios = require("axios");

// var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var authKey = "1d1580ba1e004730ba20593c692834e0";

var helpers = {

  runQuery: function(topic, startYear, endYear) {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" 
    + authKey + "&q=" + topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1201";

    return axios.get(queryURL).then(function(response) {

      return response.data.response.docs;

    });
  },

  saveArticle: function(data) {

        return axios.post('/saveThisArticle', data)

        .then(function(dbRes) {
            return (''+ dbRes.status + ' ' + dbRes.text);
        })
        .catch(function (error) {
            if(error) {
                console.log(error);
                throw error;
                return null;
            }
        });
    }

};

// We export the helpers object (which contains runQuery)
module.exports = helpers;
