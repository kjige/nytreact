var React = require("react");
var helpers = require("../../utils/helpers.js");

var SavedArticle = React.createClass({

    delete: function (article) {

        this.props.delete(article);

    },

  render: function() {

    return (

        <div className="well" key={this.props.index}>

            <a href={this.props.url} target="_blank"><h5>{this.props.title}</h5></a>

            <p>Date Published: {this.props.date}</p>

            <form>

                <button className="btn btn-primary" type="button" onClick={()=>{this.delete(this.props.art)}}>Save Article</button>

            </form>

        </div>
    )       
  }      
});

module.exports = SavedArticle;
