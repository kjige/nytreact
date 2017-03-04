var React = require("react");

var Main = React.createClass({

  getInitialState: function() {

    return { topic: "", startYear: "", endYear: "" };

  },

  handleChange: function(event) {
    
    var newState = {};
    
    newState[event.target.id] = event.target.value;
    
    this.setState(newState);

  },

  handleSubmit: function(event) {

    event.preventDefault();

    this.props.setTopic(topic: this.state.topic);
    
    this.props.setStartYear(startYear: this.state.startYear);
    
    this.props.setEndYear(endYear: this.props.endYear);

    this.setState({ term: "" });

  },

  render: function() {
    
    return (

      <div className="panel panel-default">
          
        <div className="panel-heading"><h3 className="panel-title text-center">Search</h3></div>

        <div className="panel-body text-center">

          <form onSubmit={this.handleSubmit}>

            <div className="form-group">

              <h4 className=""><strong>Topic</strong></h4>

              <input type="text" value={this.state.topic} className="form-control text-center" id="topic" onChange={this.handleChange} required/>
              
              <br />

              <h4 className=""><strong>Start Year</strong></h4>

              <input type="text" value={this.state.startYear} className="form-control text-center" id="startYear" onChange={this.handleChange} required/>
              
              <br />

              <h4 className=""><strong>End Year</strong></h4>

              <input type="text" value={this.state.endYear} className="form-control text-center" id="endYear" onChange={this.handleChange} required/>
              
              <br />
              
              <button className="btn btn-primary" type="submit">Submit</button>

            </div>

          </form>

        </div>

      </div>
    );
  }
});

module.exports = Main;
