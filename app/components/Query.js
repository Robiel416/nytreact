// Include React
var React = require("react");

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Query Component
var Query = React.createClass({

//Make calls to NYT API for article search
  handleSearch: function(event) {
    event.preventDefault();

//  Clear results before new search
    this.props.onResults([]);

//  Set Variables
    var startYear = 0;
    var endYear = 0;
    var authKey = "b6a2131ede8c45bbab94ff59dc813f48"
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";
    var searchTerm = this.searchTerm.value;
    var queryURL = queryURLBase + searchTerm;

    startYear = this.startYear.value;
    endYear = this.endYear.value;

//  If user enters a start year update queryURL
    if (parseInt(startYear)){
      queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }

//  If user enters an end year update queryURL
    if (parseInt(endYear)) {
        queryURL = queryURL + "&end_date=" + endYear + "0101";
      }

    helpers.searchArticles(queryURL).then((results) => {
        this.props.onResults(results.data.response.docs);
    })
  },

//Clear results
  clearResults: function() {
    this.props.onResults([])
  },

//Function to render years for start/end year dropdowns
   getYears: function() {
    var min = 1851
    var max = new Date().getFullYear();
    var years = [];

    years.push(<option key={0} value={null}> </option>)
    for (var year = max; year>=min; year--){
        years.push(<option key={year} value={year}>{year}</option>);
    }
    return years;
   },

  // Render function
  render: function() {
  const styles = {margin: "5px"};
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Query</h3>
        </div>
        <div className="panel-body">
          <form role="form" onSubmit={this.handleSearch}>

            {/*Input box for capturing the search term*/}
            <div className="form-group">
              <label htmlFor="search">Search Term:</label>
              <input type="text" className="form-control" ref={(input) => {this.searchTerm = input}}></input>
            </div>

            {/*Capture the Start Year Parameter*/}
            <div className="form-group">
              <label htmlFor="start-year">Start Year (Optional):</label>
              <select className="form-control" defaultValue=" " ref={(input) => {this.startYear = input}}>
                {this.getYears()}
              </select>
            </div>

            {/*Capture the End Year Parameter*/}
            <div className="form-group">
              <label htmlFor="end-year">End Year (Optional):</label>
                <select className="form-control" defaultValue=" " ref={(input) => {this.endYear = input}}>
                  {this.getYears()}
                </select>
            </div>

            {/*Submit and Clear Results buttons*/}
            <button type="submit" className="btn btn-default" style={styles} ><i className="fa fa-search"></i> Search</button>
            <button type="button" className="btn btn-default" style={styles} onClick={this.clearResults}><i className="fa fa-trash"></i> Clear Results</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Query;