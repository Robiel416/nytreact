// Include React
var React = require("react");

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Here we include all of the sub-components
var Search = require("./Search");
var Saved = require("./Saved");

// Create the Main Component
var Main = React.createClass({

  // Set the initial results and saved articles to empty arrays
  getInitialState: function() {
    return {
      results: [],
      saved: []
    };
  },

//  Set results state after receiving results from article search
  onResults: function(results) {
    this.setState({ results: results });
  },

//  Update saved state after user saves an article
  onSave: function(article) {
    var saved = this.state.saved;
    var index = saved.map(function(x) {return x._id; }).indexOf(article._id);
    if (index === -1) {
      saved.push(article);
    } else {
      saved[index] = article
    }
    this.setState({ saved })
  },

//  Update saved state after user deletes an article
  onDelete: function(deleted) {
    var saved = this.state.saved;
    var index = saved.indexOf(deleted);
    if (index !== -1) {
        saved.splice(index, 1);
        this.setState({ saved });
    }
  },

  //  On load display the saved articles
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

     helpers.getSaved().then((response) => {
        this.setState({saved: response.data})
     })
  },

  // Render function
  render: function() {
    const styles = {
        margin: "5px",
    };
    return (
      <div className="container">
          <div className="jumbotron text-center">
            <h1><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
            <hr />
            <p>
              <em>Search for New York Times Articles and save them</em>
            </p>
          </div>
           <p>
              <Link to="/Search"><button className="btn btn-primary btn-md" style={styles} ><i className="fa fa-search"></i> Search</button></Link>
              <Link to="/Saved"><button className="btn btn-primary btn-md" style={styles} ><i className="fa fa-floppy-o"></i> Saved</button></Link>
            </p>
          {
              React.Children.map(this.props.children, child =>
                  React.cloneElement(this.props.children, {
                    results: this.state.results,
                    onResults: this.onResults,
                    onSave: this.onSave,
                    savedArticles: this.state.saved,
                    onDelete: this.onDelete
                  })
              )
          }
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
