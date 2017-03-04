var React = require("react");

var Results = React.createClass({

  render: function() {
    
    return (

        <div className="well">

          <a href={this.props.url} target="_blank"><h5>{this.props.title}</h5></a>

          <p>Date Published: {this.props.date}</p>

        </div>

    );
  }
});

// Export the component back for use in other files
module.exports = Results;
