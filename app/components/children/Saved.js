var React = require("react");
var SavedArticle = require('./grandchildren/SavedArticle');

var Saved = React.createClass({
  
  render: function() {
    return (

      <div>
    
        {this.props.savedArticles.map( function (art, i) {

      return (

        <div>
          <SavedArticle key={i} art={art} url={art.url} title={art.title} date={art.date} delete={this.props.delete} />
        </div>
      )

    }.bind(this))}  
    </div>
    )
  }
});

// Export the component back for use in other files
module.exports = Saved;
