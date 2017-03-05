var React = require("react");

var Results = React.createClass({
  
  getInitialState: function() {

    return { artId: ""};

  },

  componentDidUpdate: function(prevProps, prevState) {

    if (prevState.artId !== this.state.artId) {
      var savedArticles = this.state.savedArticles;

      var newArticle = {
          title: article.title,
          link: article.link,
          pub_date: article.date
      };

      axios.post('api/post', newArticle).then((err, res)=>{
        
        savedArticles.push(res.data);
        
        this.setState({savedArticles: savedArticles});
        
      });
    }
  },

  handleSaveArticle: function(term) {

    event.preventDefault();

    this.setState({ artId: term });

  },

  render: function() {
  
    return (

        <div className="well">

          <a href={this.props.url} target="_blank"><h5>{this.props.title}</h5></a>

          <p>Date Published: {this.props.date}</p>

            <form onSubmit={this.handleSaveArticle}>

              <button className="btn btn-primary" type="submit">Save Article</button>

            </form>

        </div>

    );
  }
});

module.exports = Results;
