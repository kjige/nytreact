var React = require("react");
var Form = require("./children/Form");
var Results = require("./children/Results");
var helpers = require("./utils/helpers");
var axios = require("axios");

var Main = React.createClass({

  getInitialState: function() {

    return { topic:"", startYear: "", endYear:"", title: "", url: "", date: "", results: [], save: [], savedArticles: [] };

  },

  componentDidMount: function() {
        
    this.getSavedArticles()
  
  },

  getSavedArticles: function() {
      
    axios.get('/getSavedArticles/').then(function(response) {
      
      this.setState({ savedArticles: response.data });
      
    });
  },

  componentDidUpdate: function(prevProps, prevState) {
    
    if (prevState.topic !== this.state.topic) {

      helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then((data) => {

        if (data !== this.state.results) {
          
          var articlesMapped = [];
          
          data.map(function(art, i) {
            
            articlesMapped.push(art);

          });
          
          this.setState({ results: articlesMapped });

        }
      });
    }

    if (prevState.savedArticles !== this.state.savedArticles) {
        console.log("NO");
      }
    

    if (prevState.artId !== this.state.artId) {
      var savedArticles = this.state.savedArticles;

      var newArticle = {
          title: article.title,
          link: article.link,
          pub_date: article.date
      };

      axios.post('api/post', newArticle).then((err, res)=>{
        
        savedArticles.push(res.data);
        
        this.setState({savedArticles: savedArticles});
        
      });
    }
  },

  setTopic: function (term) {

    this.setState({ topic: term });
  },

  setStartYear: function(term) {

    this.setState({ startYear: term });
  },

  setEndYear: function(term) {

    this.setState({ endYear: term });
  },

  render: function() {
    
    var articles = this.state.results.map( function (art, i) {
      
      if (i<5) {
       
        return (<Results key={i} artId={i} title={art.headline.main} url={art.web_url} date={art.pub_date} />)
      
      }
    
    });

    var savedArticles = this.state.savedArticles.map( function(art, i) {
       
      return (<Results key={i} artId={art._id} title={art.headline.main} url={art.web_url} date={art.pub_date} />)
      
    });

    return (

      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
          </div>

          <div className="col-xs-10 col-xs-offset-1">
            <Form setTopic={this.setTopic} setStartYear={this.setStartYear} setEndYear={this.setEndYear} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <div className="panel panel-default">

              <div className="panel-heading">
                <h3 className="panel-title text-center">Results</h3>
              </div>

              <div className="panel-body text-center">
                {articles}
              </div>

            </div>
          </div>
      </div>

      <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <div className="panel panel-default">

              <div className="panel-heading">
                <h3 className="panel-title text-center">Saved Articles</h3>
              </div>

              <div className="panel-body text-center">
                {savedArticles}
              </div>

            </div>
          </div>
      </div>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
