var React = require("react");
var ResultsArticle = require('./grandchildren/ResultsArticle');

var Results = React.createClass({

  render: function() {
    
    return (
      
      <div>
        
        {this.props.results.map( function (art, i) {

          return (
              
            <ResultsArticle key={i} art={art} url={art.web_url} title={art.headline.main} date={art.pub_date} saveArticle={this.props.saveArticle}/>
            
          )

        }.bind(this))}  
            
      </div>
    );
  }
});

module.exports = Results;
