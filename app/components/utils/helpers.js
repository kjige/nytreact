var axios = require("axios");

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

        var newArticle = {
          title: data.headline.main,
          link: data.web_url,
          pub_date: data.pub_date
      };

        return axios.post('/api/saved', newArticle)

    },

    getSavedArticles: function(data) {

      return axios.get('/api/saved');
      
    }

};

// We export the helpers object (which contains runQuery)
module.exports = helpers;
