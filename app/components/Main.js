// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");

// Helper Function
var helpers = require("./utils/helpers");

// This is the main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { topic: "", startYear: "", endYear: "", results: "" };
  },

  // componentDidUpdate is a lifecycle method that will get run every time the component updates it's
  // props or state
  componentDidUpdate: function(prevProps, prevState) {
    
    if (prevState.searchTerm !== this.state.topic) {
      
      console.log("UPDATED");

      helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then(function(data) {

        if (data !== this.state.results) {

          console.log(data);

          this.setState({ results: data });

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
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Address Finder!</h2>
            <p className="text-center">
              <em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
