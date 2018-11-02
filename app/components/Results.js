// Include React
var React = require("react");

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Results Component
var Results = React.createClass({

//Render each result article in a "well"
  renderResult: function(result) {
     return (
          <div className ="well" key={result._id}>
              <h3><strong>{result.headline.main}</strong></h3>
              <h5>{result.pub_date}</h5>
              <h5><a href={result.web_url} target="_blank">{result.web_url}</a></h5>
              <button type="button" className="btn btn-success save" onClick={() => this.saveArticle(result)}>Save</button>
          </div>
      );
    },

//Render all of the result articles
  renderResults: function() {
    var results = this.props.results;
    return results && results.map(this.renderResult)
  },

//Save an article to the database
  saveArticle: function(result) {
    helpers.saveArticle(result).then((res) => {
      this.props.onSave(res.data)
    })
  },

  // Render function
  render: function() {
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Results</h3>
        </div>
        <div className="panel-body">
         {/* Dump the result articles here*/ }
          {this.renderResults()}
        </div>
      </div>
    );
  }
});

module.exports = Results;