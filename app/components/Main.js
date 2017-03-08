var React = require("react");
var Form = require("./children/Form");
var Results = require("./children/Results");
var helpers = require("./utils/helpers");

var Main = React.createClass({

  getInitialState: function() {

    return { topic:"", startYear: "", endYear:"", title: "", url: "", date: "", results: [], save: [], savedArticles: [], artId: "" };

  },

  componentDidMount: function() {
        
    helpers.getSavedArticles().then((res) => {
    
      if (res.data !== this.state.savedArticles) {
        
        this.setState({savedArticles: res.data});
        
      }
    
    });
  
  },

  componentDidUpdate: function(prevProps, prevState) {
  
      var articlesMapped = [];

      helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then((data) => {
          
          data.map(function(art, i) {
            
            articlesMapped.push(art);

          });
    
      });
      
      this.setState({ results: articlesMapped });

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

  setArtId: function(term) {
    
    this.setState({ artId: term });
  },

  // getSavedArticles: function(req) {
      
  //   helpers.getSavedArticles('/getSavedArticles').then(function(response) {
      
  //     if(response !== undefined ){

  //       this.setState({ savedArticles: response.data });

  //     }
      
  //   });
  // },

  render: function() {
    
    var articles = this.state.results.map( function (art, i) {

      if (i<5) {
       
        return (

          <Results key={i} url={art.web_url} title={art.headline.main} date={art.pub_date} art={art} />

        );
      }
    
    });

    // this.getSavedArticles();

    var savedArticles = this.state.savedArticles.map( function(art, i) {
       
      return (<Results key={i} 
                        artId={art._id} 
                        title={art.headline.main} 
                        url={art.web_url} 
                        date={art.pub_date} />)
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
