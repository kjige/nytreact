var React = require("react");
var helpers = require("../../utils/helpers.js");

var SavedArticle = React.createClass({

    delete: function (artId) {

        this.props.delete(artId);

    },

  render: function() {

    return (

        <div className="well">

            <a href={this.props.url} target="_blank"><h5>{this.props.title}</h5></a>

            <p>Date Published: {this.props.date}</p>

            <form>

                <button className="btn btn-primary" type="button" onClick={()=>{this.delete(this.props.artId)}}>Delete </button>

            </form>

        </div>
    )       
  }      
});

module.exports = SavedArticle;
