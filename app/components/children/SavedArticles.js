var React = require("react");

var SavedArticle = React.createClass({
  
  render: function() {
  
    return (

        <div className="well">

          <a href={this.props.url} target="_blank"><h5>{this.props.title}</h5></a>

          <p>Date Published: {this.props.date}</p>

          <button className="btn btn-primary" type="submit" onClick={this.setKey(this.props.key)}>Delete Article</button>

        </div>

    );
  }
});

// Export the component back for use in other files
module.exports = SavedArticle;
