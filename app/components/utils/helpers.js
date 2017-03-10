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
          url: data.web_url,
          date: data.pub_date
      };

        return axios.post('/api/saved', newArticle).then(function(){
          
          return axios.get('/api/saved').then(function(res){

            return res.data;

          });

        })

    },

    getSavedArticles: function() {

      return axios.get('/api/saved').then(function(res){

        return res.data;

      });
      
    },

    delete: function(artId) {
      
      return axios.delete('/api/saved/' + artId).then(function(res) {});
    
    }

};

// We export the helpers object (which contains runQuery)
module.exports = helpers;
