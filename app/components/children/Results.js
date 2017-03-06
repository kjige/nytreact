var React = require("react");

var Results = React.createClass({
  
  getInitialState: function() {

    return { artId: ""};

  },

  // componentDidUpdate: function(prevProps, prevState) {

  //   if (prevState.artId !== this.state.artId) {
  //     var savedArticles = this.state.savedArticles;

  //     var newArticle = {
  //         title: results[this.state.artId].title,
  //         link: results[this.state.artId].link,
  //         pub_date: results[this.state.artId].date
  //     };

  //     axios.post('api/post', newArticle).then((err, res)=>{
        
  //       savedArticles.push(res.data);
        
  //       this.setState({savedArticles: savedArticles});
        
  //     });
  //   }
  // },

  render: function() {
  
    return (

        <div className="well">

          <a href={this.props.url} target="_blank"><h5>{this.props.title}</h5></a>

          <p>Date Published: {this.props.date}</p>

            <form>

              <button className="btn btn-primary" type="button" onClick={this.props.handleSaveArticle}>Save Article</button>

            </form>

        </div>

    );
  }
});

module.exports = Results;
