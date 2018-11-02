// Include React
var React = require("react");

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

// Here we include all of the sub-components
var Query = require("./Query");
var Results = require("./Results");

// Create the Search Component
var Search = React.createClass({

  // Render function
  render: function() {
    return (
        <div>
          <Query onResults={this.props.onResults}/>
          <Results
            results={this.props.results}
            onSave={this.props.onSave}
          />
        </div>
    );
  }
});

module.exports = Search;