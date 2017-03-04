var React = require("react");

var Form = require("./children/Form");
var Results = require("./children/Results");
var helpers = require("./utils/helpers");

var Main = React.createClass({

  getInitialState: function() {

    return { topic: "", startYear: "", endYear: "", title: "", url: "", date: "", results: [] };

  },

  componentDidUpdate: function(prevProps, prevState) {
    
    if (prevState.searchTerm !== this.state.topic) {
      
      console.log("UPDATED");

      helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then(function(data) {

        if (data !== this.state.results) {

          console.log(data);
          
          var articlesMapped = [];
          
          data.map(function(art){
            
            articlesMapped.push(art);

          });
          
          this.setState({ results: articlesMapped });

        }

      }.bind(this));
    }
  },

  setTopic: function(term) {

    this.setState({ topic: term });

  },

  setStartYear: function(term) {

    this.setState({ startYear: term });

  },

  setEndYear: function(term) {

    this.setState({ endYear: term });

  },

  render: function() {
    
    var articles = this.state.results.map(function (art) {
      return (<Results title={art.headline.main} url={art.web_url} date={art.pub_date} />)
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

            {articles}

          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
