var React = require("react");
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");
var helpers = require("./utils/helpers");

var Main = React.createClass({

  getInitialState: function() {

    return { topic:"", startYear: "", endYear:"", title: "", url: "", date: "", results: [], save: [], savedArticles: [] };

  },
  
  componentDidMount: function() {
    
    this.getSavedArticles();

  },

  componentDidUpdate: function(prevProps, prevState) {
    
    if (prevState.topic !== this.state.topic) {

      helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then(function(data) {

        if (data !== this.state.results) {
          
          var articlesMapped = [];
          
          data.map(function(art, i) {
            
            articlesMapped.push(art);

          });
          
          this.setState({ results: articlesMapped });

        }
      }.bind(this));
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

  setSaved: function(term) {
    
    this.setState({ saved: term });
  },

  setSavedArticles: function(term) {
    
    this.setState({ savedArticles: term });
  },

  saveArticle: function (article) {

    helpers.saveArticle(article).then((res)=>{

      console.log("RES",res);

      this.setSavedArticles(res);

    });

  },

  getSavedArticles: function(req) {
      
    helpers.getSavedArticles().then((res) => {

        this.setState( { savedArticles: res } );

    });
  },

  delete: function(artId) {
        
    helpers.delete(artId).then(() => {

      this.getSavedArticles();

    });
    
  },

  render: function() {

    return (

      <div className="container">

        <div className="row">
          <div className="jumbotron">
            <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
          </div>
        </div>
        
        <div className="row">
          
          <div className="col-xs-6">

            <Form setTopic={this.setTopic} setStartYear={this.setStartYear} setEndYear={this.setEndYear} delete={this.delete}/>

            <div className="panel panel-default">

              <div className="panel-heading">
                <h3 className="panel-title text-center">Saved Articles</h3>
              </div>

              <div className="panel-body text-center">
                <Saved delete = {this.delete} savedArticles={this.state.savedArticles}/>
              </div>

            </div>

          </div>

          <div className="col-xs-6">
        
              <div className="panel panel-default">

                <div className="panel-heading">
                  <h3 className="panel-title text-center">Results</h3>
                </div>

                <div className="panel-body text-center">
                  <Results results = {this.state.results} setSaved={this.setSaved} saveArticle={this.saveArticle} />
                </div>

              </div>

            </div>

         </div>
      </div>

    );
  }
});

module.exports = Main;
